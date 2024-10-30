// Booking.jsx
import React, { useState } from "react";
import styled from "styled-components";
import BookingConfirmation from "./BookingConfirmation"; // Importera BookingConfirmation


//styling
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


const BookButton = styled.button`
  cursor: pointer;
  padding: 10px 30px;
  background-color: #057d7a;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
  border: none;


  &:hover {
    background-color: #2fadaa;
    transform: translateY(-3px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
`;


const Booking = () => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    appointmentDate: "",
    appointmentType: "General Checkup",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleBooking = (e) => {
    e.preventDefault();
    // Lägg logik för att skicka bokningsdata till en server
    setIsConfirmationVisible(true); // Visa bekräftelsen efter bokning
  };


  const closeConfirmation = () => setIsConfirmationVisible(false);


  return (
    <BookingContainer>
      <Title>Book an Appointment</Title>
      <FormWrapper onSubmit={handleBooking}>
        <label>Patient Name</label>
        <StyledInput
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleInputChange}
          required
        />
       
        <label>Appointment Date</label>
        <StyledInput
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleInputChange}
          required
        />
       
        <label>Appointment Type</label>
        <StyledSelect
          name="appointmentType"
          value={formData.appointmentType}
          onChange={handleInputChange}
        >
          <option value="General Checkup">General Checkup</option>
          <option value="Specialist Consultation">Specialist Consultation</option>
          <option value="Follow-up">Follow-up</option>
        </StyledSelect>
       
        <BookButton type="submit">Book Now</BookButton>
      </FormWrapper>

      {isConfirmationVisible && <BookingConfirmation onClose={closeConfirmation} />}
    </BookingContainer>
  );
};


export default Booking;


