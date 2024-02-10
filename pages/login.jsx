import React from "react";
import { signIn } from "next-auth/react";

export default function login() {
  return (
    <div className="flex item-center justify-center h-screen text-4xl">
      <button onClick={() => signIn("spotify", { callbackUrl: "/" }) }>
        Login
      </button>
    </div>
  );
}
