// client/src/ClockPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClockPreview from './ClockPreview';
import axios from 'axios';

function ClockPage() {
  const { uniqueName } = useParams();
  const [clockData, setClockData] = useState(null);

  useEffect(() => {
    axios.get(`https://clock-backend-ykc3.onrender.com/api/clock/${uniqueName}`)
      .then(res => setClockData(res.data))
      .catch(() => setClockData(null));
  }, [uniqueName]);
console.log(clockData);
  if (!clockData) return <h3>Clock not found</h3>;

  return (
    <div className="text-center py-4">
      {
        uniqueName ? (
          <ClockPreview userImage={`https://clock-backend-ykc3.onrender.com${clockData.photoUrl}`} userName = {clockData.name} />
        )
        :
        (
          <ClockPreview userImage={`https://rcbrportfolio.netlify.app/images/profile.png`} userName = "Rohit" />
      
        )
      }
     <p className="mt-3 text-muted">Share this link: {window.location.href}</p>
    </div>
  );
}

export default ClockPage;
