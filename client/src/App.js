import React, { useState } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("");

  const [data, setData] = useState({});

  // const url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=671789e8ebb879a9a8a1725438b62cc7`;
  // const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=671789e8ebb879a9a8a1725438b62cc7`;

  const getWeather = async (lat, lon) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=671789e8ebb879a9a8a1725438b62cc7`
    );
    setData(res.data);
    console.log(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=671789e8ebb879a9a8a1725438b62cc7`
    );
    console.log(response.data);
    var data1 = response.data[0];
    var lat = data1.lat;
    var lon = data1.lon;

    getWeather(lat, lon);

    setLocation("");
  };

  return (
    <div className="app">
      <div className="h-full w-full">
        <div className=" absolute left-[480px] z-[-1] rounded-3xl w-1/2 h-full bg-black opacity-[.5]"></div>
        <div className="flex flex-col w-1/2 h-full mx-auto justify-start">
          <h1 className="flex justify-center text-6xl font-playfair font-semibold mt-10">
            weather <p className=" text-blue-400">App</p>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center w-full h-[50px] mt-10 "
          >
            <input
              className="rounded-2xl text-xl border border-white bg-transparent p-3 w-1/2"
              placeholder="Enter a Location..."
              value={location}
              type="text"
              onChange={(event) => setLocation(event.target.value)}
            ></input>
            <button className="p-3 rounded-xl text-lg text-white border font-semibold ml-7">
              Search
            </button>
          </form>
          <div className="flex justify-around mt-10 mb-5">
            <span className="text-5xl font-playfair font-semibold">
              {data.name}
            </span>
          </div>
          <div className="flex justify-between mt-10 px-10">
            <span className="text-4xl">Temperature</span>
            {data.main ? (
              <span className="text-4xl font-semibold">
                {data.main.temp} °F
              </span>
            ) : null}
          </div>
          <div className="flex justify-between mt-10 px-10">
            <span className="text-4xl">Feels Like</span>
            {data.main ? (
              <span className="text-4xl font-semibold">
                {data.main.feels_like} °F
              </span>
            ) : null}
          </div>
          <div className="flex justify-between mt-10 px-10">
            <span className="text-4xl">Wind Speed</span>
            {data.wind ? (
              <span className="text-4xl font-semibold">
                {data.wind.speed} km/h
              </span>
            ) : null}
          </div>
          <div className="flex justify-between mt-10 px-10">
            <span className="text-4xl">Sky</span>
            {data.weather ? (
              <span className="text-4xl font-semibold">
                {data.weather[0].description}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
