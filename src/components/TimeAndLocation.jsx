import React from "react";
import { formatToLocalTime } from "../services/weatherService";

function TimeAndLocation({ weather: { dt, timezone, name, country, temp_min, temp_max } }) {
  return (
    <div>
      <div className="flex  my-3">
        <p className="text-white text-4xl font-medium">{`${name}, ${country}`}</p>
      </div>

      <div className="flex  my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex flex-row  my-6">
        <p className="text-white text-1xl font-extralight">

          {`Min ${temp_min.toFixed()}° , MAX ${temp_max.toFixed()}°`}
        </p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
