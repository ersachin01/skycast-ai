function getInsight(w) {
  const temp = w.main.temp;
  const hum  = w.main.humidity;
  const desc = w.weather[0].description.toLowerCase();
  const wind = w.wind.speed * 3.6;

  if (desc.includes("thunder") || desc.includes("storm"))
    return "Thunderstorm conditions. Stay indoors and avoid open areas.";
  if (desc.includes("rain") || desc.includes("drizzle"))
    return "Rain expected today. Don't forget your umbrella!";
  if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze"))
    return `${desc.charAt(0).toUpperCase() + desc.slice(1)} conditions may reduce visibility. It's a good day for indoor activities. Stay hydrated!`;
  if (temp > 38)
    return `Extreme heat at ${Math.round(temp)}°C. Avoid outdoor exposure from 12–4 PM. Stay hydrated.`;
  if (temp >= 22 && temp <= 32 && hum < 70)
    return "Pleasant weather conditions. Perfect for a walk or outdoor activities!";
  if (hum > 80)
    return `High humidity (${hum}%) combined with ${Math.round(temp)}°C feels oppressive. Stay cool and hydrated.`;
  if (wind > 40)
    return `Strong winds at ${Math.round(wind)} km/h. Secure loose items outdoors.`;
  return "Weather conditions are stable. No special precautions needed today.";
}

export default function AiInsightCard({ weather }) {
  const insight = getInsight(weather);

  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🤖</span>
        <p className="text-white/70 text-sm font-medium">AI Weather Insight</p>
        <span className="ml-auto text-yellow-400 text-xs">✨</span>
      </div>
      <p className="text-white/70 text-sm leading-relaxed">{insight}</p>
    </div>
  );
}
