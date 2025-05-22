"use client";
import React from "react";
import { useState } from "react";
import EmployeeCard from "./employeeCard";
import { Input } from "./ui/input";

type User = {
  [key: string]: any;
};

export default function UserList({ users }: { users: User[] }) {
  const [filter, setFilter] = useState("");
  return (
    <div className="container mx-auto lg:max-w-7xl">
      {/* 1) heading 2)search box  3) filter*/}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="">
            <Input className="" placeholder="Search..." />
          </div>
          <div className=""></div>
        </div>
      </div>

      {/* first stripe */}
      <div>
        <div className="sm:grid grid-cols-5 rounded-lg text-lg text-zinc-950 tracking-wide hidden">
          <div className="flex pl-4 border rounded-l-lg p-1 ">Employee Id</div>
          <div className="flex pl-4 border p-1 ">Name</div>
          <div className="flex pl-4 border p-1 ">Department</div>
          <div className="flex pl-4 border p-1 ">Rating</div>
          <div className="flex pl-4 border rounded-r-lg p-1 ">Actions</div>
        </div>
      </div>
      {/* Employess list */}
      <div className="space-y-4">
        {users.map((user) => (
          <EmployeeCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
