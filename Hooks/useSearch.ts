"use client";

// useSearch:
// 1. manages search and filter state for users
// 2. including search query, department, and rating filters
// provides filtered user list and update functions for each filter

import { useState, useMemo } from "react";
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

export interface SearchFilters {
  searchQuery: string;
  departments: string[];
  ratings: number[];
}

export const useSearch = (users: User[]) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: "",
    departments: [],
    ratings: [],
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search query filter (name and email)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const email = user.email.toLowerCase();

        if (!fullName.includes(query) && !email.includes(query)) {
          return false;
        }
      }

      // department filter
      if (filters.departments.length > 0) {
        if (
          !user.department ||
          !filters.departments.includes(user.department)
        ) {
          return false;
        }
      }

      // rating filter
      if (filters.ratings.length > 0) {
        if (!user.rating || !filters.ratings.includes(user.rating)) {
          return false;
        }
      }

      return true;
    });
  }, [users, filters]);

  const updateSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const updateDepartmentFilter = (departments: string[]) => {
    setFilters((prev) => ({ ...prev, departments }));
  };

  const updateRatingFilter = (ratings: number[]) => {
    setFilters((prev) => ({ ...prev, ratings }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      departments: [],
      ratings: [],
    });
  };

  return {
    filters,
    filteredUsers,
    updateSearchQuery,
    updateDepartmentFilter,
    updateRatingFilter,
    clearFilters,
  };
};
