import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, LogIn, UserPlus, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if already authenticated
    const checkSession = async () => {
      console.log("Checking existing session...");
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log("Session found, checking admin status for user:", data.session.user.id);
        
        // Check if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("*")
          .eq("id", data.session.user.id)
          .single();
        
        console.log("Admin check result:", { adminData, adminError });
          
        if (adminData && !adminError) {
          console.log("User is admin, redirecting to dashboard");
          navigate("/admin");
        } else {
          console.log("User is not admin or error occurred:", adminError?.message);
        }
      } else {
        console.log("No existing session found");
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        // Check if user is an admin with detailed logging
        console.log("Checking admin status for user ID:", data.user.id);
        
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("*")
          .eq("id", data.user.id);
        
        console.log("Admin query result:", { adminData, adminError, count: adminData?.length });
        
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
        
        if (!adminData || adminData.length === 0) {
          console.log("User is not an admin, signing out");
          // Sign out if not admin
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      
      // Switch to login tab
      setTab("login");
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast({
        title: "Missing email",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Use the current site's URL instead of localhost
      const redirectUrl = `${window.location.origin}/auth`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: redirectUrl,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Reset Email Sent",
        description: "Check your email for a password reset link.",
      });
      
      setShowForgotPassword(false);
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: error.message || "An error occurred while sending the reset email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="py-20">
          <section className="pt-20 pb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-brand-800">Reset Password</h1>
                  <p className="text-gray-600 mt-2">
                    Enter your email to receive a password reset link
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-8">
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        id="reset-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-brand-600 hover:bg-brand-700"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Back to Login
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-20">
        <section className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-brand-800">Admin Portal</h1>
                <p className="text-gray-600 mt-2">
                  Sign in to manage appointments and services
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-8">
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-brand-600 hover:bg-brand-700"
                        disabled={loading}
                      >
                        {loading ? (
                          "Signing In..."
                        ) : (
                          <>
                            <LogIn size={16} className="mr-2" />
                            Sign In
                          </>
                        )}
                      </Button>
                      
                      <div className="text-center">
                        <button
                          type="button"
                          className="text-sm text-brand-600 hover:text-brand-700 underline"
                          onClick={() => setShowForgotPassword(true)}
                        >
                          Forgot your password?
                        </button>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Password must be at least 6 characters long
                        </p>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-accent1-400 hover:bg-accent1-500"
                        disabled={loading}
                      >
                        {loading ? (
                          "Creating Account..."
                        ) : (
                          <>
                            <UserPlus size={16} className="mr-2" />
                            Create Account
                          </>
                        )}
                      </Button>
                      
                      <p className="text-sm text-gray-500 text-center mt-4">
                        Note: After registration, an admin needs to grant you access.
                      </p>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
