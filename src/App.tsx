import React, { useEffect } from 'react';
import './App.css';
import Api from './api';
import TemperatureComponent from './components/TemperatureComponent';
import { CircleLoader } from 'react-spinners';
import WeatherDescriptionComponent from './components/WeatherDescriptionComponent';
import TemperatureGraphComponent from './components/TemperatureGraphComponent';

function App() {
  // State
  const [weather, setWeather] = React.useState<Weather | null>(null);
  const [hourlyWeather, setHourlyWeather] = React.useState<Weather[] | null>(null);

  // Functions
  const updateWeather = async () => {
    Api.getWeather()
      .then(data => {
        setWeather(data.current)
        setHourlyWeather(data.hourly)
      })
      .catch(err => console.log(err));
  };

  const getBackgroundImageForWeather = (weather: Weather) => {
    if (['Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall'].includes(weather.category)) return 'weather-type-backgrounds/Mist.jpg';
    return `weather-type-backgrounds/${weather.category}.jpg`;
  }

  // Effects
  useEffect(() => {
    updateWeather();
  }, []);

  // Loading state
  if (weather === null || hourlyWeather === null) {
    return (
      <div className="App">
        <div className="loader"><CircleLoader color="white" size={100}/></div>
      </div>
    );
  };

  return (
    <div className="App" style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${getBackgroundImageForWeather(weather)})`}}>
      <h1>Heidhenheim, Germany</h1>
      <div className='main-partition' style={{ justifyContent: 'end' }}>
        <TemperatureComponent weather={weather}/>
        <WeatherDescriptionComponent weather={weather}/>
      </div>
      <div className='main-partition'>
        <TemperatureGraphComponent hourlyWeather={hourlyWeather}/>
      </div>
    </div>
  );
};

export default App;
