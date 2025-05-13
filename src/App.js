import "./App.css";

import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
// import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CityList from "./components/CityList";
import { formatToLocalTime, iconUrlFromCode } from "./services/weatherService";
import { FaTrashAlt } from "react-icons/fa";

function App() {
  const [query, setQuery] = useState({ q: "bangkok" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  let [cityList, setCityList] = useState([]);
  const [gonext, setGoNext] = useState(1);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        console.log("getFormattedWeatherData");
        console.log(data);

        setWeather(data);

        addCityList(data);

      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  // console.log(weather)
  // console.log(cityList)

  const addCityList = (data) => {

    if (cityList.lenght > 0) {
      let cityListRem = cityList.filter(item => item.id != data.id);

      cityListRem.push(data);
      setCityList(cityListRem);

    } else {
      cityList.push(data);
        setCityList(cityList);
      
    }

    // checkDupCityList(cityList);
    
  }

  const removeCityList = (id) => {

    const cityListRemove = cityList.filter(item => item.id != id);

    setCityList(cityListRemove);

    console.log(cityListRemove)

  }

  const checkDupCityList = (cityList) => {

    console.log("checkDupCityList");
    console.log(cityList);
    let newArr = [{}];
    for (let i = 0; i < cityList.length; i++) {
      let cnt = 0;
      let lastIdx = 0;

      for (let j = 0; j < cityList.length; j++) {
        if (cityList[i].id == cityList[j].id) {
          cnt = cnt + 1;
          lastIdx = j;
        }
      }
      if (cnt > 1) {
        newArr.push(cityList[lastIdx]);
      } else {
        newArr.push(cityList[i]);
      }

      setCityList(newArr);

    }

  }

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >

      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} gonext={gonext} setGoNext={setGoNext} />

      {weather && gonext == 2 && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          {/* <Forecast title="hourly forecast" items={weather.hourly} /> */}
          {/* <Forecast title="daily forecast" items={weather.daily} /> */}
          <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
        </div>
      )}

      {gonext == 1 && (
        
        <div>
          <ul>
            {
              (typeof cityList !== 'undefined' ) ? (
                cityList.length > 0 ? (
                  cityList.map((city) => {
                    return (
                      <li key={city.id}>
                        <div className='flex flex-row justify-between my-5'>
                          <div className='flex flex-col justify-start'>
                            <p className='text-3xl text-white  mr-5'>{`${city.name}`}</p>
                            <p className="text-white text-xl font-extralight">
                              { formatToLocalTime(city.dt, city.timezone)}
                            </p>
                          </div>
                          <div className='flex flex-row justify-center '>
                            <img
                              src={iconUrlFromCode(city.icon)}
                              className="w-30 my-1 mb-7"
                              alt=""
                              size={18}
                            />
                            <p className="text-5xl my-1 justify-center mt-7">{ `${city.temp.toFixed()}°`}</p>
                          </div>
                          <button onClick={() => removeCityList(city.id)}>
                            <FaTrashAlt size={30} className="text-white mb-5" />
                          </button>
  
                        </div>
                      </li>
                    );
                  })
                ) : (<></>)
                
              ) : (
                <li className="search__no-results">City list is empty</li>
              )
            }

          </ul>
        </div>
      )}

    </div>
  );
}

export default App;
