
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LogIn } from "lucide-react";

interface LoginFormProps {
  formData: { email: string; password: string };
  showPassword: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onForgotPassword: () => void;
}

const LoginForm = ({
  formData,
  showPassword,
  loading,
  onSubmit,
  onChange,
  onTogglePassword,
  onForgotPassword,
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          onChange={onChange}
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
            onChange={onChange}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={onTogglePassword}
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
          onClick={onForgotPassword}
        >
          Forgot your password?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
