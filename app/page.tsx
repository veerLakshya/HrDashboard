"use server";
import Image from "next/image";
import Link from "next/link";
import SignInButton from "@/app/components/sign-in-button";
import auth from "./auth";

export default async function Home() {
  const session = await auth();
  console.log("session: ", session);

  if (session?.user) {
    return (
      <div className="container">
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
    <div className="container">
      <h1 className="text-2xl mb-4">Please Sign In</h1>
      <p className="mb-4">You need to be signed in to access this page.</p>
      <SignInButton />
    </div>
  );
}
