import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "../../components/user-auth-form";
import FlamLogo from "@/components/FlamLogo";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In Page.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="min-h-screen flex">
        {/* LS - mobile update remaining */}
        <div className="relative hidden lg:flex lg:w-1/2 h-screen flex-col bg-black p-10 text-white items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />

          <div className="relative z-20 flex items-center text-4xl font-medium">
            {/* logo*/}
            <FlamLogo
              className="mr-4 h-12 w-12 text-[#D6FF00]"
              alt="Flamapp Logo"
              width={48}
              height={48}
            />
            Flam
          </div>

          <div className="relative z-20 mt-8 text-center">
            <h2 className="text-xl text-gray-300">
              Welcome to the HR Dashboard
            </h2>
            <p className="text-gray-400 mt-2">
              Manage your workforce efficiently
            </p>
          </div>
        </div>

        {/* RS signin - full width on mobile, half width on lg+ donee */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-zinc-950">
          <div className="w-full max-w-sm space-y-6">
            {/* mobile logo - only shown on less than lg screenssize */}
            <div className="flex lg:hidden items-center justify-center mb-8">
              <FlamLogo
                className="mr-3 h-10 w-10 text-[#D6FF00]"
                alt="Flamapp Logo"
                width={40}
                height={40}
              />
              <span className="text-3xl font-medium text-white">Flam</span>
            </div>

            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            {/* signin links */}
            <UserAuthForm />

            <p className="px-2 sm:px-4 text-center text-xs sm:text-sm text-gray-400 leading-relaxed">
              By clicking continue, you agree to our{" "}
              <Link
                href="https://www.flamapp.ai/terms"
                className="underline underline-offset-4 text-gray-300 hover:text-[#D6FF00] transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="https://www.flamapp.ai/privacy"
                className="underline underline-offset-4 text-gray-300 hover:text-[#D6FF00] transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
