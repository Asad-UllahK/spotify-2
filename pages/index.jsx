import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const { data: session } = useSession();
  const [x, setX] = useState("");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (session && session.accessToken) {
        setX(session.accessToken);
        const response = await fetch(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`, // Use backticks for string interpolation
            },
          }
        );
        const data = await response.json();
        setPlaylists(data.items);
      }
    }
    fetchData();
  }, [session]);

  return (
    <>
      <main className="flex w-full h-screen overflow-hidden bg-black">
        <Sidebar />
        <div>Main</div>
      </main>
      <div className="sticky bottom-0 z-20 h-24 w-full bg-red-200">player</div>
    </>
  );
}
