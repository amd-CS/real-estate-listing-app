import React, { useState } from "react";
import "./style.css";
import PostProperty from "./PostProperty";
import Properties from "./Properties";
import Search from "./Search";
import BarGraph from "./BarGraph";

const App = () => {
  const [lastProperty, setLastProperty] = useState();
  const [city, setCity] = useState();
  const [buildingType, setBuildingType] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  return (
    <>
      <h1>Real Estate Listing App</h1>

      <PostProperty setLastProperty={(property) => setLastProperty(property)} />

      <Search
        setCity={setCity}
        setBuildingType={(b) => setBuildingType(b)}
        setMaxPrice={(p) => setMaxPrice(p)}
        setMinPrice={(p) => setMinPrice(p)}
      />

      <Properties
        buildingType={buildingType}
        city={city}
        minPrice={minPrice}
        maxPrice={maxPrice}
        lastProperty={lastProperty}
      />
    </>
  );
};

export default App;
