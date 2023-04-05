import React, { useState } from "react";
import axios from "axios";
import { WiCloudy } from "react-icons/wi";

function App() {
  const [location, setLocation] = useState("");
  const [recentLocations, setRecentLocations] = useState([]);

  const [data, setData] = useState({});

  const getWeather = async (lat, lon) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=671789e8ebb879a9a8a1725438b62cc7`
    );
    setData(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=671789e8ebb879a9a8a1725438b62cc7`
      );
      var data1 = response.data[0];
      var lat = data1.lat;
      var lon = data1.lon;

      getWeather(lat, lon);

      if (!recentLocations.includes(location)) {
        setRecentLocations([...recentLocations, location]);
      }

      setLocation("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRecentLocationClick = async (clickedLocation) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${clickedLocation}&limit=1&appid=671789e8ebb879a9a8a1725438b62cc7`
      );
      var data1 = response.data[0];
      var lat = data1.lat;
      var lon = data1.lon;

      getWeather(lat, lon);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <div className="h-full w-full">
        <div className="flex flex-col">
          <div className="flex h-screen items-center">
            <div className="ml-20 mt-20">
              {data.name ? (
                <div className="flex flex-row">
                  <div className="flex flex-col rounded-lg p-4 ">
                    <h1 className="text-8xl font-playfair text-gray-100 font-bold mt-20 mb-3">
                      {data.name}
                    </h1>
                    <div className="flex flex-col gap-2 font-opensans text-gray-300 font-bold ml-32">
                      <p className="text-6xl">
                        {Math.round(data.main.temp)} °F
                      </p>
                    </div>
                  </div>
                  <WiCloudy size={250} />
                </div>
              ) : null}
            </div>
          </div>
          <div className=" absolute right-0 w-1/3 h-full bg-[#3131316b] backdrop-blur-sm">
            <div className="flex flex-col w-5/6 h-full mx-auto justify-start">
              <form
                onSubmit={handleSubmit}
                className="flex justify-center w-full h-[50px] mt-20 "
              >
                <input
                  className="rounded-2xl text-xl border border-white bg-transparent p-3 w-5/6"
                  placeholder="Enter a Location..."
                  value={location}
                  type="text"
                  onChange={(event) => setLocation(event.target.value)}
                ></input>
                <button className="p-3 rounded-xl text-lg text-white border font-semibold ml-7">
                  Search
                </button>
              </form>
              <div className="flex flex-col mt-10">
                <div>
                  {recentLocations.length > 0 && (
                    <div className="text-2xl font-opensans text-gray-300 border-b border-gray-300">
                      <ul>
                        {recentLocations.map((loc) => (
                          <li
                            className="p-3"
                            key={loc}
                            onClick={() => handleRecentLocationClick(loc)}
                          >
                            {loc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {data.name ? (
                  <div className="flex flex-col gap-10 text-xl font-opensans text-gray-300 p-3 mt-10">
                    <span className="mx-auto">Weather Information:</span>
                    <span className="flex justify-between">
                      <p>Temperature:</p>
                      <p>{data.main.temp} °F</p>
                    </span>
                    <span className="flex justify-between">
                      <p>Feels Like:</p>
                      <p>{data.main.feels_like} °F</p>
                    </span>
                    <span className="flex justify-between">
                      <p>Wind Speed:</p>
                      <p>{data.wind.speed} km/h</p>
                    </span>
                    <span className="flex justify-between">
                      <p>Sky:</p>
                      <p>{data.weather[0].description}</p>
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
