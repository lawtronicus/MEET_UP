import { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter(
        (event) => event.location === location,
      ).length;

      let city = location;

      if (location.includes(" - ")) {
        city = location.split(" - ")[0];
      } else if (location.includes(", ")) {
        const parts = location.split(", ");
        if (parts.length === 2) {
          city = parts[0];
        } else if (parts.length === 3 && parts[1].length <= 3) {
          // Handle cases like "Toronto, ON, Canada" or "New York, NY, USA"
          city = parts[0];
        } else if (parts.length === 3) {
          // Handle cases like "Santiago, Santiago Metropolitan Region, Chile"
          city = parts[0];
        } else {
          // For safety, fallback to the first part
          city = parts[0];
        }
      } else if (location.includes(",")) {
        city = location.split(",")[0];
      } else if (location.includes(" ")) {
        city = location.split(" ")[0]; // Use first word as city name if no other delimiter
      }

      return { city, count };
    });
    return data;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="category"
          dataKey="city"
          name="City"
          angle={60}
          interval={0}
          tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
        <YAxis
          type="number"
          dataKey="count"
          name="Number of events"
          allowDecimals={false}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Events" data={data} fill="#1c7488" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
