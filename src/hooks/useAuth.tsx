
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
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          console.log("Session found, checking admin status");
          
          // Check admin status
          const { data: adminData, error: adminError } = await supabase
            .from("admin_users")
            .select("*")
            .or(`id.eq.${data.session.user.id},email.eq."${data.session.user.email}"`)
            .limit(1);
            
          console.log("Admin check:", { adminData, adminError });
            
          if (!adminError && adminData && adminData.length > 0) {
            console.log("User is admin, redirecting to dashboard");
            navigate("/admin");
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
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
      
      console.log("Login successful for user:", data.user?.id, "email:", data.user?.email);
      
      if (data.user) {
        // Check admin status
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("*")
          .or(`id.eq.${data.user.id},email.eq."${data.user.email}"`)
          .limit(1);
        
        console.log("User ID from session:", data.user.id);
        console.log("User email from session:", data.user.email);
        console.log("Admin check result:", { adminData, adminError });
        
        if (adminError) {
          console.error("Error checking admin status:", adminError);
          toast({
            title: "Database Error",
            description: "Failed to verify admin status. Please try again.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          return;
        }
        
        const isUserAdmin = adminData && adminData.length > 0;
        console.log("User admin status:", isUserAdmin);
        
        if (!isUserAdmin) {
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
      const redirectUrl = `${window.location.origin}/auth`;
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl
        }
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
