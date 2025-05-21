"use client";
import { login } from "../lib/actions/auth";
import { Button } from "@/app/components/ui/button";

const SignInButton = () => {
  return (
    <div className="mt-10">
      <Button onClick={() => login()} variant={"outline"}>
        {" "}
        Sign in with Github
      </Button>
      <button className="bg-red-400 cursor-pointer" onClick={() => login()}>
        {" "}
        Sign in With Github
      </button>
    </div>
  );
};

export default SignInButton;
