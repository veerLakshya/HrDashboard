"use client";
import React, { use } from "react";
import { login, logout } from "../lib/actions/auth";

const SignOutButton = () => {
  return <button onClick={logout}>SignOut</button>;
};

export default SignOutButton;
