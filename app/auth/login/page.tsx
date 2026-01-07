import type { Metadata } from "next";
import LoginForm from "@/components/login-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function Login() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  if(user) {
    redirect("/dashboard")
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
}
