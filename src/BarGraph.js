import React from "react";
import { letterFrequency } from "@visx/mock-data";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";

// We'll use some mock data from `@visx/mock-data` for this.

// const data = letterFrequency;

const data = [
  {
    date: "2020-10-01",
    London: "60",
    Paris: "68",
    Berlin: "61",
  },
  {
    date: "2020-10-02",
    London: "57",
    Paris: "58",
    Berlin: "62",
  },
  {
    date: "2020-10-03",
    London: "59",
    Paris: "57",
    Berlin: "72",
  },
  {
    date: "2020-10-04",
    London: "52",
    Paris: "59",
    Berlin: "68",
  },
  {
    date: "2020-10-05",
    London: "63",
    Paris: "57",
    Berlin: "63",
  },
  {
    date: "2020-10-06",
    London: "61",
    Paris: "62",
    Berlin: "61",
  },
  {
    date: "2020-10-07",
    London: "61",
    Paris: "64",
    Berlin: "61",
  },
  {
    date: "2020-10-08",
    London: "64",
    Paris: "66",
    Berlin: "60",
  },
  {
    date: "2020-10-09",
    London: "58",
    Paris: "62",
    Berlin: "60",
  },
  {
    date: "2020-10-10",
    London: "56",
    Paris: "59",
    Berlin: "55",
  },
  {
    date: "2020-10-11",
    London: "57",
    Paris: "58",
    Berlin: "52",
  },
  {
    date: "2020-10-12",
    London: "56",
    Paris: "58",
    Berlin: "54",
  },
  {
    date: "2020-10-13",
    London: "52",
    Paris: "56",
    Berlin: "55",
  },
  {
    date: "2020-10-14",
    London: "58",
    Paris: "57",
    Berlin: "51",
  },
];
const keys = ["London", "Paris", "Berlin"];

// Define the graph dimensions and margins
const width = 500;
const height = 500;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
const x = (d) => d.letter;
const y = (d) => +d.frequency * 100;

// And then scale the graph by our data
const xScale = scaleBand({
  range: [0, xMax],
  round: true,
  domain: data.map(x),
  padding: 0.4,
});
const yScale = scaleLinear({
  range: [yMax, 0],
  round: true,
  domain: [0, Math.max(...data.map(y))],
});

// Compose together the scale and accessor functions to get point functions
const compose = (scale, accessor) => (data) => scale(accessor(data));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

// Finally we'll embed it all in an SVG
const BarGraph = (props) => {
  return (
    <svg width={width} height={height}>
      {data.map((d, i) => {
        const barHeight = yMax - yPoint(d);
        return (
          <Group key={`bar-${i}`}>
            <Bar
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="#00f500"
            />
          </Group>
        );
      })}
    </svg>
  );
};

export default BarGraph;

// ... somewhere else, render it ...
// <BarGraph />
