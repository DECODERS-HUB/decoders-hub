
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

interface ForgotPasswordFormProps {
  email: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
}

const ForgotPasswordForm = ({
  email,
  loading,
  onSubmit,
  onChange,
  onBack,
}: ForgotPasswordFormProps) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-brand-800">Reset Password</h1>
        <p className="text-gray-600 mt-2">
          Enter your email to receive a password reset link
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-8">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              id="reset-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={onChange}
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
            onClick={onBack}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
