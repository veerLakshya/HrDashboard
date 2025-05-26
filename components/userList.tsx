"use client";
import React, { useEffect, useState } from "react";
import { Employees } from "./employeeCard";
import { initializeUsersExtras } from "@/utils/userDataManager";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rating?: number;
  department?: string;
  address?: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
  };
};

export default function UserList({ users }: { users: User[] }) {
  const [usersWithExtras, setUsersWithExtras] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize consistent ratings and departments for all users
    const userIds = users.map((user) => user.id);
    const userExtrasMap = initializeUsersExtras(userIds);

    // Merge the extra data with user data
    const enhancedUsers = users.map((user) => ({
      ...user,
      rating: userExtrasMap[user.id]?.rating || 1,
      department: userExtrasMap[user.id]?.department || "Engineering",
    }));

    setUsersWithExtras(enhancedUsers);
    setIsLoaded(true);
  }, [users]);

  // Show loading state during client-side data preparation
  if (!isLoaded || usersWithExtras.length === 0) {
    return (
      <div className="container mx-auto lg:max-w-7xl">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:max-w-7xl">
      {/* 1) heading 2)search box  3) filter */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Employess list */}
      <div className="space-y-4">
        <Employees users={usersWithExtras} />
      </div>
    </div>
  );
}
