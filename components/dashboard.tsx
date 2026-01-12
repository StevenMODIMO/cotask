"use client";
import {
  LayoutList,
  ChartNoAxesGantt,
  UsersRound,
  Bolt,
  PanelTopClose,
  LaptopMinimal,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";

export default function DashboardNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const { setTheme } = useTheme();

  useEffect(() => {
    const stored = localStorage.getItem("dashboard-collapsed");

    if (stored !== null) {
      setCollapsed(stored === "true");
    }
  }, []);

  return (
    <div
      className={`
        fixed bottom-0 left-0 backdrop-blur-sm
        w-full border-t-2 pt-2
        flex items-center justify-center
        text-[#262626] dark:text-white

        md:static
        md:gap-4
        md:w-[15%]
        md:flex-col
        md:items-start
        md:justify-between
        md:border-t-0
        md:border-r-2
        
        lg:w-[10%]
        ${collapsed ? "md:w-fit md:pr-2 lg:w-fit" : ""}
      `}
    >
      {/* Main nav */}
      <div className="flex items-center gap-4 font-medium sm:justify-around md:flex-col md:items-start">
        <NavItem
          href="/dashboard"
          active={pathname === "/dashboard"}
          icon={<ChartNoAxesGantt size={20} />}
          label="Overview"
          collapsed={collapsed}
        />
        <NavItem
          href="/dashboard/tasks"
          active={pathname === "/dashboard/tasks"}
          icon={<LayoutList size={20} />}
          label="Tasks"
          collapsed={collapsed}
        />
        <NavItem
          href="/dashboard/teams"
          active={pathname === "/dashboard/teams"}
          icon={<UsersRound size={20} />}
          label="Teams"
          collapsed={collapsed}
        />
        <NavItem
          href="/dashboard/settings"
          active={pathname === "/dashboard/settings"}
          icon={<Bolt size={20} />}
          label="Settings"
          collapsed={collapsed}
        />
      </div>

      <div>
        <div
          className="md:flex md:items-center md:gap-2 md:border-t-3 md:py-2 cursor-pointer"
          onClick={() => {
            const next = !collapsed;
            setCollapsed(next);
            localStorage.setItem("dashboard-collapsed", String(next));
          }}
        >
          <PanelTopClose
            size={20}
            className={`${
              collapsed ? "rotate-90" : "rotate-270"
            } transition-transform duration-500 hidden md:flex`}
          />
          {!collapsed && (
            <span className="hidden md:block text-xs md:text-sm font-medium">
              Collapse
            </span>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden md:flex md:mt-1 cursor-pointer">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-5 w-5 p-0 hover:bg-transparent focus-visible:ring-0"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="font-medium"
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="font-medium"
            >
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="font-medium"
            >
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed?: boolean;
}) {
  return (
    <Link
      href={href}
      className="
        flex flex-col items-center gap-1
        md:flex-row md:gap-3
      "
    >
      <span className={active ? "text-yellow-500" : ""}>{icon}</span>
      <span
        className={`
    text-xs md:text-sm
    transition-all duration-300 ease-in-out
    whitespace-nowrap
    ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"}
  `}
      >
        {label}
      </span>
    </Link>
  );
}
