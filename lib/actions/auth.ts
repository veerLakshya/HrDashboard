"use server";
import { signIn, signOut } from "../../app/auth";

export const login = async ({ provider }: { provider: string }) => {
  await signIn(provider, { redirectTo: "/" });
};
export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
