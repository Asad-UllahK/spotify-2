import React from "react";

export default function Sidebar() {
  return (
    <div className="w-64 text-neutral-200 grow-0 shrink-0 h-screen overflow-y-scroll border-r border-neutral-800 flex flex-col px-4 space-y-4">
      <div>
        <button>
          <p>Home</p>
        </button>
        <button>
          <p>Search</p>
        </button>
      </div>
      <div>playlists</div>
    </div>
  );
}
