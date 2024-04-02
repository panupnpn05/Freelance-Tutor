import React, { useState, useEffect } from 'react';
import { parse, format } from 'date-fns';


const WeekEditor = () => {
  const initialData = {
    Sunday: {
      startTime: "16:00",
      endTime: "18:00"
    },
    Monday: false,
    Tuesday: {
      startTime: "10:00",
      endTime: "11:00"
    },
    Wednesday: false,
    Thursday: false,
    Friday: {
      startTime: "14:00",
      endTime: "15:00"
    },
    Saturday: false
  };

  const [schedule, setSchedule] = useState(initialData);
  const [editedDay, setEditedDay] = useState(null);
  const [editedStartTime, setEditedStartTime] = useState('');
  const [editedEndTime, setEditedEndTime] = useState('');

  const handleDayClick = (day) => {
    if (!schedule[day]) {
      setEditedDay(day);
      setEditedStartTime('00:00');
      setEditedEndTime('00:00');
    }
  };

  const handleStartTimeChange = (time) => {
    if (editedDay) {
      // Parse the time string into a Date object
      const parsedTime = parse(time, 'HH:mm', new Date());
  
      // Format the parsed time back to a time string in the desired format
      const formattedTime = format(parsedTime, 'HH:mm');
  
      setSchedule(prevSchedule => ({
        ...prevSchedule,
        [editedDay]: {
          ...prevSchedule[editedDay],
          startTime: formattedTime
        }
      }));
    }
  };
  
  const handleEndTimeChange = (time) => {
    if (editedDay) {
      setSchedule(prevSchedule => ({
        ...prevSchedule,
        [editedDay]: {
          ...prevSchedule[editedDay], // Preserve existing data for the day
          endTime: time // Update endTime
        }
      }));
    }
  };
  

  const handleSaveChanges = () => {
    if (editedDay) {
      setSchedule(prevSchedule => ({
        ...prevSchedule,
        [editedDay]: {
          startTime: editedStartTime,
          endTime: editedEndTime
        }
      }));
      setEditedDay(null);
      setEditedStartTime('');
      setEditedEndTime('');
    }
  };

  console.log(schedule)
  return (
    <div>
      <h1>Week Editor</h1>
      <div>
        {Object.keys(schedule).map(day => (
          <div key={day}>
            <span>{day}</span>
            {schedule[day] ? (
              <span>{schedule[day].startTime} - {schedule[day].endTime}</span>
            ) : (
              <button onClick={() => handleDayClick(day)}>Edit</button>
            )}
          </div>
        ))}
      </div>
      {editedDay && (
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            value={editedStartTime}
            onChange={(e) => handleStartTimeChange(e.target.value)}
          />
          <label>End Time:</label>
          <input
            type="time"
            value={editedEndTime}
            onChange={(e) => handleEndTimeChange(e.target.value)}
          />
          <button onClick={handleSaveChanges}>Save</button>
        </div>
      )}
    </div>
  );
};

export default WeekEditor;
