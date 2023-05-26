import React from "react";
import "../App.css";
import sunny from "./weatherIcons/sun.png";
import sunnyBG from "./Daybg.avif";
import nightBG from "./M-Maggs-pixabay.jpg";
import { useState } from "react";
export default function Weather(props) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${props.apiKey}&q=${props.cityName}&aqi=yes`;
  const [tempC, setTempC] = useState("");
  const [status, setStatus] = useState("");
  const [CityName, SetCityName] = useState("");
  const [CountryName, setCountryName] = useState("");
  const [AirQuality, setAirQuality] = useState("GOOD");
  const [WindSpeed, setWindSpped] = useState("32 Km/h");
  const [image, setImage] = useState(sunny);
  const [imageBG, setImageBG] = useState(sunnyBG);
  const [my_color, setMyColor] = useState("black");
  const currentDate = new Date();
  const options1 = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const options2 = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };

  const CurrentTime = new Intl.DateTimeFormat("en-US", options1).format(
    currentDate
  );
  const CurrentDate = new Intl.DateTimeFormat("en-US", options2).format(
    currentDate
  );
  const [localTime, setLocalTime] = useState(CurrentTime);
  const [LocalDate, setLocalDate] = useState(CurrentDate);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const current = data.current;
      const location = data.location;
      SetCityName(location.name + "," + location.region);
      setTempC(current.temp_c);
      setCountryName(location.country);
      setStatus(current.condition.text);
      setWindSpped(current.wind_kph);
      const local_time = location.localtime;
      const dateTime = new Date(local_time);
      setLocalDate(dateTime.toLocaleDateString("en-US", options2));
      setLocalTime(Intl.DateTimeFormat("en-US", options1).format(dateTime));
      const defra_index = current.air_quality["gb-defra-index"];
      if (defra_index <= 3) setAirQuality("VERY GOOD");
      else if (defra_index > 3 && defra_index <= 6)
        setAirQuality("MODERATELY GOOD");
      else if (defra_index > 6 && defra_index <= 9) setAirQuality("POOR");
      else setAirQuality("VERY POOR");
      setImage(current.condition.icon);
      if (current.is_day) {
        setImageBG(sunnyBG);
        setMyColor("black");
      } else {
        setImageBG(nightBG);
        setMyColor("white");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  const imageStyle = {
    backgroundImage: `url(${imageBG})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    color: `${my_color}`,
  };
  return (
    <div className="card" style={imageStyle}>
      <div className="card-body">
        <h5 className="card-title">
          {CityName},{CountryName}
        </h5>
        <p className="card-text Mytemperature">
          {tempC}
          <sup>&deg;c</sup>
          <img className="WeatherIcon" src={image} alt="" />
        </p>
        <p className="card-text">{status}</p>
        <p className="card-text">
          {LocalDate}, Local Time : {localTime}
        </p>
        <p className="card-text details">
          <span>Air-Quality : {AirQuality}</span>
          <span>Wind : {WindSpeed} Km/h</span>
        </p>
      </div>
    </div>
  );
}
