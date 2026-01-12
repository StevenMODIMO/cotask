import React from "react";
import DashboardNav from "@/components/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:flex md:gap-6 lg:px-4 md:h-150 lg:h-162.5">
      <DashboardNav />
      <div className="md:w-[90%] lg:w-[60%] lg:mx-auto">{children}</div>
    </div>
  );
}
