# Live Weather App

## Overview
The **Live Weather App** is a React-based application that provides real-time weather updates and a 5-day forecast for cities worldwide. The app utilizes the **OpenWeather API** to fetch weather data, including temperature, humidity, wind speed, and general conditions.

## Features
- 🌍 **Live Weather Data**: Get real-time weather updates for various cities across the globe.
- 📅 **5-Day Weather Forecast**: View a 5-day forecast with temperature and weather conditions.
- 🔄 **Geolocation Support**: Automatically detects your location and fetches weather data.
- 🌇 **Sunrise & Sunset Times**: Displays local sunrise and sunset times.
- 🌆 **City Dropdown Selection**: Easily select a city from a list of major global cities.
- 🌙 **Modern UI**: Styled with CSS Grid and Flexbox for a sleek and responsive design.

## Technologies Used
- **React.js**: Component-based UI rendering.
- **Axios**: API calls to fetch weather data.
- **OpenWeather API**: Source of weather data.
- **CSS (Poppins Font & Dark Theme)**: For styling and layout.

## Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your OpenWeather API key:
     ```sh
     REACT_APP_WEATHER_API_KEY=your_api_key_here
     ```
4. **Run the application:**
   ```sh
   npm start
   ```

## Usage
- Select a city from the dropdown or allow geolocation access for automatic weather updates.
- View real-time temperature, humidity, and wind speed.
- Check the sunrise and sunset times.
- Browse the 5-day weather forecast.


## API Reference
This application uses the [OpenWeather API](https://openweathermap.org/api) for retrieving weather data.
- **Current Weather API:** `https://api.openweathermap.org/data/2.5/weather`
- **Forecast API:** `https://api.openweathermap.org/data/2.5/forecast`

### Example API Request
```sh
https://api.openweathermap.org/data/2.5/weather?q=Tampere&appid=your_api_key&units=metric
```

## License
This project is open-source and available under the [MIT License](LICENSE).

## Author
Developed by **Abrar Morshed**.

## Contributions
Contributions and suggestions are welcome! Feel free to submit a pull request or open an issue.
