"use client";
import React from "react";
import { Button } from "./ui/button";
import { logout } from "../lib/actions/auth";

const SignOutButton = () => {
  return <Button onClick={logout}>SignOut</Button>;
};

export default SignOutButton;
