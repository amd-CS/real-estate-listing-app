import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import {
  MdLocationCity,
  MdOutlineLocationOn,
  MdOutlineHouse,
  MdBed,
  MdOutlineBathroom,
  MdZoomOutMap,
  MdOutlineCalendarToday,
  MdOutlinePriceChange,
  MdThumbDownAlt,
  MdThumbUpAlt,
  MdVerified,
} from "react-icons/md";

const Properties = (props) => {
  const itemsPerPage = 3;
  const [pages, setPages] = useState([]);
  const [properties, setProperties] = useState();
  const [selectedPage, setSelectedPage] = useState(1);

  const avgPrices = {
    Vancouver: {
      House: 2.7,
      Townhouse: 1.5,
      Apartment: 1,
    },
    Burnaby: {
      House: 2.1,
      Townhouse: 1.1,
      Apartment: 0.8,
    },
    "West Vancouver": {
      House: 3.8,
      Townhouse: 2.3,
      Apartment: 1.1,
    },
    "North Vancouver": {
      House: 2.4,
      Townhouse: 1.5,
      Apartment: 0.8,
    },
  };

  useEffect(
    function loadProperties() {
      axios
        .get("/api/v1/properties", {
          params: {
            city: props.city,
            buildingType: props.buildingType,
            minPrice: props.minPrice || 100000,
            maxPrice: props.maxPrice || 100000000,
          },
        })
        .then((result) => {
          setProperties(result.data);
          // console.log(result);

          const pageCount = Math.ceil(result.data.length / itemsPerPage);
          const pageArr = [];
          for (let i = 1; i <= pageCount; i++) {
            pageArr.push(i);
          }

          setPages(pageArr);
        })
        .catch((error) => console.log(error));
    },
    [
      props.lastProperty,
      props.city,
      props.buildingType,
      props.minPrice,
      props.maxPrice,
    ]
  );

  return (
    <>
      <h2>Results</h2>
      {!properties ? (
        ""
      ) : (
        <ul className="property-list">
          {properties
            .slice(
              (selectedPage - 1) * itemsPerPage,
              selectedPage * itemsPerPage
            )
            .map((p) => (
              <li className="card card--property" key={p._id}>
                <ul className="specs-list">
                  <li className="specs-item">
                    <MdLocationCity size="1.5em" />
                    <span className="bold">City:&nbsp;</span>
                    <span>{p.city}</span>
                  </li>
                  <li className="specs-item">
                    <MdOutlineLocationOn size="1.5em" />
                    <span className="bold">Postal Code:&nbsp;</span>
                    <span>{p["postal-code"]}</span>
                  </li>
                  <li className="specs-item">
                    <MdOutlineHouse size="1.5em" />
                    <span className="bold">Building Type:&nbsp;</span>
                    <span>{p["building-type"]}</span>
                  </li>
                  <li className="specs-item">
                    <MdBed size="1.5em" />
                    <span className="bold">Beds:&nbsp;</span>
                    <span>{p.beds}</span>
                  </li>
                  <li className="specs-item">
                    <MdOutlineBathroom size="1.5em" />
                    <span className="bold">Baths:&nbsp;</span>
                    <span>{p.baths}</span>
                  </li>
                  <li className="specs-item">
                    <MdZoomOutMap size="1.5em" />
                    <span className="bold">Size:&nbsp;</span>
                    <span>{p.size}</span>
                  </li>
                  <li className="specs-item">
                    <MdOutlineCalendarToday size="1.5em" />
                    <span className="bold">Build Year:&nbsp;</span>
                    <span>{p["build-year"]}</span>
                  </li>
                  <li className="specs-item">
                    <MdOutlinePriceChange size="1.5em" />
                    <span className="bold">Price:&nbsp;</span>
                    <span>${p.price}</span>
                  </li>

                  {/* 
                  if price is more than 10% higher than average, it's overpriced
                  if price is less than 10% lower than average, it's a good price
                  otherwise, it's a fair price 
                  */}

                  {p.price >
                  avgPrices[p.city][p["building-type"]] * 1000000 * 1.1 ? (
                    <li className="specs-item price-badge overpriced">
                      <MdThumbDownAlt className="specs-icon" size="1.5em" />
                      <span className="bold">Overpriced</span>
                    </li>
                  ) : p.price <
                    avgPrices[p.city][p["building-type"]] * 1000000 * 0.9 ? (
                    <li className="specs-item price-badge good-price">
                      <MdThumbUpAlt className="specs-icon" size="1.5em" />
                      <span className="bold">Good Price</span>
                    </li>
                  ) : (
                    <li className="specs-item price-badge fair-price">
                      <MdVerified className="specs-icon" size="1.5em" />
                      <span className="bold">Fair Price</span>
                    </li>
                  )}
                </ul>
              </li>
            ))}
        </ul>
      )}

      {properties ? (
        properties.length === 0 ? (
          <div className="card card--property">No Results Available</div>
        ) : (
          ""
        )
      ) : (
        "Loading..."
      )}
      <ul className="pagination">
        {pages.map((p) => (
          <li
            className={
              p === selectedPage ? "page-item page-item--selected" : "page-item"
            }
            onClick={() => setSelectedPage(p)}
            key={p}
          >
            {p}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Properties;
