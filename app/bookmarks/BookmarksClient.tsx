"use client";

import React, { useState, useEffect } from "react";
import { Bookmark, Trash2, Building, Star, BookmarkX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Design",
];

const BOOKMARKS_STORAGE_KEY = "hr_dashboard_bookmarks";

// Helper functions for bookmark management
const getBookmarksFromStorage = (): User[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading bookmarks:", error);
    return [];
  }
};

const saveBookmarksToStorage = (bookmarks: User[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error("Error saving bookmarks:", error);
  }
};

const BookmarksClient = () => {
  const [bookmarkedUsers, setBookmarkedUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setBookmarkedUsers(getBookmarksFromStorage());
    setIsLoaded(true);
  }, []);

  const removeBookmark = (userId: number) => {
    setBookmarkedUsers((prevBookmarks) => {
      const newBookmarks = prevBookmarks.filter((user) => user.id !== userId);
      saveBookmarksToStorage(newBookmarks);
      return newBookmarks;
    });
  };

  const assignDepartment = (userId: number, department: string) => {
    setBookmarkedUsers((prevBookmarks) => {
      const newBookmarks = prevBookmarks.map((user) =>
        user.id === userId ? { ...user, department } : user
      );
      saveBookmarksToStorage(newBookmarks);
      return newBookmarks;
    });
  };

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {" "}
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="w-8 h-8 text-[#D6FF00]" />
        <div>
          <h1 className="text-3xl font-bold text-white">Bookmarks</h1>
          <p className="text-gray-300 mt-1">Your saved employee profiles</p>
        </div>
      </div>
      {/* No bookmarks state */}
      {bookmarkedUsers.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center border-2 border-zinc-700">
              <BookmarkX className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            No Bookmarked Employees
          </h2>{" "}
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            You haven&apos;t bookmarked any employees yet. Start exploring and
            save your favorite team members.
          </p>
          <Button
            asChild
            className="bg-[#D6FF00] text-black hover:bg-[#c2eb00]"
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      ) : (
        /* Bookmarks grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
            >
              {/* user header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-600 rounded-full flex items-center justify-center">
                  <span className="text-[#D6FF00] text-lg font-semibold">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-300">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* details */}
              <div className="space-y-2 mb-4">
                {" "}
                <div className="flex items-center gap-2 text-sm">
                  <Building className="w-4 h-4 text-[#D6FF00]" />
                  <span className="text-gray-300">
                    {user.department || "No Department"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-[#D6FF00]" />
                  <span className="text-gray-300">
                    {user.rating ? `${user.rating}/5 Stars` : "No Rating"}
                  </span>
                </div>
              </div>
              {/* adding departments*/}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Assign Department
                </label>{" "}
                <select
                  value={user.department || ""}
                  onChange={(e) => assignDepartment(user.id, e.target.value)}
                  className="w-full p-2 border border-zinc-700 rounded-md text-sm bg-zinc-800 text-white focus:ring-2 focus:ring-[#D6FF00] focus:border-transparent cursor-pointer"
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              {/* actions */}
              <div className="flex gap-2">
                {" "}
                <Link
                  href={`/Employee/${user.id}`}
                  className="flex-1 bg-zinc-800 text-white text-center py-2 rounded-md hover:bg-zinc-700 hover:border-[#D6FF00] transition-all duration-200 text-sm border border-zinc-700 cursor-pointer"
                >
                  View Details
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeBookmark(user.id)}
                  className="px-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 border-zinc-700 cursor-pointer transition-all duration-200"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksClient;
