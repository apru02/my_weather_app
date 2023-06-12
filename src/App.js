import "./App.css";
import Forecast from "./Components/Forecast";
import Navbar from "./Components/Navbar";
import Search from "./Components/Search";
import Weather from "./Components/Weather";
import WeatherInfo from "./Components/WeatherInfo";
import React, { useEffect, useState } from "react";
function App() {
  const [city, setCity] = useState("");
  const onsearch = (city_name) => {
    setCity(city_name);
  };
  const apiKey = "c2c24644b06948599a1120531232505";
  // console.log(apiKey);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
    setCity(`${position.coords.latitude} ${position.coords.longitude}`) 
       
    });
    return () => {};
  }, []);

  return (
    <>
      <Navbar />
      <Search on_search={onsearch} />
      <div className="container">
        <Weather cityName={city} apiKey={apiKey} />
        <WeatherInfo cityName={city} apiKey={apiKey}/>
        <Forecast cityName={city} apiKey={apiKey} />
      </div>
    </>
  );
}

export default App;
