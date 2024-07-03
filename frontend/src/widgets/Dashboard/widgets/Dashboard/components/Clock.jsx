import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 24;
    hours = hours < 10 ? "0" + hours : hours;
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;
    const strSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${strMinutes}:${strSeconds} ${ampm}`;
  };

  return (
    <div className="flex items-center justify-center">
      <span className="text-2xl font-medium clock">{formatTime(time)}</span>
    </div>
  );
}

export default Clock;
