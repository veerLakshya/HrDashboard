"use server";
import Image from "next/image";
import SignInButton from "@/app/components/sign-in-button";
import auth from "./auth";

export default async function Home() {
  const session = await auth();
  console.log("session: ", session);

  if (session?.user) {
    return (
      <>
        <div className="container">
          <p>Welcome {session.user?.name}</p>
          {session.user.image && (
            <Image
              className="rounded-full"
              src={session.user.image || ""}
              alt="profile"
              width={100}
              height={100}
            />
          )}
          <SignInButton />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container">
        <p>You are not signed in</p>
        <SignInButton />
      </div>
    </>
  );
}
