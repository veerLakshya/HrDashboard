"use client";
import React, { use } from "react";
import { login } from "../lib/actions/auth";

const SignInButton = () => {
  return (
    <div className="">
      <button className="bg-red-400 cursor-pointer" onClick={() => login()}>
        {" "}
        Sign in With Github
      </button>
    </div>
  );
};

export default SignInButton;
