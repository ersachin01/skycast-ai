import { formatTime, getDayLength } from "../utils/formatDate";

export default function SunriseSunset({ weather: w }) {
  if (!w.sys) return null;

  const { sunrise, sunset } = w.sys;
  const now     = Math.floor(Date.now() / 1000);
  const totalDay = sunset - sunrise;
  const elapsed  = Math.max(0, Math.min(now - sunrise, totalDay));
  const pct      = elapsed / totalDay; // 0..1

  // SVG arc from left to right across the card
  const W = 260, H = 90;
  const arcR = 80;
  const cx = W / 2, cy = H + 10;

  // Points on semicircle
  const toAngle = (p) => Math.PI - p * Math.PI; // 0=left, π=right in standard
  const px = (p) => cx + arcR * Math.cos(Math.PI - p * Math.PI);
  const py = (p) => cy - arcR * Math.sin(p * Math.PI); // inverted y

  // Actually let's use a proper arc formula
  // sunrise at left (0), sunset at right (1), arc going UP
  const sunX = cx + arcR * Math.cos(Math.PI * (1 - pct)); // left to right
  const sunY = cy - arcR * Math.sin(Math.PI * (1 - pct));

  const arcLeft  = { x: cx - arcR, y: cy };
  const arcRight = { x: cx + arcR, y: cy };

  // Dashed arc path (full semicircle)
  const arcPath = `M ${arcLeft.x} ${arcLeft.y} A ${arcR} ${arcR} 0 0 1 ${arcRight.x} ${arcRight.y}`;

  return (
    <div className="glass rounded-3xl p-5">
      <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-4">
        Sunrise &amp; Sunset
      </p>

      {/* Arc */}
      <div className="flex justify-center mb-4">
        <svg viewBox={`${cx - arcR - 10} 0 ${arcR * 2 + 20} ${cy + 5}`} className="w-full max-w-[240px]">
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Track (dashed) */}
          <path d={arcPath} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* Sunrise dot */}
          <circle cx={arcLeft.x} cy={arcLeft.y} r="4" fill="#fb923c" />
          {/* Sunset dot */}
          <circle cx={arcRight.x} cy={arcRight.y} r="4" fill="#f59e0b" />
          {/* Horizon line */}
          <line x1={arcLeft.x - 6} y1={cy} x2={arcRight.x + 6} y2={cy} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          {/* Sun glow */}
          <circle cx={sunX} cy={sunY} r="14" fill="url(#sunGlow)" />
          {/* Sun */}
          <circle cx={sunX} cy={sunY} r="7" fill="#fbbf24" />
        </svg>
      </div>

      {/* Times */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div>
          <div className="text-base mb-1">🌅</div>
          <p className="text-white/80 font-semibold">{formatTime(sunrise, w.timezone)}</p>
          <p className="text-white/30 text-xs">Sunrise</p>
        </div>
        <div>
          <div className="text-base mb-1">⏱</div>
          <p className="text-white/80 font-semibold">{getDayLength(sunrise, sunset)}</p>
          <p className="text-white/30 text-xs">Daylight</p>
        </div>
        <div>
          <div className="text-base mb-1">🌇</div>
          <p className="text-white/80 font-semibold">{formatTime(sunset, w.timezone)}</p>
          <p className="text-white/30 text-xs">Sunset</p>
        </div>
      </div>
    </div>
  );
}
