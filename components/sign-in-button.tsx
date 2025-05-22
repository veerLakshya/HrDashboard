"use client";
import { login } from "../lib/actions/auth";
import { Button } from "./ui/button";

const SignInButton = () => {
  return (
    <div className="flex items-center">
      <Button onClick={() => login({ provider: "github" })} variant={"default"}>
        Sign in with Github
      </Button>
      <Button onClick={() => login({ provider: "google" })}>
        Sign in With Google
      </Button>
    </div>
  );
};

export default SignInButton;
