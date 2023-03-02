import { useState, useEffect } from "react";
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
  ResponsiveContainer,
} from "recharts";
import jsonData from "./data.json";

const App = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setScheduleData(jsonData);
  }, []);

  const groupDataByDate = () => {
    const groupedData = scheduleData.reduce((accumulator, currentValue) => {
      const itemDate = currentValue.item_date;
      if (!accumulator[itemDate]) {
        accumulator[itemDate] = [];
      }
      accumulator[itemDate].push(currentValue);
      return accumulator;
    }, {});
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
    const selectedData = scheduleData.filter(
      (item) => item.item_date === selectedDate
    );

    const groupedData = selectedData.reduce((accumulator, currentValue) => {
      const scheduleTime = currentValue.schedule_time;
      if (!accumulator[scheduleTime]) {
        accumulator[scheduleTime] = 0;
      }
      accumulator[scheduleTime]++;
      return accumulator;
    }, {});

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
    <div className="container">
      <h1 className="title">Customer Scheduling Patterns</h1>
      <div>
        <h2 className="subtitle">Scheduling by Date</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={groupDataByDate()}>
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
        </ResponsiveContainer>
      </div>
      <div>
        <h2 className="subtitle">Scheduling by Time</h2>
        {selectedDate && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={groupDataByTime()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default App;