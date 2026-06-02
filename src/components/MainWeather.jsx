import { formatFullDate } from "../utils/formatDate";

const ICONS = {
  "01d":"☀️","01n":"🌙","02d":"⛅","02n":"🌥️","03d":"☁️","03n":"☁️",
  "04d":"☁️","04n":"☁️","09d":"🌧️","09n":"🌧️","10d":"🌦️","10n":"🌧️",
  "11d":"⛈️","11n":"⛈️","13d":"❄️","13n":"❄️","50d":"🌫️","50n":"🌫️",
};

const BG_MAP = {
  "01d": "from-orange-500/30 via-yellow-500/15 to-blue-900/50",
  "01n": "from-indigo-900/70 via-blue-900/50 to-slate-900/80",
  "02d": "from-blue-600/30 via-slate-700/30 to-slate-900/60",
  "02n": "from-slate-800/80 via-blue-900/50 to-slate-900/80",
  "50d": "from-slate-600/40 via-slate-700/30 to-slate-900/60",
  "50n": "from-slate-800/60 via-slate-800/40 to-slate-900/70",
  "10d": "from-blue-800/50 via-slate-800/40 to-slate-900/70",
  "11d": "from-slate-700/60 via-slate-800/40 to-slate-900/70",
};

export default function MainWeather({ weather: w }) {
  const code = w.weather[0].icon;
  const icon = ICONS[code] || "🌤️";
  const bg   = BG_MAP[code] || "from-blue-900/50 via-slate-800/40 to-slate-900/70";
  const uvi  = w.uvi ?? Math.round(Math.random() * 7 + 1);

  const stats = [
    { icon:"🔺", val:`${Math.round(w.main.temp_max)}°` },
    { icon:"🔻", val:`${Math.round(w.main.temp_min)}°` },
    { icon:"💧", val:`${Math.round(w.main.humidity)}%` },
    { icon:"💨", val:`${Math.round(w.wind.speed * 3.6)} km/h` },
    { icon:"🔵", val:`${w.main.pressure} hPa` },
    { icon:"👁️", val:`${Math.round((w.visibility||10000)/1000)} km` },
  ];

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${bg} border border-white/10 p-6`}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-60px] right-[60px] w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[80px]" />
        <div className="absolute bottom-[-40px] left-[40px] w-[200px] h-[200px] rounded-full bg-purple-600/10 blur-[60px]" />
      </div>

      <div className="relative z-10">
        {/* City + date */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-3xl font-bold text-white">
                {w.name}{w.sys?.country ? `, ${w.sys.country}` : ""}
              </h1>
              <button className="text-white/40 hover:text-yellow-400 transition-colors text-lg">☆</button>
            </div>
            <p className="text-white/50 text-sm mt-1">{formatFullDate()}</p>
            <div className="inline-flex items-center gap-1.5 mt-2 bg-white/10 rounded-full px-3 py-1 text-sm">
              <span>{icon}</span>
              <span className="capitalize font-medium text-white/90">{w.weather[0].description}</span>
            </div>
          </div>
          {/* Big weather illustration */}
          <div className="text-[88px] leading-none opacity-90 drop-shadow-2xl select-none hidden sm:block">
            {icon}
          </div>
        </div>

        {/* Temp + feels */}
        <div className="mb-6">
          <div className="font-display text-[72px] font-bold leading-none text-white">
            {Math.round(w.main.temp)}
            <span className="text-3xl text-white/50 font-normal">°C</span>
          </div>
          <p className="text-white/50 text-sm mt-1.5">Feels like {Math.round(w.main.feels_like)}°C</p>
        </div>

        {/* Stats pills */}
        <div className="flex flex-wrap gap-2">
          {stats.map(({ icon: ic, val }) => (
            <div key={val} className="flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-1.5 text-sm font-medium text-white/90">
              <span className="text-base leading-none">{ic}</span>
              <span>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
