// Booking.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BookingConfirmation from "./BookingConfirmation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 


const CalendarContainer = styled.div`
  .booked {
    background-color: #f8d7da !important;
    color: #721c24;
  }
`;

const BookingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const TimeList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
`;

const TimeItem = styled.li`
  padding: 10px;
  background-color: ${(props) => (props.selected ? "#057d7a" : "#fafafa")};
  color: ${(props) => (props.selected ? "#fff" : "#333")};
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 5px 0;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #2fadaa;
    color: #fff;
  }
`;

const BookButton = styled.button`
  cursor: pointer;
  padding: 10px 30px;
  background-color: #057d7a;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  border: none;

  &:hover {
    background-color: #2fadaa;
    transform: translateY(-3px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const StyledInput = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fafafa;

  &:focus {
    outline: none;
    border-color: #057d7a;
  }
`;

const StyledSelect = styled.select`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fafafa;

  &:focus {
    outline: none;
    border-color: #057d7a;
  }
`;


const Booking = () => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    appointmentDate: null,
    appointmentTime: null,
    appointmentType: "General Checkup",
  });
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  // testdata för att se hur det ser ut när tider är tillgängliga för bookning
  const generateAvailableDates = () => {
    return [
      // 1-4 oktober
      { date: new Date(2024, 9, 1), times: ["09:00", "11:00", "13:00", "15:00"] },
      { date: new Date(2024, 9, 2), times: ["09:00", "11:00", "13:00", "15:00"] },
      { date: new Date(2024, 9, 3), times: ["09:00", "11:00", "13:00", "15:00"] },
      { date: new Date(2024, 9, 4), times: ["09:00", "11:00", "13:00", "15:00"] },
  
      //  7-11 oktober
      { date: new Date(2024, 9, 7), times: ["09:00", "11:00", "13:00", "15:00"] },
      { date: new Date(2024, 9, 8), times: ["09:00", "11:00", "13:00", "15:00"] },
      { date: new Date(2024, 9, 9), times: ["09:00", "11:00", "13:00", "15:00"] },
      { date: new Date(2024, 9, 10), times: ["09:00", "11:00", "13:00", "15:00"] },
      { date: new Date(2024, 9, 11), times: ["09:00", "11:00", "13:00", "15:00"] },
  
      // 14-18 oktober
      { date: new Date(2024, 9, 14), times: ["09:00", "11:00", "13:00", "15:00"] },
      { date: new Date(2024, 9, 15), times: ["09:00", "11:00", "13:00", "15:00"] },
      { date: new Date(2024, 9, 16), times: [] },
      { date: new Date(2024, 9, 17), times: [] },
      { date: new Date(2024, 9, 18), times: ["09:00", "11:00"] },

      //  21-25 oktober
    { date: new Date(2024, 9, 21), times: ["09:00", "11:00", "13:00", "15:00"] },
    { date: new Date(2024, 9, 22), times: ["09:00", "11:00", "13:00", "15:00"] },
    { date: new Date(2024, 9, 23), times: ["09:00", "11:00", "13:00", "15:00"] },
    { date: new Date(2024, 9, 24), times: ["09:00", "11:00", "13:00", "15:00"] },
    { date: new Date(2024, 9, 25), times: ["09:00", "11:00", "13:00", "15:00"] },
  
     
      { date: new Date(2024, 9, 28), times: [] },
      { date: new Date(2024, 9, 29), times: ["13:00", "15:00"] },
      { date: new Date(2024, 9, 30), times: ["09:00",] },
  
    
      { date: new Date(2024, 9, 31), times: ["13:00", "15:00", "17:00"] }, // Tillgängliga tider den 31 oktober
      { date: new Date(2024, 10, 1), times: [] }, // 1 november är fullbokad (visas i rött)
    ];
  };

  useEffect(() => {
    setAvailableDates(generateAvailableDates());
  }, []);

  // Hantering av datumval för att endast visa lediga tider
  const handleDateChange = (date) => {
    setFormData({ ...formData, appointmentDate: date });

    // Hämta endast lediga tider för valt datum
    const selectedDate = availableDates.find((d) => d.date.getTime() === date.getTime());
    if (selectedDate) {
      setAvailableTimes(selectedDate.times);
    } else {
      setAvailableTimes([]);
    }
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, appointmentTime: time });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsConfirmationVisible(true);
  };

  const closeConfirmation = () => setIsConfirmationVisible(false);

  // Markera dagar baserat på fullbokning så dom blir röda 
  const tileClassName = ({ date }) => {
    const day = availableDates.find((d) => d.date.getTime() === date.getTime());
    return day && day.times.length === 0 ? "booked" : null;
  };

  return (
    <BookingContainer>
      <Title>Book an Appointment</Title>

      <CalendarContainer>
        <Calendar
          onChange={handleDateChange}
          tileClassName={tileClassName}
        />
      </CalendarContainer>

      {/* Visa tillgängliga tider när ett datum är valt */}
      {formData.appointmentDate && (
        <div>
          <h3>Available Times on {formData.appointmentDate.toDateString()}</h3>
          {availableTimes.length > 0 ? (
            <TimeList>
              {availableTimes.map((time) => (
                <TimeItem
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  selected={formData.appointmentTime === time}
                >
                  {time}
                </TimeItem>
              ))}
            </TimeList>
          ) : (
            <p>No available times this day</p>
          )}
        </div>
      )}

      <FormWrapper onSubmit={handleBooking}>
        <label>Patient Name</label>
        <StyledInput
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
          required
        />

        <label>Appointment Type</label>
        <StyledSelect
          name="appointmentType"
          value={formData.appointmentType}
          onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
        >
          <option value="General Checkup">General Checkup</option>
          <option value="Specialist Consultation">Specialist Consultation</option>
          <option value="Follow-up">Follow-up</option>
        </StyledSelect>

        <BookButton type="submit" disabled={!formData.appointmentTime}>
          Book Now
        </BookButton>
      </FormWrapper>

      {isConfirmationVisible && <BookingConfirmation onClose={closeConfirmation} />}
    </BookingContainer>
  );
};

export default Booking;
