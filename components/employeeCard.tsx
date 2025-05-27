"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bookmark, Eye } from "lucide-react";

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

const BOOKMARKS_STORAGE_KEY = "hr_dashboard_bookmarks";

// extract bookmarks from localStorage
const getBookmarksFromStorage = (): User[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("error retreving bookmaks:", error);
    return [];
  }
};

const saveBookmarksToStorage = (bookmarks: User[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error("error saving bookmarks:", error);
  }
};

// Actions component for each user row
function UserActions({
  user,
  isBookmarked,
  onToggleBookmark,
}: {
  user: User;
  isBookmarked: boolean;
  onToggleBookmark: (user: User) => void;
}) {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleBookmark(user);
  };

  return (
    <div className="flex items-center gap-2">
      {" "}
      <Link
        href={`/Employee/${user.id}`}
        className="p-1 text-blue-400 hover:text-blue-300 transition-colors rounded-full hover:bg-zinc-800"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </Link>
      <button
        onClick={handleBookmarkClick}
        className={`p-1 transition-colors rounded-full hover:bg-zinc-800 cursor-pointer ${
          isBookmarked
            ? "text-yellow-500 hover:text-yellow-400"
            : "text-gray-400 hover:text-yellow-500"
        }`}
        title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
      >
        <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
      </button>
    </div>
  );
}

export function Employees({ users }: { users: User[] }) {
  // Local state to manage bookmarks
  const [bookmarkedUsers, setBookmarkedUsers] = useState<User[]>([]);

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    setBookmarkedUsers(getBookmarksFromStorage());
  }, []);

  // Function to toggle bookmark status for a user
  const handleToggleBookmark = (user: User) => {
    setBookmarkedUsers((prevBookmarks) => {
      const isCurrentlyBookmarked = prevBookmarks.some(
        (bookmark) => bookmark.id === user.id
      );

      let newBookmarks: User[];
      if (isCurrentlyBookmarked) {
        // Remove bookmark
        newBookmarks = prevBookmarks.filter(
          (bookmark) => bookmark.id !== user.id
        );
      } else {
        // Add bookmark
        newBookmarks = [...prevBookmarks, user];
      }

      // Save to localStorage
      saveBookmarksToStorage(newBookmarks);
      return newBookmarks;
    });
  };

  // Check if a user is bookmarked
  const isUserBookmarked = (userId: number) => {
    return bookmarkedUsers.some((bookmark) => bookmark.id === userId);
  };
  // Define table columns
  const columns: ColumnDef<User>[] = [
    {
      id: "name",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original;
        return `${user.firstName} ${user.lastName}`;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = row.getValue("rating") as number;
        return rating ? (
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-gray-200">{rating.toFixed(1)}</span>
          </div>
        ) : (
          <span className="text-gray-500">N/A</span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <UserActions
            user={user}
            isBookmarked={isUserBookmarked(user.id)}
            onToggleBookmark={handleToggleBookmark}
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border border-zinc-700 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-zinc-700"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-gray-300">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-zinc-900">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer hover:bg-zinc-800 border-b border-zinc-700 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-gray-200">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-300"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 disabled:text-gray-500 disabled:bg-zinc-900"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 disabled:text-gray-500 disabled:bg-zinc-900"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
