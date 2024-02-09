import React, { useEffect, useState } from "react";
import {
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

export default function Sidebar({ view, setView, setGlobalPlaylistId }) {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (session && session.accessToken) {
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
    <div className="w-64 text-neutral-300 grow-0 shrink-0 h-screen overflow-y-scroll no-scrollbar verflow: -webkit-scrollbar:none border-r border-neutral-800 flex flex-col px-4 space-y-4 text-sm">
      <div className="flex mb-4 mt-4 text-xl p-2">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 2048 512"
        >
          <path
            fill="#fff"
            fill-rule="nonzero"
            d="M255.998.003C114.616.003 0 114.616 0 255.997c0 141.385 114.616 255.994 255.998 255.994C397.395 511.991 512 397.386 512 255.997 512 114.624 397.395.015 255.994.015l.004-.015v.003zm117.4 369.22c-4.585 7.519-14.427 9.908-21.949 5.288-60.104-36.714-135.771-45.027-224.882-24.668-8.587 1.954-17.146-3.425-19.104-12.015-1.967-8.591 3.394-17.15 12.003-19.104 97.518-22.28 181.164-12.688 248.645 28.55 7.522 4.616 9.907 14.427 5.288 21.95l-.001-.001zm31.335-69.703c-5.779 9.389-18.067 12.353-27.452 6.578-68.813-42.298-173.703-54.548-255.096-29.837-10.556 3.187-21.704-2.761-24.906-13.298-3.18-10.556 2.772-21.68 13.309-24.891 92.971-28.208 208.551-14.546 287.574 34.015 9.385 5.779 12.35 18.067 6.575 27.441v-.004l-.004-.004zm2.692-72.584c-82.511-49.006-218.635-53.51-297.409-29.603-12.649 3.837-26.027-3.302-29.86-15.955-3.832-12.656 3.303-26.023 15.96-29.867 90.428-27.452 240.753-22.149 335.747 34.245 11.401 6.754 15.133 21.446 8.375 32.809-6.728 11.378-21.462 15.13-32.802 8.371h-.011z"
          />
        </svg> */}
        Spotify
      </div>
      <button className="flex items-center space-x-2 hover:text-white">
        <HomeIcon className=" w-5 h-5" />
        <p>Home</p>
      </button>
      <button
        onClick={() => setView("search")}
        className={`flex items-center space-x-2 hover:text-white ${
          view == "search" ? "text-white" : null
        }`}
      >
        <MagnifyingGlassIcon className=" w-5 h-5" />
        <p>Search</p>
      </button>
      <button
        onClick={() => setView("library")}
        className={`flex items-center space-x-2 hover:text-white ${
          view == "library" ? "text-white" : null
        }`}
      >
        <BuildingLibraryIcon className=" w-5 h-5" />
        <p>Your Library</p>
      </button>
      <hr className="border-black" />
      <button className="flex items-center space-x-2 hover:text-white">
        <PlusIcon className=" w-5 h-5" />
        <p>Create Playlist</p>
      </button>
      <button className="flex items-center space-x-2 hover:text-white">
        <HeartIcon className=" w-5 h-5" />
        <p>Liked Songs</p>
      </button>
      <hr className="border-neutral-800" />
      {playlists.map((playlist) => {
        return (
          <p
            onClick={() => {
              setView("playlist");
              setGlobalPlaylistId(playlist.id);
            }}
            key={playlist.id}
            className="cursor-default hover:text-white"
          >
            {playlist.name}
          </p>
        );
      })}
    </div>
  );
}
