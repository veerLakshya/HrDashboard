import { Metadata } from "next";
import BookmarksClient from "./BookmarksClient";

export const metadata: Metadata = {
  title: "Bookmarks | Flam HR Dashboard",
  description:
    "View and manage your bookmarked employees. Access your saved employee profiles quickly and efficiently.",
};

export default function BookmarksPage() {
  return <BookmarksClient />;
}
