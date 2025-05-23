
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, LogOut, RefreshCw, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Appointment {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  notes: string | null;
  service_id: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  created_at: string;
  status: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Check authentication and admin status
  useEffect(() => {
    const checkAuth = async () => {
      // Get the current session
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      setSession(session);

      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please login to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Check if user is an admin
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (adminError || !adminData) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this area.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchAppointments();
    };

    checkAuth();

    // Setup auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          navigate("/auth");
        }
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, toast]);

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  // Fetch appointments from the database
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast({
        title: "Error",
        description: "Failed to load appointments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Update local state
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );

      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment({ ...selectedAppointment, status });
      }

      toast({
        title: "Status Updated",
        description: "The appointment status has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Filter appointments based on status and search query
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      appointment.first_name.toLowerCase().includes(searchLower) ||
      appointment.last_name.toLowerCase().includes(searchLower) ||
      appointment.email.toLowerCase().includes(searchLower) ||
      appointment.service_name.toLowerCase().includes(searchLower);

    return matchesStatus && matchesSearch;
  });

  // Handle view details
  const viewAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-yellow-500"; // pending
    }
  };

  if (!session || !isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-brand-800">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button
                onClick={fetchAppointments}
                variant="outline"
                className="gap-2"
              >
                <RefreshCw size={16} />
                Refresh
              </Button>
              <Button onClick={handleLogout} variant="outline" className="gap-2">
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-brand-800">
                  Appointment Bookings
                </h2>
                {loading && <RefreshCw size={18} className="animate-spin" />}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-10 w-full md:w-60"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Appointment Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-gray-500"
                      >
                        {loading
                          ? "Loading appointments..."
                          : "No appointments found."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div className="font-medium">
                            {appointment.first_name} {appointment.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.email}
                          </div>
                        </TableCell>
                        <TableCell>{appointment.service_name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <CalendarIcon size={14} className="text-gray-400" />
                            <span>
                              {format(
                                parseISO(appointment.appointment_date),
                                "MMM d, yyyy"
                              )}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.appointment_time}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${getStatusBadgeColor(
                              appointment.status
                            )} text-white capitalize`}
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                viewAppointmentDetails(appointment)
                              }
                            >
                              Details
                            </Button>
                            <Select
                              value={appointment.status}
                              onValueChange={(value) =>
                                updateAppointmentStatus(appointment.id, value)
                              }
                            >
                              <SelectTrigger className="h-8 w-[110px]">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                  Confirmed
                                </SelectItem>
                                <SelectItem value="cancelled">
                                  Cancelled
                                </SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>

      {/* Appointment Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected appointment.
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Client</h4>
                  <p className="font-medium">
                    {selectedAppointment.first_name}{" "}
                    {selectedAppointment.last_name}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <Badge
                    className={`${getStatusBadgeColor(
                      selectedAppointment.status
                    )} text-white capitalize mt-1`}
                  >
                    {selectedAppointment.status}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p>{selectedAppointment.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p>{selectedAppointment.phone || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Service</h4>
                  <p>{selectedAppointment.service_name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Company</h4>
                  <p>{selectedAppointment.company || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date</h4>
                  <p>
                    {format(
                      parseISO(selectedAppointment.appointment_date),
                      "MMMM d, yyyy"
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Time</h4>
                  <p>{selectedAppointment.appointment_time}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                  <p className="whitespace-pre-wrap">
                    {selectedAppointment.notes || "No notes provided"}
                  </p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">
                    Created At
                  </h4>
                  <p>
                    {format(
                      parseISO(selectedAppointment.created_at),
                      "MMMM d, yyyy 'at' h:mm a"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowDetailsModal(false)}
                  >
                    Close
                  </Button>
                </div>
                <div className="space-x-2">
                  <Select
                    value={selectedAppointment.status}
                    onValueChange={(value) =>
                      updateAppointmentStatus(selectedAppointment.id, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
