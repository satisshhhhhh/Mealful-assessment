import { useState, useEffect } from "react";
// import axios from "axios";
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
import "./App.css";
import jsonData from "./data.json";

// const API_URL = "https://www.jsonkeeper.com/b/P2VO";
// const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const App = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(
  //       CORS_PROXY + API_URL, {
  //       headers: {
  //         "Access-Control-Allow-Origin": "http://localhost:3000/",
  //       },}z
  //     )
  //     .then(
  //       // (response) => console.log(response.data)
  //       (response) => setScheduleData(response.data)
  //     )
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    setScheduleData(jsonData);
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
      <div className="container">
        {console.log(jsonData)}
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
      </div>
    </>
  );
};

export default App;

// import { useState, useEffect } from "react";
// import {
//   BarChart,  Bar,  XAxis,  YAxis,  CartesianGrid,  Tooltip,  Legend,  LineChart,  Line,  ResponsiveContainer,
// } from "recharts";
// import jsonData from "./data.json";

// const App = () => {
//   const [scheduleData, setScheduleData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     setScheduleData(jsonData);
//   }, []);

//   const groupDataByDate = () => {
//     const groupedData = scheduleData.reduce((accumulator, currentValue) => {
//       const itemDate = currentValue.item_date;
//       if (!accumulator[itemDate]) {
//         accumulator[itemDate] = [];
//       }
//       accumulator[itemDate].push(currentValue);
//       return accumulator;
//     }, {});
//     const dataArray = Object.keys(groupedData).map((date) => ({
//       date,
//       count: groupedData[date].length,
//     }));

//     return dataArray;
//   };

//   const groupDataByTime = () => {
//     if (!selectedDate) {
//       return [];
//     }
//     const selectedData = scheduleData.filter(
//       (item) => item.item_date === selectedDate
//     );

//     const groupedData = selectedData.reduce((accumulator, currentValue) => {
//       const scheduleTime = currentValue.schedule_time;
//       if (!accumulator[scheduleTime]) {
//         accumulator[scheduleTime] = 0;
//       }
//       accumulator[scheduleTime]++;
//       return accumulator;
//     }, {});

//     const dataArray = Object.keys(groupedData).map((time) => ({
//       time,
//       count: groupedData[time],
//     }));

//     return dataArray;
//   };

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Customer Scheduling Patterns</h1>
//       <div>
//         <h2 className="subtitle">Scheduling by Date</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={groupDataByDate()}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar
//               dataKey="count"
//               fill="#8884d8"
//               onClick={(data) => handleDateClick(data.date)}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//       <div>
//         <h2 className="subtitle">Scheduling by Time</h2>
//         {selectedDate && (
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={groupDataByTime()}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="time" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line dataKey="count" stroke="#8884d8" />
//             </LineChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

// import { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   LineChart,
//   Line,
//   ResponsiveContainer,
// } from "recharts";
// import jsonData from "./data.json";

// const App = () => {
//   const [scheduleData, setScheduleData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     setScheduleData(jsonData);
//   }, []);

//   const groupDataByDate = () => {
//     const groupedData = scheduleData.reduce((accumulator, currentValue) => {
//       const itemDate = currentValue.item_date;
//       if (!accumulator[itemDate]) {
//         accumulator[itemDate] = [];
//       }
//       accumulator[itemDate].push(currentValue);
//       return accumulator;
//     }, {});
//     const dataArray = Object.keys(groupedData).map((date) => ({
//       date,
//       count: groupedData[date].length,
//     }));

//     return dataArray;
//   };

//   const groupDataByTime = () => {
//     if (!selectedDate) {
//       return [];
//     }
//     const selectedData = scheduleData.filter(
//       (item) => item.item_date === selectedDate
//     );

//     const groupedData = selectedData.reduce((accumulator, currentValue) => {
//       const scheduleTime = currentValue.schedule_time;
//       if (!accumulator[scheduleTime]) {
//         accumulator[scheduleTime] = 0;
//       }
//       accumulator[scheduleTime]++;
//       return accumulator;
//     }, {});

//     const dataArray = Object.keys(groupedData).map((time) => ({
//       time,
//       count: groupedData[time],
//     }));

//     return dataArray;
//   };

//   const groupDataByHour = () => {
//     if (!selectedDate) {
//       return [];
//     }
//     const selectedData = scheduleData.filter(
//       (item) => item.item_date === selectedDate
//     );

//     const groupedData = selectedData.reduce((accumulator, currentValue) => {
//       const scheduleTime = currentValue.schedule_time;
//       const hour = parseInt(scheduleTime.split(":")[0]);
//       if (!accumulator[hour]) {
//         accumulator[hour] = 0;
//       }
//       accumulator[hour]++;
//       return accumulator;
//     }, {});

//     const dataArray = Array.from({ length: 24 }, (_, i) => ({
//       hour: i,
//       count: groupedData[i] || 0,
//     }));

//     return dataArray;
//   };

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Customer Scheduling Patterns</h1>
//       <div>
//         <h2 className="subtitle">Scheduling by Date</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={groupDataByDate()}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar
//               dataKey="count"
//               fill="#8884d8"
//               onClick={(data) => handleDateClick(data.date)}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//       <div>
//         <h2 className="subtitle">Scheduling by Time</h2>
//         {selectedDate && (
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={groupDataByTime()}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="time" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line dataKey="count" stroke="#8884d8" />
//             </LineChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//       <div>
//         <h2 className="subtitle">Scheduling by Hour</h2>
//         {selectedDate && (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={groupDataByHour()}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="hour" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

// import { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   LineChart,
//   Line,
//   ResponsiveContainer,
// } from "recharts";
// import jsonData from "./data.json";

// const App = () => {
//   const [scheduleData, setScheduleData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     setScheduleData(jsonData);
//   }, []);

//   const groupDataByDate = () => {
//     const groupedData = scheduleData.reduce((accumulator, currentValue) => {
//       const itemDate = currentValue.item_date;
//       const scheduleTime = currentValue.schedule_time;
//       const dateTime = `${itemDate} ${scheduleTime}`;

//       if (!accumulator[itemDate]) {
//         accumulator[itemDate] = {};
//       }

//       if (!accumulator[itemDate][scheduleTime]) {
//         accumulator[itemDate][scheduleTime] = 0;
//       }

//       accumulator[itemDate][scheduleTime]++;

//       return accumulator;
//     }, {});

//     const dates = Object.keys(groupedData);
//     const timeRanges = [
//       "12am - 3am",
//       "3am - 6am",
//       "6am - 9am",
//       "9am - 12pm",
//       "12pm - 3pm",
//       "3pm - 6pm",
//       "6pm - 9pm",
//       "9pm - 12am",
//     ];

//     const dataArray = [];

//     for (const date of dates) {
//       const dateData = { date };

//       for (const timeRange of timeRanges) {
//         const [startTime, endTime] = timeRange.split(" - ");
//         const count = groupedData[date][`${startTime}-${endTime}`] || 0;

//         dateData[timeRange] = count;
//       }

//       dataArray.push(dateData);
//     }

//     return dataArray;
//   };

//   const groupDataByTime = () => {
//     if (!selectedDate) {
//       return [];
//     }
//     const selectedData = scheduleData.filter(
//       (item) => item.item_date === selectedDate
//     );

//     const groupedData = selectedData.reduce((accumulator, currentValue) => {
//       const scheduleTime = currentValue.schedule_time;
//       if (!accumulator[scheduleTime]) {
//         accumulator[scheduleTime] = 0;
//       }
//       accumulator[scheduleTime]++;
//       return accumulator;
//     }, {});

//     const dataArray = Object.keys(groupedData).map((time) => ({
//       time,
//       count: groupedData[time],
//     }));

//     return dataArray;
//   };

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Customer Scheduling Patterns</h1>
//       <div>
//         <h2 className="subtitle">Scheduling by Date</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={groupDataByDate()}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="12am - 3am" stackId="a" fill="#8884d8" />
//             <Bar dataKey="3am - 6am" stackId="a" fill="#82ca9d" />
//             <Bar dataKey="6am - 9am" stackId="a" fill="#ffc658" />
//             <Bar dataKey="9am - 12pm" stackId="a" fill="#ff7300" />
//             <Bar dataKey="12pm - 3pm" stackId="a" fill="#00bfff" />
//             <Bar dataKey="3pm - 6pm" stackId="a" fill="#008000" />
//             <Bar dataKey="6pm - 9pm" stackId="a" fill="#ff0000" />
//             <Bar dataKey="9pm - 12am" stackId="a" fill="#800080" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//       <div>
//         <h2 className="subtitle">Scheduling by Time</h2>
//         {selectedDate && (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={groupDataByTime()}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="time" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
