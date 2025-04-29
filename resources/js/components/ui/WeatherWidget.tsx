import React, { useEffect, useState } from "react";
import { fetchWeather, WeatherData } from "@/Services/weatherService";

interface WeatherWidgetProps {
  city: string;
}

const getWeatherIcon = (weatherMain: string): string => {
  switch (weatherMain) {
    case "Clear":
      return "https://openweathermap.org/img/wn/01d@2x.png";
    case "Rain":
      return "https://openweathermap.org/img/wn/10d@2x.png";
    case "Clouds":
      return "https://openweathermap.org/img/wn/03d@2x.png";
    case "Thunderstorm":
      return "https://openweathermap.org/img/wn/11d@2x.png";
    case "Snow":
      return "https://openweathermap.org/img/wn/13d@2x.png";
    case "Drizzle":
      return "https://openweathermap.org/img/wn/09d@2x.png";
    case "Wind":
      return "https://openweathermap.org/img/wn/50d@2x.png";
    default:
      return "https://openweathermap.org/img/wn/01d@2x.png";
  }
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchWeather(city);
        setWeather(data);
      } catch (err) {
        setError("Gagal memuat data cuaca.");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  const formatDate = () => {
    const now = new Date();
    const hariList = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulanList = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const hari = hariList[now.getDay()];
    const tanggal = now.getDate();
    const bulan = bulanList[now.getMonth()];
    const tahun = now.getFullYear();

    return `${hari}, ${tanggal} ${bulan} ${tahun}`;
  };

  if (loading) return <div>Memuat informasi cuaca...</div>;
  if (error || !weather) return <div>{error || "Data tidak tersedia"}</div>;

  const weatherIcon = getWeatherIcon(weather.weather[0].main);

  return (
    <div className="rounded-lg mx-2 text-white">
      <div>
        <div className="text-center mb-2">{formatDate()}</div>
        <div id="weather-icon" className="mb-2">
          <img src={weatherIcon} alt="Ikon Cuaca" className="w-16 h-16 mx-auto" />
        </div>


        <ul className="space-y-1 text-xs">
          <li><span className="font-semibold text-center text-2xl inline-block w-full">{weather.main.temp}°C</span> </li>
          <li><span className="text-center text-xs inline-block w-full">{weather.name}</span> </li>
          <li><span className=" text-lg inline-block text-center w-full">{weather.weather[0].description}</span></li>
        </ul>
        <div className="flex justify-around items-center bg-blue-800 rounded-lg p-2 mt-4">
          <div className="inline-grid">
          <span className="font-semibold">{weather.main.humidity}%</span>
          <span className="text-center text-xs">humadity</span>
          </div>
          <div className="inline-grid">
          <span className="font-semibold">{weather.wind.speed} m/s </span>
          <span className="text-center text-xs">wind speed</span>
          </div>
          </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
