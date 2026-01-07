"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Link from "next/link";

import { FaGoogle } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        let message = error.message;

        // Replace specific error text with custom message
        if (message.includes("Anonymous sign-ins are disabled")) {
          message = "All fields must be filled";
        }

        setError(message);
        console.log("Auth error: ", message);
        setLoading(false);
      } else {
        setEmail("");
        setPassword("");
        console.log("User data: ", data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError("Unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f7f7c6] mt-8 rounded-md dark:bg-[#1717173d] sm:w-[60%] sm:mx-auto lg:w-[25%] lg:p-4">
      <header className="text-center text-lg font-medium py-2 lg:text-2xl">
        <h1>Sign In to continue</h1>
      </header>
      <form
        onSubmit={handleSubmit}
        onFocus={() => setError(null)}
        className="flex flex-col gap-8 p-4"
      >
        <div className="flex flex-col gap-2">
          <Label id="email">Email address</Label>
          <Input
            className="p-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            id="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label id="password" className="flex justify-between">
            <span>Password</span>
            {!showPassword ? (
              <Eye onClick={() => setShowPassword(true)} size={16} />
            ) : (
              <EyeOff onClick={() => setShowPassword(false)} size={16} />
            )}
          </Label>
          <Input
            type={showPassword ? "text" : "password"}
            className="p-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-red-400 text-center text-sm">{error}</div>
        )}
        <Button className="bg-[#F59E0B] text-[#262626] hover:bg-[#F59E0B] dark:text-white">
          {!loading ? (
            <span>Log in</span>
          ) : (
            <span className="border-t-transparent border-3 h-5 w-5 rounded-full dark:border-white dark:border-t-transparent animate-spin"></span>
          )}
        </Button>
        <footer>
          <p className="text-xs text-center">
            <span className="font-mediumm">Don't have an account ?</span>{" "}
            <span>
              <Link className="underline" href="/auth/signup">
                Create account
              </Link>
            </span>
          </p>
          <p className="my-3 text-center text-xs">or continue with</p>
          <div className="w-fit mx-auto">
            <FaGoogle />
          </div>
        </footer>
      </form>
    </div>
  );
}
