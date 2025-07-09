
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication...");
      
      try {
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
          setLoading(false);
          return;
        }

        console.log("Session found for user:", session.user.id, "email:", session.user.email);

        // Check if this user is an admin - Query 'admin_users' where user_id = supabase.user.id
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("*")
          .eq("id", session.user.id)
          .limit(1);

        console.log("Admin check result:", { adminData, adminError });

        if (adminError) {
          console.error("Error checking admin status:", adminError);
          toast({
            title: "Database Error",
            description: "Failed to verify admin access. Please try again.",
            variant: "destructive",
          });
          navigate("/auth");
          setLoading(false);
          return;
        }

        const isUserAdmin = adminData && adminData.length > 0;
        console.log("User admin status:", isUserAdmin);

        if (!isUserAdmin) {
          console.log("User is not an admin");
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this area. Please contact the administrator to grant you access.",
            variant: "destructive",
          });
          navigate("/");
          setLoading(false);
          return;
        }

        console.log("User is admin, proceeding to load dashboard");
        setIsAdmin(true);
      } catch (error) {
        console.error("Auth check error:", error);
        toast({
          title: "Authentication Error",
          description: "An error occurred while checking your access. Please try again.",
          variant: "destructive",
        });
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        if (event === "SIGNED_OUT") {
          console.log("User signed out, redirecting to auth");
          setSession(null);
          setIsAdmin(false);
          navigate("/auth");
        } else if (event === "SIGNED_IN" && session) {
          setSession(session);
          // Re-check admin status when user signs in
          checkAuth();
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleLogout = async () => {
    console.log("Logging out user");
    setLoading(true);
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
    navigate("/auth");
    setLoading(false);
  };

  return {
    session,
    isAdmin,
    loading,
    handleLogout,
  };
};
