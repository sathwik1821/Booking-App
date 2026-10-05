import AuthLayout from "@/components/ui/layouts/aouth.layout";
import SignIn from "./singin";
import SignUp from "./signup";
import React from "react";

export const SignInPage = () => (
  <AuthLayout
    title="Welcome back"
    description="Enter your details to sign in to your account."
  >
    <SignIn />
  </AuthLayout>
);

export const SignUpPage = () => (
  <AuthLayout
    title="Create your account"
    description="Join millions of travellers and start booking today."
  >
    <SignUp />
  </AuthLayout>
);
