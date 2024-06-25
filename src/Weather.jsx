import axios from 'axios';
import React, { useState } from 'react'

const Weather = () => {
  const[city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '926ecd554848fdfff209d5e9843cf5f3';

  const getWeather = async(e) => {
    e.preventDefault();
    setError('');
    setWeather(null);

    if(!city){
      setError('Please enter a city');
      return;
    }

    try{
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeather(response.data);
    }catch (error){
      setError('City not found or an error occured');
    }
  }

  return (
    <div className='container'>
        <form onSubmit={getWeather}>
          <input type="text" placeholder='Enter City' className='input' value={city} onChange={(e)=>setCity(e.target.value)}/>
            <button className='weatherbtn'>Get Weather</button>
        </form>
        {error && <p>{error}</p>}
        {weather && (
          <div className='weather-info'>
            <h3>{weather.name}</h3>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
    </div>
  )
}

export default Weather