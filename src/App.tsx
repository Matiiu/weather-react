import useWeather from "./hooks/useWeather";

import styles from "./App.module.css";
import Form from "./components/Form/Form";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import Spinner from "./components/Spinner/Spinner";
import Alert from "./components/Alert/Alert";

export default function App() {
  const { fetchWeather, weather, hasWeatherData, loading, msgError } = useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Spinner />}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {!!msgError && <Alert>{msgError}</Alert>}
      </div>
    </>
  );
}
