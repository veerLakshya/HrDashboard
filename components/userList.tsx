"use client";
import React from "react";
import { Employees } from "./employeeCard";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
  };
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
