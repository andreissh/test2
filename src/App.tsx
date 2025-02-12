import { useEffect } from "react";
import Weather from "./components/Weather";
import weatherStore from "./store/weatherStore";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  useEffect(() => {
    weatherStore.fetchWeatherData();
  }, []);

  if (!weatherStore.weather) return <div>Loading...</div>;

  return (
    <>
      <Weather />
    </>
  );
});

export default App;
