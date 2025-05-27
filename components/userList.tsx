// UserList: Displays a list of employees with filtering and search functionality
"use client";
import React, { useEffect, useState } from "react";
import { Employees } from "./employeeCard";
import { initializeUsersExtras } from "@/utils/userDataManager";
import { useSearch } from "@/Hooks/useSearch";
import { SearchBar } from "./SearchBar";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { Filter, FilterX } from "lucide-react";

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

  // Search and filter functionality
  const {
    filters,
    filteredUsers,
    updateSearchQuery,
    updateDepartmentFilter,
    updateRatingFilter,
    clearFilters,
  } = useSearch(usersWithExtras);

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

  // Get unique departments and ratings for filter options
  const departmentOptions = React.useMemo(() => {
    const uniqueDepartments = [
      ...new Set(
        usersWithExtras.map((user) => user.department).filter(Boolean)
      ),
    ];
    // Filter out undefined and ensure label/value are always string
    return uniqueDepartments
      .filter((dept): dept is string => typeof dept === "string")
      .map((dept) => ({ value: dept, label: dept }));
  }, [usersWithExtras]);

  const ratingOptions = [
    { value: 1, label: "⭐ 1 Star" },
    { value: 2, label: "⭐⭐ 2 Stars" },
    { value: 3, label: "⭐⭐⭐ 3 Stars" },
    { value: 4, label: "⭐⭐⭐⭐ 4 Stars" },
    { value: 5, label: "⭐⭐⭐⭐⭐ 5 Stars" },
  ];

  const hasActiveFilters =
    filters.searchQuery ||
    filters.departments.length > 0 ||
    filters.ratings.length > 0;
  // Show loading state during client-side data preparation
  if (!isLoaded || usersWithExtras.length === 0) {
    return (
      <div className="container mx-auto lg:max-w-7xl">
        <div className="flex items-center justify-between mb-5">
          {/* Loading placeholder for search and filters */}
          <div className="h-8 bg-zinc-800 rounded w-64"></div>
          <div className="h-8 bg-zinc-800 rounded w-32"></div>
        </div>
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-8 bg-zinc-800 rounded mb-4"></div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-zinc-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto lg:max-w-7xl">
      {/* Header with search and filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        {/* Search Bar */}
        <SearchBar
          onSearch={updateSearchQuery}
          placeholder="Search by name or email..."
          className="sm:w-80 text-black"
        />

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <MultiSelectFilter
            title="Departments"
            options={departmentOptions}
            selectedValues={filters.departments}
            onSelectionChange={(values) =>
              updateDepartmentFilter(
                values.filter((v): v is string => typeof v === "string")
              )
            }
            className="w-40 text-black"
          />
          <MultiSelectFilter
            title="Ratings"
            options={ratingOptions}
            selectedValues={filters.ratings}
            onSelectionChange={(values) =>
              updateRatingFilter(
                values.filter((v): v is number => typeof v === "number")
              )
            }
            className="w-40 text-black"
          />{" "}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-gray-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer hover:bg-zinc-800 rounded"
              title="Clear all filters"
            >
              <FilterX className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results info */}
      {hasActiveFilters && (
        <div className="mb-4 text-sm text-gray-300">
          Showing {filteredUsers.length} of {usersWithExtras.length} employees
          {filters.searchQuery && (
            <span> matching &quot;{filters.searchQuery}&quot;</span>
          )}
        </div>
      )}

      {/* Employees list */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          <Employees users={filteredUsers} />
        ) : (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No employees found
            </h3>
            <p className="text-gray-300 mb-4">
              Try adjusting your search or filter criteria
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
