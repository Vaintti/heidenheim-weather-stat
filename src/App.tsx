import React, { useEffect } from 'react';
import './App.css';
import Api from './api';
import TemperatureComponent from './components/TemperatureComponent';
import { CircleLoader } from 'react-spinners';
import WeatherDescriptionComponent from './components/WeatherDescriptionComponent';

function App() {
  // State
  const [weather, setWeather] = React.useState<Weather | null>(null);

  // Functions
  const updateWeather = async () => {
    Api.getWeather('heidenheim')
      .then(data => setWeather(data))
      .catch(err => console.log(err));
  };

  const getBackgroundImageForWeather = (weather: Weather) => {
    if (['Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall'].includes(weather.category)) return 'weather-type-backgrounds/Mist.jpg';
    return `weather-type-backgrounds/${weather.category}.jpg`;
  }

  // Effects
  useEffect(() => {
    updateWeather();
  });

  // Loading state
  if (weather === null) {
    return <div className="loader"><CircleLoader color="white" size={100}/></div>;
  };

  return (
    <div className="App" style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${getBackgroundImageForWeather(weather)})`}}>
      <TemperatureComponent weather={weather}/>
      <WeatherDescriptionComponent weather={weather}/>
    </div>
  );
};

export default App;
