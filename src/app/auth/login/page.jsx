"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState()

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: userData.email ,
        password: userData.password ,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        setStatus({ type: "error", message: error.message || "Invalid credentials. Please try again." });
      } else if (data) {
        setStatus({ type: "success", message: "Login successful! Redirecting..." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="p-3 bg-indigo-600/30 rounded-full border border-indigo-500/30 mb-3">
            <Lock className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
          <p className="text-sm text-slate-300 mt-1">
            Please enter your credentials to log in
          </p>
        </div>

        {/* Status Message Banner */}
        {status && (
          <div
            className={`mb-5 p-3 rounded-xl flex items-center gap-2 text-sm border ${
              status.type === "error"
                ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            }`}
          >
            {status.type === "error" ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
              <Mail className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                name="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
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
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Password
              </Label>
              <a
                href="#forgot-password"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-3 text-slate-400 hover:text-slate-200 focus:outline-none"
              >
                {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Description className="text-xs text-slate-400 mt-1">
              At least 8 chars, 1 uppercase & 1 number.
            </Description>
            <FieldError className="text-xs text-rose-400 mt-1" />
          </TextField>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mt-3">
            <Button
              type="submit"
              isDisabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </Button>
          </div>
        </Form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;