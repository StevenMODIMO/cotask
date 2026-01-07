"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Link from "next/link";

import { FaGoogle } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[#f8f7f7c6] mt-8 rounded-md dark:bg-[#1717173d] sm:w-[60%] sm:mx-auto lg:w-[25%] lg:p-4">
      <header className="text-center text-lg font-medium py-2 lg:text-2xl">
        <h1>Signup for a new account</h1>
      </header>
      <form className="flex flex-col gap-8 p-4">
        <div className="flex flex-col gap-2">
          <Label className="border-2 border-dashed w-16 h-16 rounded-full mx-auto flex items-center justify-center sm:border-3 sm:w-18 sm:h-18">
            <Input type="file" className="hidden" />
            <div className="flex flex-col gap-1">
              <p className="text-xs text-center leading-none">Avatar</p>
              <p className="hidden sm:block text-[8px] text-center leading-none">
                Drag or Upload
              </p>
            </div>
          </Label>
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
        <Button className="bg-[#F59E0B] text-[#262626] hover:bg-[#F59E0B] dark:text-white">
          Signup
        </Button>
        <footer>
          <p className="text-xs text-center">
            <span className="font-mediumm">Do you have an account ?</span>{" "}
            <span>
              <Link className="underline" href="/auth/login">
                Sign in
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
