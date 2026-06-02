function getMockAqi() {
  const aqi = Math.floor(Math.random() * 3) + 1;
  return {
    aqi,
    score: [0, 82, 62, 45, 25, 10][aqi],
    pm25: (Math.random() * 45 + 5).toFixed(1),
    label: ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"][aqi],
    color: ["", "#34d399", "#86efac", "#fbbf24", "#f87171", "#dc2626"][aqi],
    arcColor: ["", "#22c55e", "#86efac", "#f59e0b", "#ef4444", "#b91c1c"][aqi],
  };
}

export default function AirQualityCard() {
  const data = getMockAqi();
  // Arc: semicircle gauge
  // SVG arc from -180 to 0 (left to right), needle at data.score%
  const pct    = data.score / 100;
  const radius = 60;
  const cx     = 90, cy = 80;
  const startAngle = Math.PI;
  const endAngle   = 0;
  const angle  = startAngle + pct * Math.PI;
  const arcX = (a) => cx + radius * Math.cos(a);
  const arcY = (a) => cy + radius * Math.sin(a);

  const trackD = `M ${arcX(startAngle)} ${arcY(startAngle)} A ${radius} ${radius} 0 0 1 ${arcX(endAngle)} ${arcY(endAngle)}`;
  const fillArc = `M ${arcX(startAngle)} ${arcY(startAngle)} A ${radius} ${radius} 0 0 1 ${arcX(angle)} ${arcY(angle)}`;

  // Gradient stops for arc: green → yellow → red
  const needleX = arcX(angle);
  const needleY = arcY(angle);

  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-400">🌿</span>
        <p className="text-white/70 text-sm font-medium">Air Quality Index</p>
        <span className="ml-auto text-white/30 text-xs cursor-pointer">ⓘ</span>
      </div>

      <div className="flex items-end gap-3 mb-2">
        <span className="font-display text-5xl font-bold" style={{ color: data.color }}>{data.score}</span>
        <div className="mb-1.5">
          <span className="font-semibold text-sm" style={{ color: data.color }}>{data.label}</span>
        </div>
      </div>

      {/* Semicircle gauge */}
      <div className="flex justify-center my-2">
        <svg viewBox="30 20 120 65" className="w-[180px] h-[65px]">
          <defs>
            <linearGradient id="aqiGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          {/* Track */}
          <path d={trackD} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />
          {/* Colored arc */}
          <path d={trackD} fill="none" stroke="url(#aqiGrad)" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
          {/* Needle indicator */}
          <circle cx={needleX} cy={needleY} r="5" fill="white" stroke="#0d1117" strokeWidth="2" />
        </svg>
      </div>

      <p className="text-white/30 text-xs text-center mb-3">PM2.5 {data.pm25} µg/m³</p>
    </div>
  );
}
