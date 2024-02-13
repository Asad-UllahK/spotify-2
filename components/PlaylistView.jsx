import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from "react";
import { set, shuffle } from "lodash";
import Song from "./Song";

export default function PlaylistView({
  globalPlaylistId,
  setGlobalCurrentSongId,
  setGlobalIsTrackPlaying
}) {
  const { data: session } = useSession();
  const [playlistData, setPlaylistData] = useState(null);
  const [color, setColor] = useState([0]);
  const [opacity, setOpacity] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);

  const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
  ];

  function changeOpacity(scrollPos) {
    // scrollPos = 0  -> opacity =0
    // scrollPos =300 -> opacity =1, textopacity =0
    // scrollPos =310 -> opacity =1 textOpacity =1
    const offset = 300;
    const textOffset = 10;
    if (scrollPos < offset) {
      const newOpacity = 1 - (offset - scrollPos) / offset;
      setOpacity(newOpacity);
      setTextOpacity(0);
    } else {
      setOpacity(1);
      const delta = scrollPos - offset;
      const newTextOpacity = 1 - (textOffset - delta) / textOffset;
      setTextOpacity(newTextOpacity);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (session && session.accessToken) {
        console.log(session);
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${globalPlaylistId}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await response.json();
        setPlaylistData(data);
      }
    }
    fetchData();
  }, [session, globalPlaylistId]);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [globalPlaylistId]);

  return (
    <div className="flex-grow h-screen">
      <header
        style={{ opacity: opacity }}
        className="text-white sticky top-0 h-20 z-10 text-2xl bg-neutral-800 p-8 flex items-center font-bold"
      >
        <div style={{ opacity: textOpacity }} className="flex items-center">
          {playlistData && (
            <img
              src={playlistData.images[0].url}
              alt="Playlist Pic"
              className="h-8 w-8 mr-6 rounded"
            />
          )}
          <p> {playlistData?.name}</p>
        </div>
      </header>
      <div className="absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 ">
        <img
          className="rounded-full w-7 h-7"
          src={session?.user.image}
          alt="profile pic"
        />
        <p className="text-sm">Logout</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <div
        onScroll={(e) => changeOpacity(e.target.scrollTop)}
        className="relative -top-20 h-screen overflow-y-scroll bg-neutral-900"
      >
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white p-8`}
        >
          {playlistData && (
            <img
              src={playlistData.images[0].url}
              alt="Playlist Pic"
              className="h-44 w-44 rounded"
            />
          )}
          <div>
            <p className="text-sm font-bold">Playlist</p>
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrbold ">
              {playlistData?.name}
            </h1>
          </div>
        </section>
        <div className="text-white px-8 flex flex-col space-y-1 pb-28 ">
          {playlistData?.tracks.items.map((track, i) => {
            // put songs component over here
            return (
              <Song
                setGlobalIsTrackPlaying={setGlobalIsTrackPlaying}
                setGlobalCurrentSongId={setGlobalCurrentSongId}
                key={track.track.id}
                sno={i}
                track={track.track}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
