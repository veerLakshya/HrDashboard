import Link from "next/link";
import { auth } from "@/app/auth";
import SignInButton from "./sign-in-button";
import SignOutButton from "./sign-out-button";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </Link>
);

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
              HR Portal
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {session?.user ? (
              <>
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/user-info">User Info</NavLink>
                <NavLink href="/bookmarks">Bookmarks</NavLink>
                <SignOutButton />
              </>
            ) : (
              <SignInButton />
            )}
          </div>
          <div className="md:hidden flex items-center">
            {session?.user ? <SignOutButton /> : <SignInButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
