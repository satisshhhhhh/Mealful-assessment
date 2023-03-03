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
  const [groupedDataByDate, setGroupedDataByDate] = useState([]);
  const [groupedDataByTime, setGroupedDataByTime] = useState([]);

  useEffect(() => {
    setScheduleData(jsonData);
  }, []);

  useEffect(() => {
    if (scheduleData.length > 0) {
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
      setGroupedDataByDate(dataArray);
    }
  }, [scheduleData]);

  useEffect(() => {
    if (selectedDate) {
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
      setGroupedDataByTime(dataArray);
    }
  }, [selectedDate, scheduleData]);

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
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const groupDataBySlotAndTime = () => {
    if (!selectedDate) {
      return [];
    }
    const selectedData = scheduleData.filter(
      (item) => item.item_date === selectedDate
    );

    const groupedData = selectedData.reduce((accumulator, currentValue) => {
      const scheduleTime = currentValue.schedule_time;
      const slot = currentValue.slot;
      if (!accumulator[scheduleTime]) {
        accumulator[scheduleTime] = { L: 0, D: 0 };
      }
      accumulator[scheduleTime][slot]++;
      return accumulator;
    }, {});

    const dataArray = Object.keys(groupedData).map((time) => {
      return {
        time,
        L: groupedData[time]["L"] || 0,
        D: groupedData[time]["D"] || 0,
      };
    });

    return dataArray;
  };

  return (
    // <div className="container">
    //   <h1 className="title">Customer Scheduling Patterns</h1>
    //   <div>
    //     <h2 className="subtitle">Scheduling by Date</h2>
    //     <ResponsiveContainer width="100%" height={300}>
    //       <BarChart data={groupedDataByDate}>
    //         <CartesianGrid strokeDasharray="3 3" />
    //         <XAxis dataKey="date" />
    //         <YAxis />
    //         <Tooltip />
    //         <Legend />
    //         <Bar
    //           dataKey="count"
    //           fill="#8884d8"
    //           onClick={(data) => handleDateClick(data.date)}
    //         />
    //       </BarChart>
    //     </ResponsiveContainer>
    //   </div>
    //   <div>
    //     <h2 className="subtitle">Scheduling by Time</h2>
    //     {selectedDate && (
    //       <ResponsiveContainer width="100%" height={300}>
    //         <LineChart data={groupedDataByTime}>
    //           <CartesianGrid strokeDasharray="3 3" />
    //           <XAxis dataKey="time" />
    //           <YAxis />
    //           <Tooltip />
    //           <Legend />
    //           <Line dataKey="count" stroke="#8884d8" />
    //         </LineChart>
    //       </ResponsiveContainer>
    //     )}
    //   </div>
    // </div>
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
        <h2 className="subtitle">Scheduling by Time and Slot</h2>
        {selectedDate && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={groupDataBySlotAndTime()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="L" stackId="a" fill="#82ca9d" />
              <Bar dataKey="D" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default App;
