"use client";
import { login } from "../lib/actions/auth";
import { Button } from "./ui/button";

const SignInButton = () => {
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => login({ provider: "github" })}
        variant={"default"}
        className="cursor-pointer hover:bg-[#c2eb00] transition-colors"
      >
        Sign in with Github
      </Button>
      <Button
        onClick={() => login({ provider: "google" })}
        className="cursor-pointer hover:bg-[#c2eb00] transition-colors"
      >
        Sign in With Google
      </Button>
    </div>
  );
};

export default SignInButton;
