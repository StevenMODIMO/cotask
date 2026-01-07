import type { Metadata } from "next";
import SignupForm from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function Signup() {
  return <div><SignupForm /></div>;
}
