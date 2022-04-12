import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";

const PostProperty = (props) => {
  const [city, setCity] = useState("Vancouver");
  const [postalCode, setPostalCode] = useState("");
  const [buildingType, setBuildingType] = useState("House");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [buildYear, setBuildYear] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event);

    let data = {};

    data.city = city;
    data["postal-code"] = postalCode;
    data["building-type"] = buildingType;
    data["beds"] = beds;
    data["baths"] = baths;
    data["build-year"] = buildYear;
    data["size"] = size;
    data["price"] = price;

    // console.log(data);

    axios
      .post("/api/v1/properties", data)
      .then((result) => {
        props.setLastProperty(data);
        // console.log(result);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h2>List Your Home</h2>

      <form
        onSubmit={(event) => handleSubmit(event)}
        className="card card--post"
      >
        <label>
          City
          <select
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option>Vancouver</option>
            <option>North Vancouver</option>
            <option>West Vancouver</option>
            <option>Burnaby</option>
          </select>
        </label>

        <label>
          Postal Code
          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            name="postal-code"
            type="text"
            required
          />
        </label>

        <label>
          Building Type
          <select
            name="building-type"
            value={buildingType}
            onChange={(e) => setBuildingType(e.target.value)}
            required
          >
            <option>House</option>
            <option>Townhouse</option>
            <option>Apartment</option>
          </select>
        </label>

        <label>
          Beds
          <input
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            name="beds"
            type="number"
            min="0"
            max="20"
            required
          />
        </label>

        <label>
          Baths
          <input
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            name="baths"
            type="number"
            min="1"
            max="20"
            required
          />
        </label>

        <label>
          Build Year
          <input
            value={buildYear}
            onChange={(e) => setBuildYear(e.target.value)}
            name="build-year"
            type="number"
            min="1900"
            max="2022"
            required
          />
        </label>

        <label>
          Size (sqft)
          <input
            value={size}
            onChange={(e) => setSize(e.target.value)}
            name="size"
            type="number"
            min="100"
            max="100000"
            required
          />
        </label>

        <label>
          Price
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            type="number"
            min="100000"
            max="100000000"
            required
          />
        </label>

        <button className="btn btn--submit">List Home</button>
      </form>
    </>
  );
};

export default PostProperty;
