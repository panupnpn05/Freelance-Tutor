// components/Calendar.js
import { useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('12:00');

  const renderMonthDropdown = () => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(selectedDate.getFullYear(), i, 1));

    return (
      <select
        className="text-blue-500 bg-white border border-blue-500 px-2 py-1 rounded"
        value={selectedDate.getMonth()}
        onChange={(e) => handleMonthChange(parseInt(e.target.value, 10))}
      >
        {months.map((monthDate, index) => (
          <option key={index} value={index}>
            {monthDate.toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>
    );
  };

  const handleDateClick = (day) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    console.log(`Clicked on ${newDate.toLocaleDateString()}`);
  };

  const handleTimeChange = (e, isStartTime) => {
    const value = e.target.value;
    if (isStartTime) {
      setStartTime(value);
    } else {
      setEndTime(value);
    }
  };

  const handleMonthChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const renderCalendar = () => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    const endDay = lastDayOfMonth.getDate();

    const calendarDays = [];

    for (let i = 0; i < startDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let day = 1; day <= endDay; day++) {
      calendarDays.push(
        <div
          key={day}
          className={`calendar-day ${day === selectedDate.getDate() ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar-container p-4 bg-gray-200 rounded-md">
      <div className="header mb-4 flex justify-between items-center">
        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleMonthChange(-1)}>
          Previous Month
        </button>
        <div className="flex items-center">
          <span
            className="text-xl font-bold cursor-pointer"
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
          >
            {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
          </span>
          {showMonthDropdown && renderMonthDropdown()}
        </div>
        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleMonthChange(1)}>
          Next Month
        </button>
      </div>
      <div className="days-of-week grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-of-week text-center font-bold">{day}</div>
        ))}
      </div>
      <div className="calendar-days grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>
      <div className="time-selection mt-4">
        <label className="mr-2">Start Time:</label>
        <select value={startTime} onChange={(e) => handleTimeChange(e, true)}>
          {/* Add your time options here */}
          <option value="09:00">9:00 AM</option>
          <option value="12:00">12:00 PM</option>
          {/* Add more options as needed */}
        </select>
        <label className="ml-4 mr-2">End Time:</label>
        <select value={endTime} onChange={(e) => handleTimeChange(e, false)}>
          {/* Add your time options here */}
          <option value="12:00">12:00 PM</option>
          <option value="15:00">3:00 PM</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  );
};

export default Calendar;
