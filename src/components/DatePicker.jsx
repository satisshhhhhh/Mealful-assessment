import React from "react";

const DatePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <div>
      <label className="date-picker-container">Select date:</label>
      <input
        type="date"
        id="date-picker"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;
