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
      <div className="container relative h-[40rem] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left side flam */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex items-center justify-center">
          {/* Overlay background for left side */}
          <div className="absolute inset-0 bg-black border-white border-1" />

          <div className="relative z-20 flex items-center text-4xl font-medium">
            {/* Flam logo SVG */}
            <FlamLogo
              className="mr-2 h-12 w-12"
              alt="Flamapp Logo"
              width={48}
              height={48}
            />
            Flam
          </div>
        </div>
        {/* Right side sign-in*/}
        <div className="lg:p-8">
          <div className="mx-auto flex my-auto flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Create an account or Sign In
              </h1>
            </div>
            {/* User authentication form */}
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-gray-300">
              By clicking continue, you agree to our{" "}
              <Link
                href="/"
                className="underline underline-offset-4 text-gray-300 hover:text-white"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="underline underline-offset-4 text-gray-300 hover:text-white"
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
