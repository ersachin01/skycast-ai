import { useEffect } from "react";
import TopBar from "../components/TopBar";
import MainWeather from "../components/MainWeather";
import HourlyForecast from "../components/HourlyForecast";
import WeekForecast from "../components/WeekForecast";
import AirQualityCard from "../components/AirQualityCard";
import AiInsightCard from "../components/AiInsightCard";
import SunriseSunset from "../components/SunriseSunset";
import Loader from "../components/Loader";
import { useWeather } from "../hooks/useWeather";

export default function Dashboard() {
  const { weather, forecast, loading, error, loadByCity, loadByLocation } = useWeather();

  useEffect(() => { loadByLocation(); }, []);

  return (
    <div className="flex flex-col h-full min-h-screen">
      <TopBar onSearch={loadByCity} onLocate={loadByLocation} />

      <div className="flex-1 p-5 space-y-4">
        {error && (
          <div className="glass rounded-2xl px-4 py-3 text-red-400 text-sm border border-red-500/20">
            ⚠️ {error}
          </div>
        )}

        {loading && <Loader />}

        {!loading && weather && forecast && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4 animate-fade-up">
            {/* Left column */}
            <div className="space-y-4">
              <MainWeather weather={weather} />
              <HourlyForecast forecast={forecast} />
              <WeekForecast forecast={forecast} />
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <AirQualityCard />
              <AiInsightCard weather={weather} />
              <SunriseSunset weather={weather} />
            </div>
          </div>
        )}

        {!loading && !weather && !error && (
          <div className="flex flex-col items-center justify-center py-32 text-white/30">
            <p className="text-5xl mb-4">🌤️</p>
            <p className="text-sm">Search a city or allow location access to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
