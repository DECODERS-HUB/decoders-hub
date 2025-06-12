
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

      console.log("AdminDashboard: Checking admin status for user:", session.user.id);

      // Check if this user is an admin using both id and email
      const { count: countById, error: adminErrorById } = await supabase
        .from("admin_users")
        .select("*", { count: 'exact', head: true })
        .eq("id", session.user.id);

      const { count: countByEmail, error: adminErrorByEmail } = await supabase
        .from("admin_users")
        .select("*", { count: 'exact', head: true })
        .eq("email", session.user.email);

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
      if ((!countById || countById === 0) && (!countByEmail || countByEmail === 0)) {
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
