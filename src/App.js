import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Replace with your API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

const cities = [
  "Tampere", "Helsinki", "New York", "London", "Tokyo", "Paris", "Berlin", "Los Angeles",
  "Dubai", "Sydney", "Moscow", "Toronto", "Singapore", "Delhi", "Bangkok", "Madrid",
  "Dhaka", "Islamabad", "Beijing", "Shanghai", "Hong Kong", "Seoul", "Jakarta", "Kuala Lumpur",
  "Cairo", "Riyadh", "Istanbul", "Mumbai", "Bangalore", "Chennai", "Karachi", "Lahore",
  "Kathmandu", "Colombo", "Manila", "Ho Chi Minh City", "Hanoi", "Bangkok", "Phnom Penh",
  "Vientiane", "Yangon", "Doha", "Abu Dhabi", "Muscat", "Tehran", "Baghdad", "Amman",
  "Beirut", "Riyadh", "Jeddah", "Kuwait City", "Ankara", "Athens", "Rome", "Milan",
  "Barcelona", "Lisbon", "Vienna", "Prague", "Warsaw", "Budapest", "Stockholm", "Oslo",
  "Copenhagen", "Helsinki", "Dublin", "Edinburgh", "Manchester", "Birmingham", "Glasgow",
  "Brussels", "Amsterdam", "Zurich", "Geneva", "Luxembourg City", "Reykjavik", "Valletta",
  "Nicosia", "Sofia", "Bucharest", "Belgrade", "Zagreb", "Sarajevo", "Skopje", "Tirana",
  "Podgorica", "Pristina", "Vilnius", "Riga", "Tallinn", "Minsk", "Kiev", "Odessa",
  "Saint Petersburg", "Almaty", "Astana", "Tashkent", "Bishkek", "Dushanbe", "Ashgabat",
  "Yerevan", "Tbilisi", "Baku", "Jerusalem", "Tel Aviv", "Haifa", "Ramallah", "Gaza City",
  "Cape Town", "Johannesburg", "Nairobi", "Addis Ababa", "Khartoum", "Dar es Salaam",
  "Kampala", "Lagos", "Accra", "Abidjan", "Dakar", "Bamako", "Ouagadougou", "Conakry",
  "Freetown", "Monrovia", "Banjul", "Bissau", "Praia", "São Tomé", "Libreville", "Malabo",
  "Luanda", "Windhoek", "Gaborone", "Harare", "Lusaka", "Maputo", "Antananarivo", "Port Louis",
  "Moroni", "Victoria", "Mogadishu", "Djibouti", "Asmara", "Hargeisa", "Juba", "Brazzaville",
  "Kinshasa", "Bujumbura", "Kigali", "Nouakchott", "Niamey", "Yaoundé", "N'Djamena",
  "Bangui", "Brazzaville", "Kinshasa", "Bujumbura", "Kigali", "Nouakchott", "Niamey",
  "Yaoundé", "N'Djamena", "Bangui"
];

const App = () => {
  const [city, setCity] = useState("Tampere"); // Default city
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        fetchWeather(city); // If location access is denied, use default city
      }
    );

    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async (query) => {
    try {
      const response = await axios.get(API_URL, {
        params: { q: query, appid: API_KEY, units: "metric" },
      });
      setWeather(response.data);
      setError("");
      setCity(query);
      setSunrise(response.data.sys.sunrise);
      setSunset(response.data.sys.sunset);
      fetchForecast(query);
    } catch (err) {
      setError("City not found. Try again!");
      setWeather(null);
    }
  };

  const fetchForecast = async (query) => {
    try {
      const response = await axios.get(FORECAST_API_URL, {
        params: { q: query, appid: API_KEY, units: "metric" },
      });

      const dailyForecasts = response.data.list.filter((_, index) => index % 8 === 0);
      setForecast(dailyForecasts);
    } catch (err) {
      console.error("Error fetching forecast:", err);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(API_URL, {
        params: { lat, lon, appid: API_KEY, units: "metric" },
      });

      setWeather(response.data);
      setCity(response.data.name);
      setError("");
      setSunrise(response.data.sys.sunrise);
      setSunset(response.data.sys.sunset);
      fetchForecast(response.data.name);
    } catch (err) {
      setError("Could not fetch location weather.");
    }
  };

  const getWeatherIcon = (description) => {
    if (description.includes("clear")) return "☀️";
    if (description.includes("cloud")) return "☁️";
    if (description.includes("rain")) return "🌧️";
    if (description.includes("snow")) return "❄️";
    if (description.includes("thunderstorm")) return "⛈️";
    return "🌍";
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="container">
      <div className="top-left">
        <h2 className="title">🌍 Live Weather</h2>
        <div className="datetime">
          <p>{dateTime.toLocaleDateString()}</p>
          <p>{dateTime.toLocaleTimeString()}</p>
          <p>{dateTime.toLocaleDateString("en-US", { weekday: "long" })}</p>
        </div>
        {sunrise && sunset && (
          <div className="sun-data">
            <p>🌅 Sunrise: {formatTime(sunrise)}</p>
            <p>🌇 Sunset: {formatTime(sunset)}</p>
          </div>
        )}
      </div>

      <div className="middle-top">
        <div className="dropdown">
          <button className="dropbtn" onClick={() => setShowDropdown(!showDropdown)}>
            🌆 Select City ▼
          </button>
          {showDropdown && (
            <div className="dropdown-content">
              {cities.map((c) => (
                <p key={c} onClick={() => { fetchWeather(c); setShowDropdown(false); }}>
                  {c}
                </p>
              ))}
            </div>
          )}
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h3>{weather.name}, {weather.sys.country}</h3>
            <p className="weather-icon">{getWeatherIcon(weather.weather[0].description)}</p>
            <p className="temp">{weather.main.temp}°C</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
            <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          </div>
        )}
      </div>

      {forecast.length > 0 && (
        <div className="forecast">
          <h3>📅 5 - Day Forecast</h3>
          <div className="forecast-container">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <p className="date">{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p className="weather-icon">{getWeatherIcon(day.weather[0].description)}</p>
                <p className="temp">{day.main.temp}°C</p>
                <p className="description">{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;