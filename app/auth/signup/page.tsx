import type { Metadata } from "next";
import SignupForm from "@/components/signup-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Account",
};

export default async function Signup() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div>
      <SignupForm />
    </div>
  );
}
