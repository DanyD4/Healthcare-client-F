/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableTimes = ({ caregiverId }) => {
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    // Hämta tillgängliga tider från backend
    axios.get(`/api/auth/caregivers/${caregiverId}/availability`)
      .then(response => {
        setTimes(response.data);
      })
      .catch(error => {
        console.error('Error fetching availability:', error);
      });
  }, [caregiverId]);

  const handleBooking = (time) => {
    // Skicka bokningsförfrågan till backend
    axios.post('/api/auth/appointments', { time })
      .then(response => {
        alert('Bokning slutförd!');
        // Uppdatera tillgängliga tider
        setTimes(times.filter(t => t.id !== time.id));
      })
      .catch(error => {
        console.error('Error booking appointment:', error);
      });
  };

  return (
    <div>
      <h2>Tillgängliga tider</h2>
      <ul>
        {times.map((time, index) => (
          <li key={index}>
            <button onClick={() => handleBooking(time)}>
              {time.availableSlots}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableTimes;*/
