import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      console.log("Checking existing session...");
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log("Session found, checking admin status for user:", data.session.user.id);
        
        // Check admin status by both ID and email
        const { count: countById, error: adminErrorById } = await supabase
          .from("admin_users")
          .select("*", { count: 'exact', head: true })
          .eq("id", data.session.user.id);

        const { count: countByEmail, error: adminErrorByEmail } = await supabase
          .from("admin_users")
          .select("*", { count: 'exact', head: true })
          .eq("email", data.session.user.email);
          
        if ((!adminErrorById && countById && countById > 0) || (!adminErrorByEmail && countByEmail && countByEmail > 0)) {
          console.log("User is admin, redirecting to dashboard");
          navigate("/admin");
        } else {
          console.log("User is not admin");
        }
      } else {
        console.log("No existing session found");
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleLogin = async (formData: { email: string; password: string }) => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    console.log("Attempting login for:", formData.email);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      console.log("Login successful for user:", data.user?.id);
      
      if (data.user) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("Checking admin status for user ID:", data.user.id);
        
        // Check admin status by both ID and email
        const { count: countById, error: adminErrorById } = await supabase
          .from("admin_users")
          .select("*", { count: 'exact', head: true })
          .eq("id", data.user.id);

        const { count: countByEmail, error: adminErrorByEmail } = await supabase
          .from("admin_users")
          .select("*", { count: 'exact', head: true })
          .eq("email", data.user.email);
        
        if (adminErrorById && adminErrorByEmail) {
          console.error("Error checking admin status:", adminErrorById || adminErrorByEmail);
          toast({
            title: "Database Error",
            description: "Failed to verify admin status. Please try again.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          return;
        }
        
        // Check if user is admin by either ID or email
        if ((!countById || countById === 0) && (!countByEmail || countByEmail === 0)) {
          console.log("User is not an admin, signing out");
          await supabase.auth.signOut();
          toast({
            title: "Access Denied",
            description: "You don't have permission to access the admin area. Please contact the administrator to grant you access.",
            variant: "destructive",
          });
        } else {
          console.log("User is admin, proceeding to dashboard");
          toast({
            title: "Login Successful",
            description: "Welcome to the admin dashboard.",
          });
          navigate("/admin");
        }
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (formData: { email: string; password: string }) => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    console.log("Attempting signup for:", formData.email);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      
      if (error) {
        console.error("Signup error:", error);
        throw error;
      }
      
      console.log("Signup successful:", data);
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please contact the system administrator to grant you admin access.",
      });
      
      return true;
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      toast({
        title: "Missing email",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/auth`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Reset Email Sent",
        description: "Check your email for a password reset link.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: error.message || "An error occurred while sending the reset email.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
    handleSignup,
    handleForgotPassword,
  };
};
