"use client";

import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { ChevronLeftIcon, EyeClosed, Eye } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignInForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setLoading(false);
        toast.error('Invalid email or password!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      const data = await res.json();

      // Simpan token (simple auth)
      localStorage.setItem("token", data.token);

      setLoading(false);
      toast.info('Login success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/admin"); // redirect ke dashboard
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      toast.error('Failed Login!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <Label>Email <span className="text-error-500">*</span></Label>
                <Input 
                  placeholder="info../..gmail.com" 
                  type="email"
                  defaultValue={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label>Password <span className="text-error-500">*</span></Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    defaultValue={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword 
                      ? <Eye className="fill-gray-500 dark:fill-gray-400" />
                      : <EyeClosed className="fill-gray-500 dark:fill-gray-400" />
                    }
                  </span>
                </div>
              </div>

              <div>
                <Button className="w-full" size="sm" disabled={loading || !email && !password}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
