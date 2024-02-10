import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PlaylistView from "@/components/PlaylistView";
import Search from "@/components/Search";
import Artist from "@/components/Artist";
import Library from "@/components/Library";

export default function Home() {
  const [view, setView] = useState("search"); //["search", "library", "playlist", "artist"]
  const [globalPlaylistId, setGlobalPlaylistId] = useState(null);
  const [globalArtistId, setGlobalArtistId] = useState(null);
  return (
    <>
      <main className="flex w-full h-screen overflow-hidden bg-black">
        <Sidebar
          setView={setView}
          view={view}
          setGlobalPlaylistId={setGlobalPlaylistId}
        />
        {view === "playlist" && (
          <PlaylistView globalPlaylistId={globalPlaylistId} />
        )}
        {view === "search" && <Search />}
        {view === "artist" && <Artist />}
        {view === "library" && <Library />}
      </main>
      <div className="sticky bottom-0 z-20 h-24 w-full bg-red-200">player</div>
    </>
  );
}
