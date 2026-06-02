import { useState, useCallback } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../services/weatherApi";

export function useWeather() {
  const [weather, setWeather]   = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const loadByCity = useCallback(async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data.weather);
      setForecast(data.forecast);
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadByLocation = useCallback(() => {
    if (!navigator.geolocation) {
      loadByCity("Delhi");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await fetchWeatherByCoords(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setWeather(data.weather);
          setForecast(data.forecast);
        } catch (e) {
          setError(e.message || "Location fetch failed.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        loadByCity("Delhi");
      }
    );
  }, [loadByCity]);

  return { weather, forecast, loading, error, loadByCity, loadByLocation };
}
