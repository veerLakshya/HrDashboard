import Link from "next/link";
import { auth } from "@/app/auth";
import Image from "next/image";
import SignOutButton from "./sign-out-button";
import { Button } from "@/app/components/ui/button";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 text-xl font-semibold text-gray-900"
            >
              Hr Portal
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <>
                <span>{"Hello, " + session.user.name + "!"}</span>
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt="User Image"
                    width={40}
                    height={40}
                    className="rounded-full ml-2"
                  />
                )}
                <SignOutButton />
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
      </div>
    </nav>
  );
};

export default Navbar;
