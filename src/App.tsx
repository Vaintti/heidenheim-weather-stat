import React from 'react';
import './App.css';
import Api from './api';
import TemperatureComponent from './components/TemperatureComponent';
import { CircleLoader } from 'react-spinners';
import WeatherDescriptionComponent from './components/WeatherDescriptionComponent';

function App() {
  Api.getWeather('heidenheim')
  .then(data => setWeather(data))
  .catch(err => console.log(err));

  const [weather, setWeather] = React.useState<Weather | null>(null);

  if (weather === null) {
    return <div className="loader"><CircleLoader color="white" size={100}/></div>;
  }

  return (
    <div className="App">
      <TemperatureComponent weather={weather}/>
      <WeatherDescriptionComponent weather={weather}/>
    </div>
  );
}

export default App;
