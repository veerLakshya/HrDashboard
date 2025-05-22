import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "./../app/auth";
import { logout } from "../lib/actions/auth";
import Image from "next/image";
// import
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
            {/* Profile related */}
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
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* Logout */}
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      )}
    </DropdownMenu>
  );
}
