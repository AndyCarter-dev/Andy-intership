import { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiryDate));
    }, 1000);

    return () => clearInterval(interval); // cleanup when component unmounts
  }, [expiryDate]);

  if (timeLeft.expired) {
    return <span>Expired</span>;
  }

  return (
    <span>
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
};

function calculateTimeLeft(expiryDate) {
  const difference = new Date(expiryDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { expired: true, hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { expired: false, hours, minutes, seconds };
}

export default Countdown;