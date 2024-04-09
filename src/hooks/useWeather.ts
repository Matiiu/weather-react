import { useMemo, useState } from "react";
import axios from "axios";
import { z } from "zod";
// import { object, string, number, Output, parse } from "valibot";
import type { SearchType } from "../types";

// Zod
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});
export type Weather = z.infer<typeof Weather>;

export default function useWeather() {
  const API_KEY = import.meta.env?.VITE_API_KEY ?? "";
  const initialWeather: Weather = {
    name: "",
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  };

  const [weather, setWeather] = useState<Weather>({ ...initialWeather });
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState("");

  const fetchWeather = async (search: SearchType) => {
    setLoading(true);
    setMsgError("");
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${API_KEY}`;
      const { data } = await axios(geoUrl);
      if (!data.length) {
        setWeather({ ...initialWeather });
        setMsgError("Ciudad no Encontrada");
        return;
      }
      const { lat, lon } = data[0];
      await getWeather(lat, lon);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getWeather = async (latitude: number, longitude: number) => {
    try {
      const watherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      // Zod
      const { data } = await axios(watherUrl);
      const result = Weather.safeParse(data);

      if (!result.success) {
        throw new Error("The data is not of type Weather");
      }

      setWeather(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const hasWeatherData = useMemo(
    () => !!weather.name && !loading,
    [weather, loading]
  );

  return {
    fetchWeather,
    weather,
    hasWeatherData,
    loading,
    msgError,
  };
}
