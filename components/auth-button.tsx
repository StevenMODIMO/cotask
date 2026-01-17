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

export default function AuthButton() {
  const [user, setUser] = useState<any | null>(null);

  const supabase = createClient();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  };

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

  return (
    <div>
      {user ? (
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
              <DropdownMenuItem className="text-xs">{user.id}</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // <Dialog>
        //   <DialogTrigger>
        //     {user.user_metadata.avatar ? (
        //       <div className="relative w-10 h-10 cursor-pointer">
        //         <Image
        //           className="rounded-full border-2 border-dashed"
        //           src={user.user_metadata.avatar}
        //           alt={user.email}
        //           fill={true}
        //         />
        //       </div>
        //     ) : (
        //       <User size={24} />
        //     )}
        //   </DialogTrigger>
        //   <SideDialogContent>
        //     <DialogHeader>
        //       <DialogHeader>
        //         <DialogTitle>User profile</DialogTitle>
        //       </DialogHeader>
        //     </DialogHeader>
        //   </SideDialogContent>
        // </Dialog>
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
