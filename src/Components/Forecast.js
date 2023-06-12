import React, { useState } from "react";
import "../App.css";
import my_image1 from "./weatherIcons/sun.png";
import my_image2 from "./weatherIcons/sun.png";
import my_image3 from "./weatherIcons/sun.png";

export default function Forecast(props) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${props.apiKey}&q=${props.cityName}&days=3&aqi=no&alerts=no`;
  const [date1, setDate1] = useState("27/05");
  const [date2, setDate2] = useState("28/05");
  const [image0, setImage0] = useState(my_image1);
  const [image1, setImage1] = useState(my_image2);
  const [image2, setImage2] = useState(my_image3);
  const [status_0, setStatus0] = useState("Sunny");
  const [status_1, setStatus1] = useState("Sunny");
  const [status_2, setStatus2] = useState("Sunny");
  const [max_temp_0, setMaxTemp0] = useState(43);
  const [max_temp_1, setMaxTemp1] = useState(43);
  const [max_temp_2, setMaxTemp2] = useState(43);

  const [avg_temp_0, setAvgTemp0] = useState(34);
  const [avg_temp_1, setAvgTemp1] = useState(34);
  const [avg_temp_2, setAvgTemp2] = useState(34);

  const [min_temp_0, setMinTemp0] = useState(27);
  const [min_temp_1, setMinTemp1] = useState(27);
  const [min_temp_2, setMinTemp2] = useState(27);

  const [Precipitation_0, setPrecipitation0] = useState(45);
  const [Precipitation_1, setPrecipitation1] = useState(45);
  const [Precipitation_2, setPrecipitation2] = useState(45);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const Forecast = data.forecast.forecastday;
      const today = Forecast[0];
      const day1 = Forecast[1];
      const day2 = Forecast[2];
      setDate1(day1.date.split("-")[2] + "/" + day1.date.split("-")[1]);
      setDate2(day2.date.split("-")[2] + "/" + day2.date.split("-")[1]);
      setStatus0(today.day.condition.text);
      setStatus1(day1.day.condition.text);
      setStatus2(day2.day.condition.text);
      setImage0(today.day.condition.icon);
      setImage1(day1.day.condition.icon);
      setImage2(day2.day.condition.icon);

      setMaxTemp0(today.day.maxtemp_c);
      setMaxTemp1(day1.day.maxtemp_c);
      setMaxTemp2(day2.day.maxtemp_c);

      setAvgTemp0(today.day.avgtemp_c);
      setAvgTemp1(day1.day.avgtemp_c);
      setAvgTemp2(day2.day.avgtemp_c);

      setMinTemp0(today.day.mintemp_c);
      setMinTemp1(day1.day.mintemp_c);
      setMinTemp2(day2.day.mintemp_c);
      setPrecipitation0(today.day.daily_chance_of_rain);
      setPrecipitation1(day1.day.daily_chance_of_rain);
      setPrecipitation2(day2.day.daily_chance_of_rain);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  return (
    <div className="card">
      <div className="card-body">
        <table>
          <tr>
            <th className="Wlabels"></th>
            <th>Today</th>
            <th>{date1}</th>
            <th>{date2}</th>
          </tr>
          <tr>
            <td className="Wlabels"></td>
            <td>
              <img src={image0} alt="" className="for_image" />
            </td>
            <td>
              <img src={image1} alt="" className="for_image" />
            </td>
            <td>
              <img src={image2} alt="" className="for_image" />
            </td>
          </tr>
          <tr className="my_status">
            <td className="Wlabels"></td>
            <td className="my_status">{status_0}</td>
            <td className="my_status">{status_1}</td>
            <td className="my_status">{status_2}</td>
          </tr>
          <tr>
            <td className="Wlabels my_tags">Max Temperature</td>
            <td>{max_temp_0}</td>
            <td>{max_temp_1}</td>
            <td>{max_temp_2}</td>
          </tr>
          <tr>
            <td className="Wlabels my_tags">Min Temperature</td>
            <td>{min_temp_0}</td>
            <td>{min_temp_1}</td>
            <td>{min_temp_2}</td>
          </tr>
          <tr>
            <td className="Wlabels my_tags">Avg Temperature</td>
            <td>{avg_temp_0}</td>
            <td>{avg_temp_1}</td>
            <td>{avg_temp_2}</td>
          </tr>
          <tr>
            <td className="Wlabels my_tags">Precipitation %</td>
            <td>{Precipitation_0}%</td>
            <td>{Precipitation_1}%</td>
            <td>{Precipitation_2}%</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
