import { DateTime } from "luxon";

import {WEATHER_API_KEY,WEATHER_API_KEY2,WEATHER_API_URL} from '../constants/weather_api'



const API_KEY = WEATHER_API_KEY;
const API_KEY2 = WEATHER_API_KEY2;

const BASE_URL = WEATHER_API_URL;

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);

  if (infoType == "onecall") {
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY2 });

  } else {
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  }


  console.log(url);
  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity,pressure },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    rain,
    id,
    timezone,
  } = data;

  const { main: details, icon } = weather[0];

  return {
    id,
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    pressure,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
    rain,
    timezone
  };
};

// const formatForecastWeather = (data) => {
//   let { timezone, daily, hourly } = data;

//   console.log(daily);
//   if (!daily) {
//     daily = daily.slice(1, 6).map((d) => {
//       return {
//         title: formatToLocalTime(d.dt, timezone, "ccc"),
//         temp: d.temp.day,
//         icon: d.weather[0].icon,
//       };
//     });
//   }

//   console.log(hourly);
//   if (!hourly) {
//     hourly = hourly.slice(1, 6).map((d) => {
//       return {
//         title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
//         temp: d.temp,
//         icon: d.weather[0].icon,
//       };
//     });
//   }


//   return { timezone, daily, hourly };
// };

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  // const formattedForecastWeather = await getWeatherData("onecall", {
  //   lat,
  //   lon,
  //   exclude: "current,minutely,alerts",
  //   units: searchParams.units,
  // }).then(formatForecastWeather);

  // return { ...formattedCurrentWeather, ...formattedForecastWeather };
  return { ...formattedCurrentWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
