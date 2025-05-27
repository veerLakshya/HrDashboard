"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  onSearch,
  placeholder = "Search employees...",
  className = "",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
        placeholder={placeholder}
      />{" "}
      {query && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:bg-zinc-700 rounded-r-lg transition-colors"
        >
          <X className="h-4 w-4 text-gray-400 hover:text-gray-200 transition-colors" />
        </button>
      )}
    </div>
  );
};
