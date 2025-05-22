import Link from "next/link";
import { auth } from "@/app/auth";
import { Button } from "./ui/button";
import DropdownMenuDemo from "./navbarsubmenu";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left side */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex-shrink-0 text-3xl font-semibold text-gray-900 "
          >
            F<span className="text-xl ">LAM</span>
          </Link>
        </div>
        {/* Right Side User or sign in */}
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <>
              <div className="flex items-center space-x-4 cursor-pointer">
                <DropdownMenuDemo />
              </div>
            </>
          ) : (
            <>
              <Button variant="default">
                <Link href="/sign-in" className="text-sm">
                  Sign In
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
