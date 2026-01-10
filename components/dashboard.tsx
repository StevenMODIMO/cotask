"use client";
import { LayoutList, ChartNoAxesGantt, UsersRound, Bolt } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <div className="absolute bottom-0 border-t-2 w-[90%] pt-2 flex items-center justify-between gap-4 text-[#262626] dark:text-white md:static md:border-t-0 md:flex-col md:items-start md:w-[10%]">
      <div className="flex items-center gap-4 font-medium md:flex-col md:items-start">
        <Link
          href="/dashboard"
          className="flex flex-col gap-2 items-center md:flex-row"
        >
          <ChartNoAxesGantt
            size={20}
            className={`${pathname === "/dashboard" && "text-[#F59E0B]"}`}
          />
          <span className="text-xs">Overview</span>
        </Link>
        <Link
          href="/dashboard/tasks"
          className="flex flex-col gap-2 items-center md:flex-row"
        >
          <LayoutList
            size={20}
            className={`${pathname === "/dashboard/tasks" && "text-[#F59E0B]"}`}
          />
          <span className="text-xs">Tasks</span>
        </Link>
        <Link
          href="/dashboard/teams"
          className="flex flex-col gap-2 items-center md:flex-row"
        >
          <UsersRound
            size={20}
            className={`${pathname === "/dashboard/teams" && "text-[#F59E0B]"}`}
          />
          <span className="text-xs">Teams</span>
        </Link>
      </div>
      <footer className="font-medium">
        <Link
          href="/dashboard/settings"
          className="flex flex-col gap-2 items-center md:flex-row"
        >
          <Bolt
            size={20}
            className={`${
              pathname === "/dashboard/settings" && "text-[#F59E0B]"
            }`}
          />
          <span className="text-xs">Settings</span>
        </Link>
      </footer>
    </div>
  );
}
