"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, House } from "lucide-react";

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
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <House size={18} />
          </Link>
          <Bell size={18} className="cursor-pointer" />
          <div className="relative w-10 h-10 cursor-pointer">
            <Image
              className="rounded-full border-2 border-dashed"
              src={user.user_metadata.avatar}
              alt={user.email}
              fill={true}
            />
          </div>
          {/* <Button
            onClick={logout}
            className="cursor-pointer bg-yellow-500 text-[#262626] hover:bg-yellow-500 dark:text-white"
          >
            Log out
          </Button> */}
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
