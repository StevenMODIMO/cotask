"use client";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/auth/signup">Sign up</Link>
      <Link href="/auth/login">Sign in</Link>
    </div>
  );
}
