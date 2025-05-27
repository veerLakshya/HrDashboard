"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FlamLogo from "@/components/FlamLogo";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-4">
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <FlamLogo
            className="w-12 h-12 text-[#D6FF00]"
            alt="Flamapp.ai Logo"
          />
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <h2 className="text-xl font-semibold text-white mb-4">
          Page not found
        </h2>

        <div className="h-1 w-16 bg-gradient-to-r from-[#D6FF00] to-[#a3c500] mx-auto my-6 rounded-full"></div>

        <p className="text-gray-400 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-md border border-zinc-700 hover:border-[#D6FF00] transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>{" "}
          <Link
            href="/"
            className="w-full inline-block bg-[#D6FF00] hover:bg-[#c2eb00] text-black px-4 py-3 rounded-md transition-colors duration-200 font-medium text-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
