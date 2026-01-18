"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, House, User } from "lucide-react";
import {
  Dialog,
  SideDialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

interface NotificationsType {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export default function AuthButton() {
  const [user, setUser] = useState<any | null>(null);
  const [notifications, setNotifications] = useState<
    NotificationsType[] | null
  >(null);

  const supabase = createClient();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  };

  useEffect(() => {
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          const newNotification = payload.new as NotificationsType;

          setNotifications((prev) =>
            prev ? [newNotification, ...prev] : [newNotification]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      const { data, error } = await supabase.from("notifications").select();
      if (data) {
        setNotifications(data);
      }
    };
    getNotifications();
  }, []);

  useEffect(() => {
    // 1️⃣ Get initial session
    const getInitialUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    getInitialUser();

    // 2️⃣ Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const del = async () => {
    const { data, error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", "0e7fef7e-8d38-4fbb-befe-02633137d4bf");

    if (data) {
      console.log("DONE");
    } else {
      console.log("FAILED", error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <House size={18} />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="relative">
              <Bell size={18} className="cursor-pointer" />
              {notifications && (
                <>
                  {notifications.length > 0 && (
                    <span className="absolute bottom-3 animate-pulse bg-blue-500 h-3 w-3 rounded-full" />
                  )}
                </>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {notifications?.map(({ id, title, description, created_at }) => {
                return (
                  <DropdownMenuGroup key={id}>
                    <DropdownMenuItem>{title}</DropdownMenuItem>
                    <DropdownMenuItem>{description}</DropdownMenuItem>
                    <DropdownMenuItem>{created_at}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuGroup>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {user.user_metadata.avatar ? (
                <div className="relative w-10 h-10 cursor-pointer">
                  <Image
                    className="rounded-full border-2 border-dashed"
                    src={user.user_metadata.avatar}
                    alt={user.email}
                    fill={true}
                  />
                </div>
              ) : (
                <User size={24} />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-[#262626] dark:text-white font-medium">
              <DropdownMenuGroup>
                <DropdownMenuItem className="font-bold text-[16px]">
                  {user.user_metadata.username}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs">
                  {user.id}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            asChild
            className="bg-yellow-500 text-[#262626] hover:bg-yellow-500 dark:text-white"
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
      )}
    </div>
  );
}
