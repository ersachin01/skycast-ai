import { getDayLabel, getDateLabel } from "../utils/formatDate";

const ICONS = {
  "01d":"☀️","01n":"🌙","02d":"⛅","02n":"🌥️","03d":"☁️","03n":"☁️",
  "04d":"☁️","04n":"☁️","09d":"🌧️","09n":"🌧️","10d":"🌦️","10n":"🌧️",
  "11d":"⛈️","11n":"⛈️","13d":"❄️","13n":"❄️","50d":"🌫️","50n":"🌫️",
};
const WEATHER_LABEL = {
  "01d":"Sunny","01n":"Clear","02d":"Partly Cloudy","02n":"Partly Cloudy",
  "03d":"Cloudy","03n":"Cloudy","04d":"Overcast","04n":"Overcast",
  "09d":"Shower","09n":"Shower","10d":"Rain","10n":"Rain",
  "11d":"Thunderstorm","11n":"Thunderstorm","13d":"Snow","13n":"Snow",
  "50d":"Haze","50n":"Fog",
};

function groupForecast(list) {
  const days = {};
  list.forEach((item) => {
    const key = new Date(item.dt * 1000).toDateString();
    if (!days[key]) days[key] = { temps:[], icons:[], dt: item.dt };
    days[key].temps.push(item.main.temp);
    days[key].icons.push(item.weather[0].icon);
  });
  return Object.values(days).slice(0, 7);
}

export default function WeekForecast({ forecast }) {
  const days = groupForecast(forecast.list);

  return (
    <div className="glass rounded-3xl p-5">
      <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-4">
        7-Day Forecast
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => {
          const high = Math.round(Math.max(...d.temps));
          const low  = Math.round(Math.min(...d.temps));
          const icon = ICONS[d.icons[Math.floor(d.icons.length/2)]] || "🌤️";
          const code = d.icons[Math.floor(d.icons.length/2)];
          const label = WEATHER_LABEL[code] || "Clear";
          const isToday = i === 0;

          return (
            <div
              key={i}
              className={`flex-none w-[104px] flex flex-col items-center rounded-2xl px-3 py-4 text-xs transition-all cursor-pointer
                ${isToday
                  ? "bg-blue-500/20 border border-blue-500/30"
                  : "bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08]"
                }`}
            >
              <p className={`font-semibold mb-0.5 text-[11px] ${isToday ? "text-blue-400" : "text-white/50"}`}>
                {isToday ? "Today" : getDayLabel(d.dt)}
              </p>
              <p className="text-white/25 text-[10px] mb-3">{getDateLabel(d.dt)}</p>
              <span className="text-3xl mb-3">{icon}</span>
              <p className="font-bold text-sm text-white">{high}°</p>
              <p className="text-white/40 text-[11px] mb-1">{low}°</p>
              <p className={`text-[10px] font-medium ${isToday ? "text-blue-300/70" : "text-white/30"}`}>{label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
