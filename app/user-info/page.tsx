import { Metadata } from "next";
import React from "react";
import { auth } from "@/app/auth";
import Image from "next/image";
import SignOutButton from "../../components/sign-out-button";

export const metadata: Metadata = {
  title: "User Profile",
  description: "User Profile Page - View your complete profile information.",
};

export default async function UserInfo() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            User Profile
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Picture Section */}
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="relative">
                {session.user.image ? (
                  <Image
                    className="rounded-full border-4 border-blue-100 shadow-lg"
                    src={session.user.image}
                    alt="Profile Picture"
                    width={150}
                    height={150}
                  />
                ) : (
                  <div className="w-36 h-36 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-4xl font-bold">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800 text-center">
                {session.user.name}
              </h2>
              <p className="text-gray-600 text-center mt-1">
                Authenticated User
              </p>
            </div>

            {/* Profile Details Section */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Account Information
              </h3>
              <div className="space-y-4">
                {/* Name */}
                <div className="border-b border-gray-100 pb-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Full Name
                  </label>
                  <p className="text-gray-800 text-lg">
                    {session.user.name || "Not provided"}
                  </p>
                </div>

                {/* Email */}
                <div className="border-b border-gray-100 pb-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email Address
                  </label>
                  <p className="text-gray-800 text-lg">
                    {session.user.email || "Not provided"}
                  </p>
                </div>

                {/* User ID */}
                <div className="border-b border-gray-100 pb-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    User ID
                  </label>
                  <p className="text-gray-800 font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                    {session.user.id || "Not available"}
                  </p>
                </div>

                {/* Account Status */}
                <div className="border-b border-gray-100 pb-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Account Status
                  </label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Active
                  </span>
                </div>

                {/* Last Sign In */}
                <div className="border-b border-gray-100 pb-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Last Sign In
                  </label>
                  <p className="text-gray-800">
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
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Account Actions
                </h3>
                <p className="text-gray-600 text-sm">
                  Manage your account settings and preferences
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Profile
                </button>
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
