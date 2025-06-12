
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("AdminDashboard: Checking authentication...");
      
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      setSession(session);

      if (!session) {
        console.log("AdminDashboard: No session found, redirecting to auth");
        toast({
          title: "Authentication required",
          description: "Please login to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      console.log("AdminDashboard: Session found for user:", session.user.id);
      console.log("AdminDashboard: User email:", session.user.email);

      // Check if this user is an admin using both id and email with detailed logging
      console.log("=== ADMIN DASHBOARD AUTH CHECK ===");
      
      console.log("1. Checking admin by ID...");
      const { count: countById, error: adminErrorById, data: adminDataById } = await supabase
        .from("admin_users")
        .select("*", { count: 'exact', head: false })
        .eq("id", session.user.id);

      console.log("Admin check by ID results:", {
        countById,
        adminErrorById,
        adminDataById,
        userIdBeingChecked: session.user.id
      });

      console.log("2. Checking admin by email...");
      const { count: countByEmail, error: adminErrorByEmail, data: adminDataByEmail } = await supabase
        .from("admin_users")
        .select("*", { count: 'exact', head: false })
        .eq("email", session.user.email);

      console.log("Admin check by email results:", {
        countByEmail,
        adminErrorByEmail,
        adminDataByEmail,
        userEmailBeingChecked: session.user.email
      });

      // Let's also fetch all admin users
      console.log("3. Fetching all admin users...");
      const { data: allAdmins, error: allAdminsError } = await supabase
        .from("admin_users")
        .select("*");
      
      console.log("All admin users in dashboard check:", allAdmins);
      console.log("Error fetching all admins in dashboard:", allAdminsError);
      
      console.log("=== END ADMIN DASHBOARD AUTH CHECK ===");

      if (adminErrorById || adminErrorByEmail) {
        console.error("AdminDashboard: Error checking admin status:", adminErrorById || adminErrorByEmail);
        toast({
          title: "Database Error",
          description: "Failed to verify admin access. Please try again.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Check if user is admin by either ID or email
      const isAdminById = !adminErrorById && countById && countById > 0;
      const isAdminByEmail = !adminErrorByEmail && countByEmail && countByEmail > 0;
      
      console.log("AdminDashboard: Final admin check results:", {
        isAdminById,
        isAdminByEmail,
        finalResult: isAdminById || isAdminByEmail
      });

      if (!isAdminById && !isAdminByEmail) {
        console.log("AdminDashboard: User is not an admin");
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this area. Please contact the administrator to grant you access.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      console.log("AdminDashboard: User is admin, proceeding to load dashboard");
      setIsAdmin(true);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("AdminDashboard: Auth state changed:", event);
        if (event === "SIGNED_OUT") {
          console.log("AdminDashboard: User signed out, redirecting to auth");
          navigate("/auth");
        }
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleLogout = async () => {
    console.log("AdminDashboard: Logging out user");
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return {
    session,
    isAdmin,
    handleLogout,
  };
};
