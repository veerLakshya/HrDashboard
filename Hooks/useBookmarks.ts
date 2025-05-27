"use client";

// useBookmarks:
// 1) manage the global list of all bookmarked user ids in localStorage
// 2) provides add/remove funct.
// used to keep bookmark state in sync across the app.

import { useState, useEffect } from "react";

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

export const useBookmarks = () => {
  const [bookmarkedUsers, setBookmarkedUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // load bookmarks from localstorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
        if (stored) {
          const bookmarks = JSON.parse(stored);
          setBookmarkedUsers(bookmarks);
        }
      } catch (error) {
        console.error("Error loading bookmarks:", error);
      }
      setIsLoaded(true);
    }
  }, []);
  // save to localstorage
  const saveBookmarks = (bookmarks: User[]) => {
    if (typeof window !== "undefined") {
      try {
        // console.log("saving bookmaks to locals:", bookmarks);
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
        setBookmarkedUsers(bookmarks);
        // console.log("bookmarks saved");
      } catch (error) {
        console.error("Error saving bookmarks:", error);
      }
    }
  };
  // adding bookmark mthd
  const addBookmark = (user: User) => {
    // console.log("adding bookmark :", user);
    // console.log("current bookmarked:", bookmarkedUsers);

    const isAlreadyBookmarked = bookmarkedUsers.some(
      (bookmark) => bookmark.id === user.id
    );

    console.log("Is already bookmarked:", isAlreadyBookmarked);

    if (!isAlreadyBookmarked) {
      const newBookmarks = [...bookmarkedUsers, user];
      console.log("New bookmarks array:", newBookmarks);
      saveBookmarks(newBookmarks);
      return true;
    }
    return false;
  };

  const removeBookmark = (userId: number) => {
    const newBookmarks = bookmarkedUsers.filter(
      (bookmark) => bookmark.id !== userId
    );
    saveBookmarks(newBookmarks);
  };

  const isBookmarked = (userId: number) => {
    return bookmarkedUsers.some((bookmark) => bookmark.id === userId);
  };

  const toggleBookmark = (user: User) => {
    if (isBookmarked(user.id)) {
      removeBookmark(user.id);
      return false;
    } else {
      addBookmark(user);
      return true;
    }
  };

  return {
    bookmarkedUsers,
    isLoaded,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
  };
};
