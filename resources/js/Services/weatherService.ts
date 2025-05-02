import axios from 'axios';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(`/api/weather`, { params: { city } });
  return response.data;
};
