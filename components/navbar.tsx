import Link from "next/link";
import { auth } from "@/app/auth";
import { Button } from "./ui/button";
import DropdownMenuDemo from "./navbarsubmenu";
import FlamLogo from "./FlamLogo";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* LS */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex-shrink-0 text-3xl font-semibold text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="inline-block align-middle">
              <FlamLogo
                width={36}
                height={36}
                className="mr-2"
                alt="Flamapp Logo"
              />
            </span>
            <span>Flam</span>
          </Link>
        </div>
        {/* Rs */}
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <>
              <div className="flex items-center space-x-4">
                <DropdownMenuDemo />
              </div>
            </>
          ) : (
            <>
              <Button
                variant="default"
                size="sm"
                className="bg-[#D6FF00] text-black hover:bg-[#c2eb00] cursor-pointer"
              >
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
