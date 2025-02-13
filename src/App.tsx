import { useEffect } from "react";
import Weather from "./components/Weather";
import weatherStore from "./store/weatherStore";
import { observer } from "mobx-react-lite";
import { CircleLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = observer(() => {
  useEffect(() => {
    weatherStore.fetchWeatherData();
    localStorage.setItem("units", "metric");
  }, []);

  if (weatherStore.loading)
    return (
      <div className="spinnerContainer">
        <CircleLoader size={150} color="#fff" />
      </div>
    );
  if (weatherStore.error && weatherStore.error !== "city not found") {
    return <div className="error">{weatherStore.error}</div>;
  }
  if (!weatherStore.weather)
    return <div className="noData">Нет данных о погоде</div>;

  return (
    <>
      <Weather />
      <ToastContainer />
    </>
  );
});

export default App;
