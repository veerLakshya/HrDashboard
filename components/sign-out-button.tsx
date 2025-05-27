"use client";
import React from "react";
import { Button } from "./ui/button";
import { logout } from "../lib/actions/auth";

const SignOutButton = () => {
  return (
    <Button
      onClick={logout}
      variant="outline"
      className="px-4 py-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700 cursor-pointer transition-all duration-200"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
