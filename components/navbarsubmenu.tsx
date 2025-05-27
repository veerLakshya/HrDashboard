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
      {/* Trigger for dropdown menu of profile */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="py-6">
          {session?.user && (
            <>
              <span className="">{userName}</span>
              <Image
                src={session.user.image || ""}
                alt="User Avatar"
                width={30}
                height={30}
                className="rounded-full"
              />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      {userName && (
        <div>
          {/* Dropdown menu content */}
          <DropdownMenuContent className="w-44">
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Profile related Options*/}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/user-info" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/bookmarks" className="w-full">
                  Bookmarks
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/analytics" className="w-full">
                  Analytics
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
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
