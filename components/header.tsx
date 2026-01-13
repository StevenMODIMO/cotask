"use client";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/icon.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LightLogo from "@/assets/light.svg";
import { ChevronLeft, House } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import AuthButton from "./auth-button";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const activeRoutes = [
    "/dashboard",
    "/dashboard/tasks",
    "/dashboard/teams",
    "/dashboard/settings",
  ];

  const isActive = activeRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <div className={`${isActive ? "border-b-2 pb-2" : ""}`}>
      {pathname !== "/auth/signup" && pathname !== "/auth/login" ? (
        <nav className="flex justify-between lg:px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src={LightLogo} alt="logo" fill />
            </div>
            <p className="text-[#262626] dark:text-white font-medium">CoTask</p>
          </Link>
          <AuthButton />
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
