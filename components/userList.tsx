"use client";
import React from "react";
import { useState } from "react";
import { Employees } from "./employeeCard";
import { Input } from "./ui/input";

type User = {
  [key: string]: any;
};

export default function UserList({ users }: { users: User[] }) {
  return (
    <div className="container mx-auto lg:max-w-7xl">
      {/* 1) heading 2)search box  3) filter */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Employess list */}
      <div className="space-y-4">
        <Employees users={users} />
      </div>
    </div>
  );
}
