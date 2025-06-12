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
        console.log("User email:", data.session.user.email);
        
        // Check admin status by both ID and email with detailed logging
        console.log("Checking admin by ID...");
        const { count: countById, error: adminErrorById, data: adminDataById } = await supabase
          .from("admin_users")
          .select("*", { count: 'exact', head: false })
          .eq("id", data.session.user.id);

        console.log("Admin check by ID result:", { countById, adminErrorById, adminDataById });

        console.log("Checking admin by email...");
        const { count: countByEmail, error: adminErrorByEmail, data: adminDataByEmail } = await supabase
          .from("admin_users")
          .select("*", { count: 'exact', head: false })
          .eq("email", data.session.user.email);

        console.log("Admin check by email result:", { countByEmail, adminErrorByEmail, adminDataByEmail });

        // Let's also check what's actually in the admin_users table
        console.log("Fetching all admin users to debug...");
        const { data: allAdminUsers, error: allAdminError } = await supabase
          .from("admin_users")
          .select("*");
        
        console.log("All admin users in table:", allAdminUsers);
        console.log("Error fetching admin users:", allAdminError);
          
        if ((!adminErrorById && countById && countById > 0) || (!adminErrorByEmail && countByEmail && countByEmail > 0)) {
          console.log("User is admin, redirecting to dashboard");
          navigate("/admin");
        } else {
          console.log("User is not admin - counts:", { countById, countByEmail });
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
      console.log("User email from auth:", data.user?.email);
      
      if (data.user) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("Checking admin status for user ID:", data.user.id);
        console.log("Checking admin status for user email:", data.user.email);
        
        // Check admin status by both ID and email with detailed logging
        console.log("=== DETAILED ADMIN CHECK ===");
        
        console.log("1. Checking by ID...");
        const { count: countById, error: adminErrorById, data: adminDataById } = await supabase
          .from("admin_users")
          .select("*", { count: 'exact', head: false })
          .eq("id", data.user.id);

        console.log("Admin check by ID results:", {
          countById,
          adminErrorById,
          adminDataById,
          userIdBeingChecked: data.user.id
        });

        console.log("2. Checking by email...");
        const { count: countByEmail, error: adminErrorByEmail, data: adminDataByEmail } = await supabase
          .from("admin_users")
          .select("*", { count: 'exact', head: false })
          .eq("email", data.user.email);

        console.log("Admin check by email results:", {
          countByEmail,
          adminErrorByEmail,
          adminDataByEmail,
          userEmailBeingChecked: data.user.email
        });

        // Let's also fetch all admin users to see what's in the table
        console.log("3. Fetching all admin users...");
        const { data: allAdmins, error: allAdminsError } = await supabase
          .from("admin_users")
          .select("*");
        
        console.log("All admin users:", allAdmins);
        console.log("Error fetching all admins:", allAdminsError);
        
        console.log("=== END DETAILED ADMIN CHECK ===");
        
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
        const isAdminById = !adminErrorById && countById && countById > 0;
        const isAdminByEmail = !adminErrorByEmail && countByEmail && countByEmail > 0;
        
        console.log("Final admin check results:", {
          isAdminById,
          isAdminByEmail,
          finalResult: isAdminById || isAdminByEmail
        });
        
        if (!isAdminById && !isAdminByEmail) {
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
