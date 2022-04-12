import React, { useState, useEffect } from "react";
import "./style.css";

const Search = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event);

    props.setCity(event.target[0].value);
    props.setBuildingType(event.target[1].value);
    props.setMinPrice(event.target[2].value);
    props.setMaxPrice(event.target[3].value);
  };

  return (
    <>
      <h2>Search for Homes</h2>

      <form
        onSubmit={(event) => handleSubmit(event)}
        className="card card--post card--search"
      >
        <label>
          City
          <select name="city">
            <option>Vancouver</option>
            <option>North Vancouver</option>
            <option>West Vancouver</option>
            <option>Burnaby</option>
          </select>
        </label>

        <label>
          Building Type
          <select name="building-type">
            <option>House</option>
            <option>Townhouse</option>
            <option>Apartment</option>
          </select>
        </label>

        <label>
          Minimum Price
          <input name="price" type="number" min="100000" max="100000000" />
        </label>

        <label>
          Maximum Price
          <input name="price" type="number" min="100000" max="100000000" />
        </label>

        <button className="btn btn--search">Search</button>
      </form>
    </>
  );
};

export default Search;
