"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Check,
  X,
} from "lucide-react";

const Signup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState()
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Live password validation state
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        name: userData.name ,
        email: userData.email ,
        password: userData.password ,
        callbackURL: "/auth/login",
      });

      if (error) {
        setStatus({
          type: "error",
          message: error.message || "Failed to create account. Please try again.",
        });
      } else if (data) {
        setStatus({
          type: "success",
          message: "Account created successfully! Redirecting to login...",
        });
      }
    } catch {
      setStatus({ type: "error", message: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none -top-10 -left-10" />
      <div className="absolute w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none -bottom-10 -right-10" />

      {/* Main Glassmorphic Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl text-white">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="p-3.5 bg-indigo-500/20 rounded-2xl border border-indigo-400/30 mb-3 shadow-inner">
            <UserPlus className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Create an Account</h2>
          <p className="text-sm text-slate-300 mt-1">
            Join us today! Enter your details below to get started.
          </p>
        </div>

        {/* Dynamic Status Alert Banner */}
        {status && (
          <div
            className={`mb-5 p-3.5 rounded-2xl flex items-center gap-2.5 text-sm border backdrop-blur-md transition-all ${
              status.type === "error"
                ? "bg-rose-500/15 border-rose-500/30 text-rose-200"
                : "bg-emerald-500/15 border-emerald-500/30 text-emerald-200"
            }`}
          >
            {status.type === "error" ? (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            ) : (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Name Field */}
          <TextField
            isRequired
            name="name"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Full Name
            </Label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                name="name"
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <FieldError className="text-xs text-rose-400 mt-1" />
          </TextField>

          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Email Address
            </Label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                name="email"
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <FieldError className="text-xs text-rose-400 mt-1" />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Password
            </Label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                name="password"
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-3.5 text-slate-400 hover:text-slate-200 focus:outline-none transition-colors"
              >
                {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Live Password Checklist Tracker */}
            <div className="mt-2 space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-white/5">
              <p className="text-[11px] font-medium text-slate-400 mb-1">Password Requirements:</p>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                <div className={`flex items-center gap-2 transition-colors ${hasMinLength ? "text-emerald-400" : "text-slate-400"}`}>
                  {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 opacity-50" />}
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center gap-2 transition-colors ${hasUppercase ? "text-emerald-400" : "text-slate-400"}`}>
                  {hasUppercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 opacity-50" />}
                  <span>At least 1 uppercase letter</span>
                </div>
                <div className={`flex items-center gap-2 transition-colors ${hasNumber ? "text-emerald-400" : "text-slate-400"}`}>
                  {hasNumber ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 opacity-50" />}
                  <span>At least 1 number</span>
                </div>
              </div>
            </div>

            <FieldError className="text-xs text-rose-400 mt-1" />
          </TextField>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              type="submit"
              isDisabled={loading}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] text-white font-medium py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              )}
            </Button>
            <Button
              type="reset"
              variant="secondary"
              onClick={() => setPassword("")}
              className="px-4 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-all text-sm border border-slate-700"
            >
              Reset
            </Button>
          </div>
        </Form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Already have an account?{" "}
          <a href="/auth/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;