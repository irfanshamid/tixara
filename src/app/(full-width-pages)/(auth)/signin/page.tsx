export const dynamic = "force-dynamic";

import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KKTOP Dashboard | Login",
  description: "User sign in",
};

export default function SignIn() {
  return <SignInForm />;
}
