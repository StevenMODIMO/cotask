"use client";
import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface SignupProps {
  email: string;
  password: string;
  username: string;
  avatar?: File | null;
}

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const signup = async ({ email, password, username, avatar }: SignupProps) => {
    setLoading(true);
    setError(null);
    try {
      const { data: signupData, error: signupError } =
        await supabase.auth.signUp({
          email,
          password,
          options: { data: { username, avatar: "" } },
        });

      if (signupError) {
        setError(signupError.message);
        setLoading(false);

        if (signupError.message.includes("Anonymous sign-ins are disabled")) {
          setError("All fields must be filled");
          setLoading(false);
          return false
        }
      }

      if (signupData.user && avatar) {
        const fileName = `${signupData.user.id}.${avatar.name
          .split(".")
          .pop()}`;
        const { data: fileData, error: fileError } = await supabase.storage
          .from("avatar")
          .upload(fileName, avatar, { cacheControl: "3600", upsert: false });

        if (fileData) {
          const { data: urlData } = supabase.storage
            .from("avatar")
            .getPublicUrl(fileData.path);
          if (urlData) {
            const { data: updateData, error: updateError } =
              await supabase.auth.updateUser({
                data: { avatar: urlData.publicUrl },
              });
            await supabase.auth.refreshSession();
          }
        } else {
          console.log(`File upload failed: `, fileError);
        }
      }
      return true;
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
      setLoading(false);
      return false;
    }
  };
  return { loading, setLoading, error, setError, signup };
}
