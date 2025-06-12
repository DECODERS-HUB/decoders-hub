import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  useEffect(() => {
    document.title = "Admin Login - DECODERS HUB";
  }, []);

  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, handleLogin, handleSignup, handleForgotPassword } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(formData);
  };

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSignup(formData);
    if (success) {
      setTab("login");
    }
  };

  const onForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleForgotPassword(formData.email);
    if (success) {
      setShowForgotPassword(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="py-20">
          <section className="pt-20 pb-16">
            <div className="container mx-auto px-4">
              <ForgotPasswordForm
                email={formData.email}
                loading={loading}
                onSubmit={onForgotPassword}
                onChange={handleChange}
                onBack={() => setShowForgotPassword(false)}
              />
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
                    <LoginForm
                      formData={formData}
                      showPassword={showPassword}
                      loading={loading}
                      onSubmit={onLogin}
                      onChange={handleChange}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                      onForgotPassword={() => setShowForgotPassword(true)}
                    />
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <SignupForm
                      formData={formData}
                      showPassword={showPassword}
                      loading={loading}
                      onSubmit={onSignup}
                      onChange={handleChange}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                    />
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
