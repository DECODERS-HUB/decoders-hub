
import React from "react";
import { format, parseISO } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface AppointmentTableProps {
  appointments: Appointment[];
  loading: boolean;
  onViewDetails: (appointment: Appointment) => void;
  onUpdateStatus: (id: string, status: string) => void;
}

const AppointmentTable = ({ appointments, loading, onViewDetails, onUpdateStatus }: AppointmentTableProps) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
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
          {appointments.length === 0 ? (
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
            appointments.map((appointment) => (
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
                      onClick={() => onViewDetails(appointment)}
                    >
                      Details
                    </Button>
                    <Select
                      value={appointment.status}
                      onValueChange={(value) =>
                        onUpdateStatus(appointment.id, value)
                      }
                    >
                      <SelectTrigger className="h-8 w-[110px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
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
  );
};

export default AppointmentTable;
