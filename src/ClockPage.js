// client/src/ClockPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClockPreview from './ClockPreview';
import axios from 'axios';

function ClockPage() {
  const { uniqueName } = useParams();
  const [clockData, setClockData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/clock/${uniqueName}`)
      .then(res => setClockData(res.data))
      .catch(() => setClockData(null));
  }, [uniqueName]);
console.log(clockData);
  if (!clockData) return <h3>Clock not found</h3>;

  return (
    <div className="text-center py-4">
      <ClockPreview userImage={`http://localhost:5000${clockData.photoUrl}`} userName = {clockData.name} />
      <p className="mt-3 text-muted">Share this link: {window.location.href}</p>
    </div>
  );
}

export default ClockPage;
