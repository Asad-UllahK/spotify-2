import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PlaylistView from "@/components/PlaylistView";
import Search from "@/components/Search";
import Artist from "@/components/Artist";
import Library from "@/components/Library";
import Player from "@/components/Player";

export default function Home() {
  const [view, setView] = useState("search"); //["search", "library", "playlist", "artist"]
  const [globalPlaylistId, setGlobalPlaylistId] = useState(null);
  const [globalArtistId, setGlobalArtistId] = useState(null);
  const [globalCurrentSongId, setGlobalCurrentSongId] = useState(null);
  const [globalIsTrackPlaying, setGlobalIsTrackPlaying] = useState(false);
  return (
    <>
      <main className="flex w-full h-screen overflow-hidden bg-black">
        <Sidebar
          setView={setView}
          view={view}
          setGlobalPlaylistId={setGlobalPlaylistId}
        />
        {view === "playlist" && (
          <PlaylistView
            globalPlaylistId={globalPlaylistId}
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
          />
        )}
        {view === "search" && <Search />}
        {view === "artist" && <Artist />}
        {view === "library" && <Library />}
      </main>
      <div className="sticky bottom-0 z-20 w-full">
        <Player
          globalCurrentSongId={globalCurrentSongId}
          setGlobalCurrentSongId={setGlobalCurrentSongId}
          globalIsTrackPlaying={globalIsTrackPlaying}
          setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
        />
      </div>
    </>
  );
}
