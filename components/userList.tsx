"use client";
import React from "react";
import { useState } from "react";
import EmployeeCard from "./employeeCard";
import { Input } from "./ui/input";
import { ComboboxDemo } from "./filter-dropdown";

type User = {
  [key: string]: any;
};

export default function UserList({ users }: { users: User[] }) {
  const [filter, setFilter] = useState("");
  return (
    <div className="container mx-auto lg:max-w-7xl">
      {/* 1) heading 2)search box 3) filter*/}
      <div className="flex items-center justify-between mb-5">
        {/* heading */}
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {/* search box & filter */}
        <div className="flex items-center space-x-4">
          <div className="">
            <Input className="" placeholder="Search..." />
          </div>
          <div className="">
            {/* <select className="border rounded p-2">
              <option value="">All Departments</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
            </select> */}
            <ComboboxDemo />
          </div>
        </div>
      </div>

      {/* first stripe */}
      <div>
        <div className="sm:grid grid-cols-5 bg-gray-100  rounded-lg text-lg text-gray-700 tracking-wide hidden">
          <div className="flex border rounded-l-lg p-2 items-center justify-center">
            Employee
          </div>
          <div className="flex border  p-2 items-center justify-center">
            Email
          </div>
          <div className="flex border  p-2 items-center justify-center">
            Department
          </div>
          <div className="flex border  p-2 items-center justify-center">
            Rating
          </div>
          <div className="flex border rounded-r-lg  p-2 items-center justify-center">
            Actions
          </div>
        </div>
      </div>
      {/* Employess list */}
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4  rounded shadow-sm hover:shadow-md transition-shadow"
          >
            <EmployeeCard user={user} />
            <h2 className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
