import React from "react";
import DashboardNav from "@/components/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:flex md:gap-6">
      <DashboardNav />
      <div className="md:w-[80%]">{children}</div>
    </div>
  );
}
