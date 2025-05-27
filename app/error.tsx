"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import FlamLogo from "@/components/FlamLogo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">
          Something went wrong!
        </h1>

        <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-orange-500 mx-auto my-6 rounded-full"></div>

        <p className="text-gray-400 mb-8">
          We apologize for the inconvenience. Please try again or return to the
          home page.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-md border border-zinc-700 hover:border-[#D6FF00] transition-all duration-200 cursor-pointer"
          >
            <span>Try Again</span>
          </button>
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

      <p className="text-gray-500 mt-8 text-sm">
        &copy; {new Date().getFullYear()} Flamapp.ai. All rights reserved.
      </p>
    </div>
  );
}
