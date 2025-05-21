"use server";
import Link from "next/link";
import auth from "./auth";
import { Button } from "./components/ui/button";

export default async function Home() {
  const session = await auth();
  console.log("session: ", session);

  if (session?.user) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center ">
        <h1>Welcome, {session.user.name}!</h1>
        <div className="mt-4">
          <Link
            href="/user-info"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            View User Info
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center ">
      <h1 className="text-2xl mb-4">Please Sign In</h1>
      <p className="mb-4">You need to be signed in to access this page.</p>
    </div>
  );
}
