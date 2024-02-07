// CustomCalendar.js
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, addDays, isSameMonth, isSameDay } from 'date-fns';
import TimePicker from 'react-time-picker';

const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState('12:00');
  const [selectedEndTime, setSelectedEndTime] = useState('13:00');
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/unavailable-dates');
        const data = await response.json();

        if (response.ok) {
          setUnavailableDates(data.unavailableDates.map(dateStr => new Date(dateStr)));
        } else {
          console.error('Error fetching unavailable dates:', data.error);
        }
      } catch (error) {
        console.error('Error fetching unavailable dates:', error);
      }
    };

    fetchUnavailableDates();
  }, []);

  const weeksInMonth = (month) => {
    const firstDay = startOfWeek(startOfMonth(month));
    const lastDay = endOfWeek(endOfMonth(month));
    const startDate = firstDay;
    const endDate = lastDay;

    const weeks = [];
    let currentDay = startDate;

    while (currentDay <= endDate) {
      const week = Array(7)
        .fill(0)
        .map(() => {
          const day = currentDay;
          currentDay = addDays(currentDay, 1);
          return day;
        });

      weeks.push(week);
    }

    return weeks;
  };

  const formatTime = (time) => {
    return format(time, 'H:mm');
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleApplyClick = () => {
    const startTime = new Date(`${selectedDate.toISOString().split('T')[0]}T${selectedStartTime}`);
    const endTime = new Date(`${selectedDate.toISOString().split('T')[0]}T${selectedEndTime}`);
    const durationHours = (endTime - startTime) / (1000 * 60 * 60);

    console.log('Selected Date:', format(selectedDate, 'MMMM d, yyyy'));
    console.log('Start Time:', formatTime(startTime));
    console.log('End Time:', formatTime(endTime));
    console.log('Duration:', durationHours, 'hours');
  };

  return (
    <>
    <div className="custom-calendar text-center">
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <button className="text-white" onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>{'<'}</button>
        <h1 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h1>
        <button className="text-white" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>{'>'}</button>
      </header>

      <table className="table-auto w-full">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <th key={day} className="p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeksInMonth(currentMonth).map((week, index) => (
            <tr key={index}>
              {week.map((date) => (
                <td
                  key={date.toString()}
                  onClick={() => handleDateClick(date)}
                  className={`p-2 cursor-pointer ${
                    !isSameMonth(date, currentMonth) ? 'text-gray-400' : ''
                  } ${unavailableDates.some((unavailableDate) => isSameDay(date, unavailableDate)) ? 'bg-red-500 text-white' : ''}`}
                >
                  {format(date, 'd')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>   
    </div>
    {selectedDate && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Time:</label>
          <div className="relative">
            <TimePicker
              value={selectedStartTime}
              onChange={setSelectedStartTime}
            />
          </div>
          <label className="block text-sm font-medium text-gray-700 mt-2 mb-2">End Time:</label>
          <div className="relative">
            <TimePicker
              value={selectedEndTime}
              onChange={setSelectedEndTime}
              className="w-full text-base px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleApplyClick}>
            Apply
          </button>
        </div>
      )}
      </>
  );
};

export default CustomCalendar;
