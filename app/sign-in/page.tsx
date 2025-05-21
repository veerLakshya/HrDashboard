"use client";
import React from "react";
import SignInButton from "../components/sign-in-button";

const page = () => {
  return (
    <div>
      <h1 className="text-2xl mb-4">Please Sign In</h1>
      <p className="mb-4">You need to be signed in to access this page.</p>
      <SignInButton />
    </div>
  );
};

export default page;
