import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, addDays, isSameMonth, isSameDay, addDays as addDaysFn } from 'date-fns';

const CustomCalendar = ({onSelect}) => {
 const [currentMonth, setCurrentMonth] = useState(new Date());
 const [selectedDate, setSelectedDate] = useState(null);
 const [unavailableDates, setUnavailableDates] = useState([]);

 useEffect(() => {
    // Calculate the next two days from the current date
    const today = new Date();
    const nextTwoDays = [addDaysFn(today, 1), addDaysFn(today, 2)];
    setUnavailableDates(nextTwoDays);
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
    // Check if the clicked date is within the next two days or a past day
    const isNextTwoDays = unavailableDates.some(unavailableDate => isSameDay(date, unavailableDate));
    const isPastDay = date < new Date();
    if (!isNextTwoDays && !isPastDay) {
      setSelectedDate(date);
      onSelect(date);
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
                {week.map((date) => {
                 const isNextTwoDays = unavailableDates.some(unavailableDate => isSameDay(date, unavailableDate));
                 const isPastDay = date < new Date();
                 return (
                    <td
                      key={date.toString()}
                      onClick={() => handleDateClick(date)}
                      className={`p-2 cursor-pointer ${
                        !isSameMonth(date, currentMonth) ? 'text-gray-400' : ''
                      } ${
                        isNextTwoDays ? 'bg-gray-400 text-white cursor-not-allowed' : ''
                      } ${
                        isPastDay ? 'bg-gray-400 text-white cursor-not-allowed' : ''
                      } ${
                        isSameDay(date, selectedDate) ? 'bg-blue-500 text-white' : ''
                      }`}
                    >
                      {format(date, 'd')}
                    </td>
                 );
                })}
              </tr>
            ))}
          </tbody>
        </table>   
      </div>
    </>
 );
};

export default CustomCalendar;
