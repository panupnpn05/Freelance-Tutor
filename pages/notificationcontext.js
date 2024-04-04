// NotificationContext.js
import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
 const [notifications, setNotifications] = useState([]);

 const addNotification = (message) => {
    setNotifications([...notifications, message]);
 };

 return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
 );
};
