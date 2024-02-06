// components/Calendar.js
import { useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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
          className={`calendar-day py-1 border border-black m-1 cursor-pointer  ${day === selectedDate.getDate() ? ' text-red-600' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };


  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

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
    setSelectedDate(newDate);
    console.log(newDate)
  };

  const handleMonthChange = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  return (
    <div className="calendar-container p-4 bg-gray-200 rounded-md w-1/2">
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
      <div className="days-of-week grid grid-cols-7 gap-1 mb-2 bg-green-300">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-of-week text-center font-bold">{day}</div>
        ))}
      </div>
      <div className="calendar-days grid grid-cols-7 text-center">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;