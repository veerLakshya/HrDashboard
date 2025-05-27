import { Metadata } from "next";
import React from "react";
import { auth } from "@/app/auth";
import Image from "next/image";
import SignOutButton from "../../components/sign-out-button";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "User Profile",
  description: "User Profile Page - View your complete profile information.",
};

export default async function UserInfo() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-black p-8 rounded-lg shadow-md border border-zinc-800">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      {/* Header */}{" "}
      <div className="flex items-center gap-3 mb-8">
        <User className="w-8 h-8 text-[#D6FF00]" />
        <div>
          <h1 className="text-3xl font-bold text-white">Your Profile</h1>
          <p className="text-gray-300 mt-1">
            Manage your account information and preferences
          </p>
        </div>
      </div>
      {/* Profile info*/}
      <div className="bg-black border border-zinc-800 rounded-lg shadow-md p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* photo*/}
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="relative">
              {session.user.image ? (
                <Image
                  className="rounded-full border-4 border-zinc-800 shadow-lg"
                  src={session.user.image}
                  alt="Profile Picture"
                  width={150}
                  height={150}
                />
              ) : (
                <div className="w-36 h-36 bg-gradient-to-br from-[#D6FF00] to-[#a3c500] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-black text-4xl font-bold">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white text-center">
              {session.user.name}
            </h2>
            <p className="text-gray-300 text-center mt-1">Authenticated User</p>
          </div>

          {/* details */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">
              Account Information
            </h3>
            <div className="space-y-4">
              <div className="border-b border-zinc-800 pb-3">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <p className="text-white text-lg">
                  {session.user.name || "Not provided"}
                </p>
              </div>
              <div className="border-b border-zinc-800 pb-3">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <p className="text-white text-lg">
                  {session.user.email || "Not provided"}
                </p>
              </div>
              <div className="border-b border-zinc-800 pb-3">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Role
                </label>
                <p className="text-white font-mono text-sm bg-zinc-900 px-2 py-1 rounded">
                  {session.user.id || "Head of HR"}
                </p>
              </div>
              <div className="border-b border-zinc-800 pb-3">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Account Status
                </label>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-200">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Active
                </span>
              </div>

              {/* dummy last sign in of user*/}
              <div className="border-b border-zinc-800 pb-3">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Last Sign In
                </label>
                <p className="text-white">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Account Actions
              </h3>
              <p className="text-gray-300 text-sm">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700">
                Edit Profile(dummy)
              </button>
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
