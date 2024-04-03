import { useState, useEffect } from 'react';
import { format, parse } from 'date-fns';

const TimeRangePicker = ({ onStartTimeChange, onEndTimeChange, startDefTime, endDefTime }) => {
  const [startTime, setStartTime] = useState(startDefTime ? parse(startDefTime, 'HH:mm', new Date()) : null);
  const [endTime, setEndTime] = useState(endDefTime ? parse(endDefTime, 'HH:mm', new Date()) : null);

  const handleStartTimeChange = (newTime) => {
    setStartTime(newTime);
    onStartTimeChange(newTime);
  };

  const handleEndTimeChange = (newTime) => {
    setEndTime(newTime);
    onEndTimeChange(newTime);
  };

  return (
    <div className=''>
      <label>Start Time:</label>
      <input
        type="time"
        className="w-full text-center text-lg px-4 py-2 border border-gray-300 focus:outline-none rounded-full focus:border-blue-500"
        placeholder={!startTime ? "Please pick start time" : ""}
        onChange={(e) => {
          const newTime = parse(e.target.value, 'HH:mm', new Date());
          handleStartTimeChange(newTime);
        }}
        value={startTime ? format(startTime, 'HH:mm') : ''}
      />

      <label>End Time:</label>
      <input
        type="time"
        className="w-full text-center text-lg px-4 py-2 border border-gray-300 focus:outline-none rounded-full focus:border-blue-500"
        placeholder={!endTime ? "Please pick end time" : ""}
        onChange={(e) => {
          const newTime = parse(e.target.value, 'HH:mm', new Date());
          handleEndTimeChange(newTime);
        }}
        value={endTime ? format(endTime, 'HH:mm') : ''}
      />
    </div>
  );
};

export default TimeRangePicker;
