import React from "react";
import "../App.css";
import { useState } from "react";
export default function WeatherInfo(props) {
  const url =`http://api.weatherapi.com/v1/forecast.json?key=${props.apiKey}&q=${props.cityName}&days=1&aqi=yes&alerts=no`;
  const [Wind_speed,setWindSpeed] = useState(0);
  const [Humidity,setHumidity] = useState(0);
  const [Visibility,setVisibility] = useState(0);
  const [Sunrise,setSunrise] = useState('6:00 AM');
  const [Sunset,setSunset] =  useState('6:00 PM');
  const [Windgust,setWindGust] =useState(0);
  const [pressure,setPressure] = useState(0);
  const [wind_dirn,setWindDirn] = useState('W');
  const [uv,setUV] =useState(0);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const current = data.current;
      const Forecast = data.forecast.forecastday;
      const astro = Forecast[0].astro;
      setWindSpeed(current.wind_kph);
      setHumidity(current.humidity);
      setVisibility(current.vis_km);
      setWindGust(current.gust_kph);
      setPressure((0.1*(current.pressure_mb)).toFixed(2));
      setWindDirn(current.wind_dir);
      setSunrise(astro.sunrise);
      setSunset(astro.sunset);
      setUV(current.uv);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  return (
    <div
      className="card "
      style={{
        backgroundImage:
          "linear-gradient(121deg, rgb(0 47 117),rgb(85 99 220))",
        color: "white",
      }}
    >
      <div className="card-body weatherInfo">
        <p className="card-text weather_items">
          <span>Wind</span>
          <span>Humidity</span>
          <span>Visibility</span>
          <span>Sunrise</span>
        </p>
        <p className="card-text weather_items">
          <span>
            <span className="VALUE">{Wind_speed}&nbsp;&nbsp; </span>
            <span className="Vector">{wind_dirn}</span>
            <span className="Metric">Km/hr</span>
          </span>

          <span>
            {Humidity} <sup>%</sup>
          </span>
          <span>
            {Visibility} <sup>Km</sup>
          </span>
          <span>
            {Sunrise.split(' ')[0]} <sup>{Sunrise.split(' ')[1]}</sup>
          </span>
        </p>
        <p className="card-text weather_items">
          <span>Wind Gust</span>
          <span id="Press_tag">Pressure</span>
          <span>UV</span>
          <span>Sunset</span>
        </p>
        <p className="card-text weather_items">
          <span>
            {Windgust} <sup>Km/h</sup>
          </span>
          <span>
            &darr;{pressure} <sup>kPa</sup>
          </span>
          <span>
            {uv}
          </span>
          <span>
          {Sunset.split(' ')[0]} <sup>{Sunset.split(' ')[1]}</sup>
          </span>
        </p>
      </div>
    </div>
  );
}
