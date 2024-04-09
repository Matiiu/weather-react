import { Weather } from "../../hooks/useWeather";
import { formatTemperature } from "../../helpers";

import style from './WeatherDetail.module.css'

type WeatherDetailProps = {
  weather: Weather;
};
export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div className={style.container}>
      <h2>Clima de: {weather.name}</h2>
      <p className={style.current}>{formatTemperature(weather.main.temp)}&deg;</p>

      <div className={style.tempetures}>
        <p>
          Min: <span>{formatTemperature(weather.main.temp_min)}&deg;</span>
        </p>
        <p>
          Max: <span>{formatTemperature(weather.main.temp_max)}&deg;</span>
        </p>
      </div>
    </div>
  );
}
