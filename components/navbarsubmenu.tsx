// NavbarSubmenu: Dropdown submenu for user actions and navigation links

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "./../app/auth";
import { logout } from "../lib/actions/auth";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function DropdownMenuDemo() {
  const session = await auth();
  function toFirstCapital(str: string) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const userName = toFirstCapital(session?.user?.name || "");
  return (
    <DropdownMenu>
      {/* Trigger for dropdown menu of profile */}{" "}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="py-6 px-4 hover:bg-zinc-800">
          {session?.user && (
            <>
              <span className="text-[#D6FF00] font-semibold text-base mr-4 tracking-wide">
                {userName}
              </span>
              <Image
                src={session.user.image || ""}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      {userName && (
        <div>
          {" "}
          {/* Dropdown menu content */}
          <DropdownMenuContent className="w-44 bg-zinc-900 border-zinc-700">
            <DropdownMenuLabel className="text-[#D6FF00] font-medium">
              {userName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700" />{" "}
            {/* Profile related Options*/}
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800">
                <Link
                  href="/user-info"
                  className="w-full hover:text-[#D6FF00] transition-colors"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800">
                <Link
                  href="/dashboard"
                  className="w-full hover:text-[#D6FF00] transition-colors"
                >
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800">
                <Link
                  href="/bookmarks"
                  className="w-full hover:text-[#D6FF00] transition-colors"
                >
                  Bookmarks
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800">
                <Link
                  href="/analytics"
                  className="w-full hover:text-[#D6FF00] transition-colors"
                >
                  Analytics
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 hover:text-[#D6FF00] transition-colors">
                <Link
                  href="/settings"
                  className="w-full hover:text-[#D6FF00] transition-colors"
                >
                  Settings(dummy)
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-zinc-700" />
            {/* Logout Option with Alert*/}{" "}
            <div className="w-full">
              <AlertDialog>
                <AlertDialogTrigger asChild className="w-full">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-zinc-800 group"
                  >
                    <span>Logout</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure you want to Logout?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently remove
                      your bookmarks.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>
                      LogOut
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </DropdownMenuContent>
        </div>
      )}
    </DropdownMenu>
  );
}
