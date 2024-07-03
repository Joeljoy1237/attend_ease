import React, { useState, useEffect } from 'react';

function DateComponent() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const day = date.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()]; // Get month name
    const year = date.getFullYear();
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const dayName = days[date.getDay()];

    return `${day < 10 ? "0" + day : day} ${month} ${year} (${dayName})`;
  };

  return (
    <div className="flex items-center justify-center">
      <span className="text-2xl font-medium">{formatDate(time)}</span>
    </div>
  );
}

export default DateComponent;
