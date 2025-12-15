import { useState, useEffect } from 'react';

export default function GrandOpeningBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [isOpen, setIsOpen] = useState(true);

  const grandOpeningDate = new Date('2025-12-18T00:00:00').getTime();

  const calculateTime = () => {
    const now = new Date().getTime();
    const distance = grandOpeningDate - now;

    if (distance < 0) {
      setIsOpen(false);
      return;
    }

    setTimeLeft({
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    });
  };

  useEffect(() => {
    // Calculate immediately on mount
    calculateTime();
    
    // Then update every minute
    const timer = setInterval(calculateTime, 60000);

    return () => clearInterval(timer);
  }, []);

  if (!isOpen) {
    return null;
  }

  const timeText = timeLeft.days > 0 
    ? `${timeLeft.days} days to go`
    : timeLeft.hours > 0
    ? `${timeLeft.hours} hours to go`
    : `${timeLeft.minutes} minutes to go`;

  return (
    <div className="bg-red-600 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto text-center text-xs sm:text-sm">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
          <span className="font-medium">Grand Opening December 18, 2025</span>
          <span className="text-gray-200 hidden sm:inline">•</span>
          <span className="text-gray-200">
            {timeText}
          </span>
        </div>
      </div>
    </div>
  );
}

