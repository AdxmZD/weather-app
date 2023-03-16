import React, { useState } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("London");

  const url = `"http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=671789e8ebb879a9a8a1725438b62cc7"`;
  return (
    <div className="app">
      <div className="container h-full w-full">
        <div className="flex w-1/3 h-[500px] mx-auto justify-between">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
