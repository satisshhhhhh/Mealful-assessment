import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const API_URL = "https://www.jsonkeeper.com/b/P2VO";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const App = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios
      .get(CORS_PROXY + API_URL, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000/",
        },
      })
      .then(
        // (response) => console.log(response.data)
        (response) => setScheduleData(response.data)
      )
      .catch((err) => console.error(err));
  }, []);

  const groupDataByDate = () => {
    // Group the scheduleData by item date
    const groupedData = scheduleData.reduce((accumulator, currentValue) => {
      const itemDate = currentValue.item_date;
      if (!accumulator[itemDate]) {
        accumulator[itemDate] = [];
      }
      accumulator[itemDate].push(currentValue);
      return accumulator;
    }, {});

    // Convert the grouped data to an array of objects with date and count properties
    const dataArray = Object.keys(groupedData).map((date) => ({
      date,
      count: groupedData[date].length,
    }));

    return dataArray;
  };

  const groupDataByTime = () => {
    if (!selectedDate) {
      return [];
    }

    // Get the schedule data for the selected date
    const selectedData = scheduleData.filter(
      (item) => item.item_date === selectedDate
    );

    // Group the selectedData by schedule time
    const groupedData = selectedData.reduce((accumulator, currentValue) => {
      const scheduleTime = currentValue.schedule_time;
      if (!accumulator[scheduleTime]) {
        accumulator[scheduleTime] = 0;
      }
      accumulator[scheduleTime]++;
      return accumulator;
    }, {});

    // Convert the grouped data to an array of objects with time and count properties
    const dataArray = Object.keys(groupedData).map((time) => ({
      time,
      count: groupedData[time],
    }));

    return dataArray;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      {/* <div>
        {scheduleData.map((item, index) => (
          <div key={index}>
            <p>Schedule Time: {item.schedule_time}</p>
            <p>Slot: {item.slot}</p>
            <p>Item Date: {item.item_date}</p>
          </div>
        ))}
      </div> */}
      <h1>Customer Scheduling Patterns</h1>
      <div>
        <h2>Scheduling by Date</h2>
        <BarChart width={600} height={300} data={groupDataByDate()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#8884d8"
            onClick={(data) => handleDateClick(data.date)}
          />
        </BarChart>
      </div>
      <div>
        <h2>Scheduling by Time</h2>
        {selectedDate && (
          <LineChart width={600} height={300} data={groupDataByTime()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="count" stroke="#8884d8" />
          </LineChart>
        )}
      </div>
    </>
  );
};

export default App;
