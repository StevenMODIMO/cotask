"use client";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/icon.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LightLogo from "@/assets/light.svg";
import { ChevronLeft, House } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div>
      {pathname !== "/auth/signup" && pathname !== "/auth/login" ? (
        <nav className="flex justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src={LightLogo} alt="logo" fill />
            </div>
            <p className="text-[#262626] dark:text-white font-medium">CoTask</p>
          </Link>

          <div className="flex gap-2">
            <Button
              asChild
              className="bg-[#F59E0B] text-[#262626] hover:bg-[#F59E0B] dark:text-white"
            >
              <Link href="/auth/signup">Get started</Link>
            </Button>

            <Button
              asChild
              className="bg-white text-[#262626] hover:bg-white dark:bg-[#262626] dark:text-white"
            >
              <Link href="/auth/login">Sign in</Link>
            </Button>
          </div>
        </nav>
      ) : (
        <div className="flex gap-2 items-center">
          <ChevronLeft
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <House onClick={() => router.push("/")} className="cursor-pointer" />
        </div>
      )}
    </div>
  );
}
