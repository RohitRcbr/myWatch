// client/src/RotatingFallbackClock.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClockPreview from './ClockPreview';

const fallbackClocks = [
  {
    userImage: 'https://rcbrportfolio.netlify.app/images/profile.png',
    userName: 'Rohit',
  },
  {
    userImage: 'https://marifportfolio.netlify.app/assets/img/webdesigner/arifabout.png',
    userName: 'Arif',
  }
];

function RotatingFallbackClock() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % fallbackClocks.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentClock = fallbackClocks[index];

  return (
   <>
    <div className='text-center'>
      <Link to="/" className="btn btn-outline-primary mt-2">
    Create Your Own Clock
  </Link>
  </div>
    <div className="text-center py-4">
      <ClockPreview
        userImage={currentClock.userImage}
        userName={currentClock.userName}
      />
    </div>
   </>
  );
}

export default RotatingFallbackClock;
