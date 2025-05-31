"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Icons } from "./ui/icons";
import { Button } from "./ui/button";
import { login } from "../lib/actions/auth";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function handleClick({
    provider,
    event,
  }: {
    provider: string;
    event: React.SyntheticEvent;
  }) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await login({ provider });
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className={cn("grid gap-4 sm:gap-6", className)} {...props}>
      {/*continue with */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-950 px-3 text-gray-400">Continue with</span>
        </div>
      </div>

      {/* google signin */}
      <Button
        className="w-full h-11 sm:h-12 border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 hover:border-[#D6FF00] transition-all duration-200 text-sm sm:text-base"
        variant="ghost"
        type="button"
        disabled={isLoading}
        onClick={(event) => handleClick({ provider: "google", event })}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Sign in with Google
      </Button>

      {/* github signin */}
      <Button
        className="w-full h-11 sm:h-12 border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 hover:border-[#D6FF00] transition-all duration-200 text-sm sm:text-base"
        variant="ghost"
        type="button"
        disabled={isLoading}
        onClick={(event) => handleClick({ provider: "github", event })}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}
        Sign in with GitHub
      </Button>
    </div>
  );
}
