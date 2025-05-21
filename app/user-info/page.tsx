"use server";
import React from "react";
import { auth } from "@/app/auth";
import Image from "next/image";
import SignOutButton from "../components/sign-out-button";

export default async function UserInfo() {
  const session = await auth();
  return (
    <>
      <div className="">
        <h1>User Info Page (Protected)</h1>
        {session?.user && (
          <div className="">
            {" "}
            <p>Welcome {session?.user?.name}</p>
            <div className="">
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
              <SignOutButton />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
