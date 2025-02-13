import { useEffect } from "react";
import Weather from "./components/Weather";
import weatherStore from "./store/weatherStore";
import { observer } from "mobx-react-lite";
import { CircleLoader } from "react-spinners";
import "./App.css";

const App = observer(() => {
  useEffect(() => {
    weatherStore.fetchWeatherData();
  }, []);

  if (weatherStore.loading)
    return (
      <div className="spinnerContainer">
        <CircleLoader size={150} color="#fff" />
      </div>
    );
  if (weatherStore.error)
    return <div className="error">{weatherStore.error}</div>;
  if (!weatherStore.weather)
    return <div className="noData">Нет данных о погоде</div>;

  return (
    <>
      <Weather />
    </>
  );
});

export default App;
