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
  const [globalArtistId, setGlobalArtistId] = useState(null); //will be used in the artist.jsx page
  const [globalCurrentSongId, setGlobalCurrentSongId] = useState(null);
  const [globalIsTrackPlaying, setGlobalIsTrackPlaying] = useState(false);
  return (
    <>
      <main className="h-screen overflow-hidden bg-black">
        <div className="flex w-full">
          <Sidebar
            setView={setView}
            view={view}
            setGlobalPlaylistId={setGlobalPlaylistId}
          />
          {view === "playlist" && (
            <PlaylistView
              setView={setView}
              setGlobalArtistId={setGlobalArtistId}
              globalPlaylistId={globalPlaylistId}
              setGlobalCurrentSongId={setGlobalCurrentSongId}
              setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
            />
          )}
          {view === "search" && (
            <Search
              setView={setView}
              setGlobalPlaylistId={setGlobalPlaylistId}
              setGlobalCurrentSongId={setGlobalCurrentSongId}
              setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
              setGlobalArtistId={setGlobalArtistId}
            />
          )}
          {view === "artist" && <Artist />}
          {view === "library" && (
            <Library
              setView={setView}
              setGlobalPlaylistId={setGlobalPlaylistId}
            />
          )}
        </div>
        <div className="sticky bottom-0 z-20 w-full">
          <Player
            globalCurrentSongId={globalCurrentSongId}
            setGlobalCurrentSongId={setGlobalCurrentSongId}
            globalIsTrackPlaying={globalIsTrackPlaying}
            setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
          />
        </div>
      </main>
    </>
  );
}
