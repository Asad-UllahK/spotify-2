import { signIn } from "next-auth/react";

export default function login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mt-[-100px]">
        <img
          className="w-52 mb-5"
          src="https://links.papareact.com/9xl"
          alt="spotify-logo"
        />
        <button
          className="text-white px-8 py-2 rounded-full bg-green-500 font-bold text-lg"
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
        >
          Login with spotify
        </button>
      </div>
    </div>
  );
}
