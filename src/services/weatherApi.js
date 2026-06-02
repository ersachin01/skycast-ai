const API_KEY = import.meta.env.VITE_WEATHER_API;
const BASE = "https://api.openweathermap.org/data/2.5";

export async function fetchWeatherByCity(city) {
  const [weather, forecast] = await Promise.all([
    fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`).then(r => r.json()),
    fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`).then(r => r.json()),
  ]);
  if (weather.cod !== 200) throw new Error(weather.message || "City not found");
  return { weather, forecast };
}

export async function fetchWeatherByCoords(lat, lon) {
  const [weather, forecast] = await Promise.all([
    fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(r => r.json()),
    fetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(r => r.json()),
  ]);
  if (weather.cod !== 200) throw new Error("Location fetch failed");
  return { weather, forecast };
}
