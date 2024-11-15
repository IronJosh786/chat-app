import React from "react";
import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

const page = async () => {
  const session = await auth();
  if (!session) return <SignIn />;
  return <SignOut />;
};

export default page;
