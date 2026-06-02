import { useState } from "react";

const NAV = [
  { id: "dashboard", icon: "▦", label: "Dashboard" },
  { id: "forecast",  icon: "📅", label: "Forecast" },
  { id: "airquality",icon: "🌿", label: "Air Quality" },
  { id: "maps",      icon: "🗺️", label: "Maps" },
  { id: "alerts",    icon: "🔔", label: "Alerts" },
  { id: "favorites", icon: "♡", label: "Favorites" },
];

export default function Sidebar({ activePage, onNavigate }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <aside className="w-[240px] flex-shrink-0 flex flex-col h-screen border-r border-white/[0.07] bg-[#0d1117] px-3 py-5">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-lg shadow-lg">
          🌤️
        </div>
        <div>
          <div className="font-display font-bold text-[15px] text-white leading-none">SkyCast AI</div>
          <div className="text-[10px] text-white/40 mt-0.5 leading-none">AI-Powered Weather</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`sidebar-item text-left ${activePage === id ? "active" : ""}`}
          >
            <span className="w-5 text-center text-base leading-none">{icon}</span>
            <span>{label}</span>
          </button>
        ))}

        <div className="mt-auto pt-4">
          <button className="sidebar-item w-full text-left">
            <span className="w-5 text-center text-base">⚙️</span>
            <span>Settings</span>
          </button>
        </div>
      </nav>

      {/* Upgrade card */}
      <div className="mt-4 mx-1 rounded-2xl bg-gradient-to-br from-yellow-500/15 to-orange-500/10 border border-yellow-500/20 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400">⚡</span>
          <span className="font-semibold text-sm text-white">Upgrade to Pro</span>
        </div>
        <p className="text-xs text-white/40 mb-3 leading-relaxed">Unlock advanced features and weather insights</p>
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white text-xs font-semibold py-2 rounded-xl transition-all">
          Upgrade Now
        </button>
      </div>

      {/* Dark mode toggle */}
      <div className="flex items-center justify-between px-3 pt-4 pb-1">
        <span className="text-xs text-white/40 flex items-center gap-1.5">🌙 Dark Mode</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-10 h-5 rounded-full transition-colors ${darkMode ? "bg-blue-500" : "bg-white/20"}`}
        >
          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${darkMode ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      </div>
      <p className="text-center text-[10px] text-white/20 pt-3">© 2026 SkyCast AI</p>
    </aside>
  );
}
