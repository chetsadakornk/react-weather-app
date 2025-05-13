import React, { useState } from "react";
// import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
// import { toast } from "react-toastify";
import Autocomplete from "react-google-autocomplete";
import { BsSearch, BsList } from 'react-icons/bs';
// import { GOOGLE_API_KEY } from '../constants/google_api'
import { FaArrowLeft } from "react-icons/fa";

function Inputs({ setQuery, units, setUnits, gonext, setGoNext }) {

  const GG_API_KEY = "AIzaSyCb15COhZTTnGOVkHRlSZnn6QlQx_Ht8cU";

  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
    if (gonext == 1) setGoNext(2);
  };

  // const handleLocationClick = () => {
  //   if (navigator.geolocation) {
  //     toast.info("Fetching users location.");
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       toast.success("Location fetched!");
  //       let lat = position.coords.latitude;
  //       let lon = position.coords.longitude;

  //       setQuery({
  //         lat,
  //         lon,
  //       });
  //     });
  //   }
  // };

  const onPlaceSelected = (place) => {

    setCity(place.address_components[0].long_name);

  };

  const handleArrowLeftOnClick = () => {
    setGoNext(1);
  }

  return (
    <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10">

      <form className='flex flex-row justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'>

        {gonext == 2 ? <FaArrowLeft onClick={handleArrowLeftOnClick} size={25} className="mr-3" /> : <BsList size={25} className="mr-3" />}

        <div>
          <Autocomplete
            className='bg-transparent border-none text-white focus:outline-none text-2xl'
            apiKey={GG_API_KEY}
            onPlaceSelected={onPlaceSelected}
            placeholder='Search city'
          />
        </div>

        <BsSearch size={20} onClick={handleSearchClick} className="text-white cursor-pointer transition ease-out hover:scale-125" />

      </form>


      {/* <div className="flex flex-row w-3/4 items-center justify-center space-x-4 my-5">
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div> */}

      {gonext == 2 && (
        <div className="flex flex-row w-1/4 items-center justify-center mt-1 ml-10">
          <button
            name="standard"
            className="text-xl text-white font-light transition ease-out hover:scale-125"
            onClick={handleUnitsChange}
          >
            °K
          </button>
          <p className="text-xl text-white mx-1">|</p>
          <button
            name="metric"
            className="text-xl text-white font-light transition ease-out hover:scale-125"
            onClick={handleUnitsChange}
          >
            °C
          </button>
          <p className="text-xl text-white mx-1">|</p>
          <button
            name="imperial"
            className="text-xl text-white font-light transition ease-out hover:scale-125"
            onClick={handleUnitsChange}
          >
            °F
          </button>
        </div>

      )}

    </div>
  );
}

export default Inputs;
