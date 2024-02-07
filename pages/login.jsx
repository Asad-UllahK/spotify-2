import React from "react";
import { signIn } from "next-auth/react";

export default function login() {
  return (
    <div className="flex items-center justify-center">
      <button onClick={() => signIn("spotify", { callbackUrl: "/" })}>
        Login
      </button>
    </div>
  );
}
