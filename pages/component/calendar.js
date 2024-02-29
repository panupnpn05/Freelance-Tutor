// CustomCalendar.js
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, addDays, isSameMonth, isSameDay } from 'date-fns';

const CustomCalendar = ({onSelect}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_UNVAILABLE_DATES);
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

  const handleDateClick = (date) => {
    if (date >= new Date()) {
      setSelectedDate(date);
      onSelect(date)
      console.log('Clicked Date:', format(date, 'ddMMyyyy'));
    }
  };


  return (
    <>
    <div className="custom-calendar text-center border bg-gray-50 rounded-xl overflow-hidden">
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
                  className={`p-2 rounded-md cursor-pointer ${
                    !isSameMonth(date, currentMonth) ? 'text-gray-400' : ''
                  } ${
                    unavailableDates.some((unavailableDate) => isSameDay(date, unavailableDate)) ? 'bg-red-500 text-white' : ''
                  } ${
                    isSameDay(date, selectedDate) ? 'bg-blue-500 text-white' : ''
                  } ${
                    date < startOfMonth(currentMonth) ? 'text-gray-400 cursor-not-allowed' : ''
                  }`}
                >
                  {format(date, 'd')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>   
    </div>
      </>
  );
};

export default CustomCalendar;
