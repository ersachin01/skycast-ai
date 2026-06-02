import { getHourLabel } from "../utils/formatDate";

const ICONS = {
  "01d":"☀️","01n":"🌙","02d":"⛅","02n":"🌥️","03d":"☁️","03n":"☁️",
  "04d":"☁️","04n":"☁️","09d":"🌧️","09n":"🌧️","10d":"🌦️","10n":"🌧️",
  "11d":"⛈️","11n":"⛈️","13d":"❄️","13n":"❄️","50d":"🌫️","50n":"🌫️",
};

export default function HourlyForecast({ forecast }) {
  const hourly = forecast.list.slice(0, 9);
  const temps  = hourly.map(h => h.main.temp);
  const minT   = Math.min(...temps);
  const maxT   = Math.max(...temps);
  const range  = maxT - minT || 1;

  // Build SVG path for temperature curve
  const W = 600, H = 48, pad = 32;
  const pts = hourly.map((h, i) => ({
    x: pad + (i / (hourly.length - 1)) * (W - pad * 2),
    y: H - 8 - ((h.main.temp - minT) / range) * (H - 20),
  }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const mx = (pts[i-1].x + pts[i].x) / 2;
    d += ` C ${mx} ${pts[i-1].y}, ${mx} ${pts[i].y}, ${pts[i].x} ${pts[i].y}`;
  }
  const fillD = d + ` L ${pts[pts.length-1].x} ${H} L ${pts[0].x} ${H} Z`;

  return (
    <div className="glass rounded-3xl p-5">
      <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-5">
        Hourly Forecast
      </p>
      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          {/* Icons + labels row */}
          <div className="flex justify-between mb-2 px-1">
            {hourly.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1 w-[60px]">
                <p className={`text-[11px] font-medium ${i === 0 ? "text-blue-400" : "text-white/40"}`}>
                  {i === 0 ? "Now" : getHourLabel(h.dt)}
                </p>
                <span className="text-2xl">{ICONS[h.weather[0].icon] || "🌤️"}</span>
                <p className="text-sm font-semibold text-white">{Math.round(h.main.temp)}°</p>
              </div>
            ))}
          </div>

          {/* SVG temperature curve */}
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-12" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={fillD} fill="url(#hGrad)" />
            <path d={d} stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#3b82f6" stroke="#0d1117" strokeWidth="1.5" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
