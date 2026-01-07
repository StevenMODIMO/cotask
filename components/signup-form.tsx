"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Link from "next/link";

import { Facebook, Github, Twitter } from "lucide-react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState("");
  return (
    <div className="bg-[#F8F7F7] mt-4  dark:bg-[#171717]">
      <header className="text-center text-lg font-medium py-2">
        <h1>Signup for a new account</h1>
      </header>
      <form className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label id="email">Email address</Label>
          <Input
            id="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label id="password">Password</Label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <footer className="flex justify-between items-center">
          <Button className="bg-[#F59E0B] text-[#262626] hover:bg-[#F59E0B] dark:text-white w-fit">
            Signup
          </Button>
          <p className="text-xs underline">
            <span className="">Do you have an account ?</span>{" "}
            <span>
              <Link href="/auth/login">Sign in</Link>
            </span>
          </p>
        </footer>
        <section className="my-3">
          <p className="text-center text-xs">or continue with</p>
          <div className="flex items-center justify-center my-4 gap-2">
            <Facebook size={24} className="text-blue-500" />
            <Github size={24} />
            <Twitter size={24} className="text-blue-400" />
          </div>
        </section>
      </form>
    </div>
  );
}
