
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
      console.log("Checking authentication...");
      
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      setSession(session);

      if (!session) {
        console.log("No session found, redirecting to auth");
        toast({
          title: "Authentication required",
          description: "Please login to access the admin dashboard.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      console.log("Session found for user:", session.user.id, "email:", session.user.email);

      // Check if this user is an admin using both id and email
      const { data: adminDataById, error: adminErrorById } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", session.user.id);

      const { data: adminDataByEmail, error: adminErrorByEmail } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", session.user.email);

      console.log("Admin check by ID:", { adminDataById, adminErrorById });
      console.log("Admin check by email:", { adminDataByEmail, adminErrorByEmail });

      if (adminErrorById || adminErrorByEmail) {
        console.error("Error checking admin status:", adminErrorById || adminErrorByEmail);
        toast({
          title: "Database Error",
          description: "Failed to verify admin access. Please try again.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Check if user is admin by either ID or email
      const isAdminById = !adminErrorById && adminDataById && adminDataById.length > 0;
      const isAdminByEmail = !adminErrorByEmail && adminDataByEmail && adminDataByEmail.length > 0;

      console.log("Admin status:", { isAdminById, isAdminByEmail });

      if (!isAdminById && !isAdminByEmail) {
        console.log("User is not an admin");
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this area. Please contact the administrator to grant you access.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      console.log("User is admin, proceeding to load dashboard");
      setIsAdmin(true);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        if (event === "SIGNED_OUT") {
          console.log("User signed out, redirecting to auth");
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
    console.log("Logging out user");
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return {
    session,
    isAdmin,
    handleLogout,
  };
};
