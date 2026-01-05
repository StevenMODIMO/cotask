"use client";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/icon.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div>
      <nav className="flex items-center justify-between border-b pb-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image
              src={Logo}
              alt="logo"
              fill
              sizes="(max-width: 768px) 30px, 40px"
              priority={true}
            />
          </div>
          <span className="font-semibold">Cotask</span>
        </Link>
        <div className="flex gap-2">
          <Button className="text-xs border-2 border-[#F59E0B] bg-inherit text-white hover:bg-[#262626]">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button className="text-xs bg-[#F59E0B] text-white hover:bg-[#fcd34d]">
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button className="text-xs border-2 border-[#F59E0B] bg-inherit text-white hover:bg-[#262626]">
            <Link href="/auth/signup">Sign up</Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
