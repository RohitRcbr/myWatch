import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function ClockPreview({ userImage, userName }) {
  const secondHandRef = useRef(null);
  const minsHandRef = useRef(null);
  const hourHandRef = useRef(null);
  useEffect(() => {
    const setDate = () => {
      const now = new Date();

      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      if (secondHandRef.current) {
        secondHandRef.current.style.transform = `rotate(${secondsDegrees}deg)`;
      }

      const mins = now.getMinutes();
      const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
      if (minsHandRef.current) {
        minsHandRef.current.style.transform = `rotate(${minsDegrees}deg)`;
      }

      const hour = now.getHours();
      const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
      if (hourHandRef.current) {
        hourHandRef.current.style.transform = `rotate(${hourDegrees}deg)`;
      }
    };

    const intervalId = setInterval(setDate, 1000);
    setDate(); // Call once initially

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <div className="clock">
      <div className="marking marking-four"></div>

      {
        userImage ? (
          <>
            <AnimatePresence mode="wait">
            <motion.div
              key={userImage + userName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="user-img"
            >
              <img
                src={userImage}
                alt={userName}
                className=""
              />
              <h4 className="mt-2 user-name">{userName}</h4>
            </motion.div>
          </AnimatePresence>
            </>
        ) :
          (
            <>
            <div></div>
            </>
          )
      }
      <div className="inner-clock-face">
        <div className="hand hour-hand" ref={hourHandRef}></div>
        <div className="hand min-hand" ref={minsHandRef}></div>
        <div className="hand second-hand" ref={secondHandRef}></div>
      </div>
    </div>
  );
}

export default ClockPreview;
