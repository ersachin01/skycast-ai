import { useState } from "react";

export default function TopBar({ onSearch, onLocate }) {
  const [city, setCity] = useState("");

  function handleSearch() { if (city.trim()) onSearch(city.trim()); }
  function handleKey(e)   { if (e.key === "Enter") handleSearch(); }

  return (
    <header className="flex items-center gap-4 px-5 py-4 border-b border-white/[0.07]">
      {/* Search */}
      <div className="relative flex-1 max-w-lg">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">🔍</span>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Search for city..."
          className="w-full bg-white/[0.07] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-blue-500/60 focus:bg-white/10 transition-all"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-400 w-7 h-7 rounded-xl flex items-center justify-center transition-colors"
        >
          <span className="text-white text-xs font-bold">→</span>
        </button>
      </div>

      {/* My Location */}
      <button
        onClick={onLocate}
        className="flex items-center gap-2 glass rounded-2xl px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
      >
        📍 <span className="hidden sm:inline">My Location</span>
      </button>

      {/* °C toggle */}
      <button className="glass rounded-2xl px-4 py-2.5 text-sm text-white/70 font-medium">
        °C
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold flex-shrink-0 cursor-pointer">
        👤
      </div>
    </header>
  );
}
