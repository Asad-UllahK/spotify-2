import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [x, setX] = useState("");

  useEffect(() => {
    if (session && session.accessToken) {
      setX(accessToken);
    }
  },[session]);
  return <main className="">
    access_token: {x}
  </main>;
}
