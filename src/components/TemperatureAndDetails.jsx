import React from "react";
// import {
//   UilTemperature,
//   UilTear,
//   UilWind,
//   UilSun,
//   UilSunset,
// } from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

import { TiWeatherWindyCloudy } from "react-icons/ti";
import { BsCloudLightningRain } from "react-icons/bs";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
    pressure,
    rain
  },
}) {
  console.log(pressure)
  console.log(rain)
  return (
    <div>
      <div className="flex flex-col items-center justify-center ">
        <div>
          <img
            src={iconUrlFromCode(icon)}
            className="w-30 my-1"
            alt=""
            size={50}
          />
        </div>
        <div className="flex items-center justify-center py-3 text-white ">
          <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        </div>
        <div className="flex items-center justify-center py-3  text-xl text-white">
          <p>{details}</p>
        </div>
      </div>

      <hr className="my-2"></hr>

      <div className="flex items-center justify-start mt-2">
        <p className="text-white font-medium uppercase">{`24 hours forecast`}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white" >
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">8 AM</p>
          <img
            src={iconUrlFromCode(icon)}
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">{`${temp.toFixed()}°`}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">11 AM</p>
          <img
            src={iconUrlFromCode(icon)}
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">{`${temp.toFixed()}°`}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">2 PM</p>
          <img
            src={iconUrlFromCode(icon)}
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">{`${temp.toFixed()}°`}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">5 PM</p>
          <img
            src={iconUrlFromCode(icon)}
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">{`${temp.toFixed()}°`}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">8 PM</p>
          <img
            src={iconUrlFromCode(icon)}
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">{`${temp.toFixed()}°`}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">11 PM</p>
          <img
            src={iconUrlFromCode(icon)}
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">{`${temp.toFixed()}°`}</p>
        </div>
      </div>

      <hr className="my-2" />

      <div className="flex items-center justify-start mt-3">
        <p className="text-white font-medium uppercase">{`current details`}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">

        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm  justify-center">
            <FaTemperatureHigh size={18} className="mr-1 " />
            Real fell:
            <span className="font-medium ml-1 ">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm  justify-center">
            <WiHumidity size={25} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm  justify-center">
            <FaWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
          <div className="flex font-light text-sm  justify-center">
            <TiWeatherWindyCloudy size={18} className="mr-1" />
            Pressure:
            <span className="font-medium ml-1">{`${pressure.toFixed()} mBar`}</span>
          </div>
          <div className="flex font-light text-sm  justify-center">
            <BsCloudLightningRain size={18} className="mr-1" />
            Chance of rain:
            <span className="font-medium ml-1">35 %</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <FiSunrise />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <FiSunset />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <FaTemperatureHigh />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>

        <FaTemperatureLow />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
