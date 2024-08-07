// src/components/Timer.js
import React, { useState, useEffect } from 'react';

const Timer = ({ time, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    setTimeLeft(time); // Reset the timer when the time prop changes
  }, [time]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  return <div>Time left: {timeLeft} seconds</div>;
};

export default Timer;
