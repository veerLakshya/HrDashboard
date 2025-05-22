"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Icons } from "./ui/icons";
import { Button } from "./ui/button";
import { login } from "../lib/actions/auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

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
    <div className={cn("grid gap-6", className)} {...props}>
      {/*continue with */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Continue with
          </span>
        </div>
      </div>
      {/* Google sign-in */}
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={(event) => handleClick({ provider: "google", event })}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      {/* github sign-in */}
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={(event) => handleClick({ provider: "github", event })}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
