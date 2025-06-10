
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, UserPlus } from "lucide-react";

interface SignupFormProps {
  formData: { email: string; password: string };
  showPassword: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
}

const SignupForm = ({
  formData,
  showPassword,
  loading,
  onSubmit,
  onChange,
  onTogglePassword,
}: SignupFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          onChange={onChange}
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
  );
};

export default SignupForm;
