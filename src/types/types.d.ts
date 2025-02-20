export type WeatherDataType = {
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  pop: number;
};

export type UnitsType = "metric" | "imperial";
