// CreateAvailability.jsx
import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;


const defaultTimes = ["09:00", "11:00", "13:00", "15:00"];

const CreateAvailability = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (date) => {
   
    const dateIndex = selectedDates.findIndex((d) => d.getTime() === date.getTime());
    if (dateIndex === -1) {
      setSelectedDates([...selectedDates, date]); 
    } else {
      setSelectedDates(selectedDates.filter((_, i) => i !== dateIndex)); 
    }
  };

  const handleSaveAvailability = async () => {
    try {
      
      const availabilityData = selectedDates.map((date) => ({
        date: date.toISOString().split("T")[0],
        times: defaultTimes, 
      }));

      const response = await axios.post("http://localhost:8080/api/auth/availability", {
        caregiverId: "specificCaregiverId", 
        availabilityData,
      });
      console.log("Availability saved successfully:", response.data);
    } catch (error) {
      console.error("Failed to save availability:", error);
    }
  };

  return (
    <Container>
      <Title>Create Availability</Title>
      <Calendar
        onClickDay={handleDateChange}
        tileClassName={({ date }) =>
          selectedDates.some((d) => d.getTime() === date.getTime()) ? "selected" : null
        }
      />

      <div>
        <h3>Selected Availability</h3>
        <p>Selected Dates:</p>
        <ul>
          {selectedDates.map((date, index) => (
            <li key={index}>{date.toDateString()}</li>
          ))}
        </ul>
        <p>Available Times:</p>
        <ul>
          {defaultTimes.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      </div>

      <SaveButton onClick={handleSaveAvailability}>Save Availability</SaveButton>
    </Container>
  );
};

export default CreateAvailability;
