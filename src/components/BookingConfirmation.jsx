// BookingConfirmation.jsx
import React from "react";
import styled from "styled-components";

const ConfirmationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
`;

const ConfirmationMessage = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-top: 10px;
`;

const CloseButton = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  background-color: #057d7a;
  border-radius: 10px;
  font-size: 16px;
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

const BookingConfirmation = ({ onClose }) => (
  <ConfirmationContainer>
    <h2>Booking Confirmation</h2>
    <ConfirmationMessage>Your booking has been successfully confirmed!</ConfirmationMessage>
    <CloseButton onClick={onClose}>Close</CloseButton>
  </ConfirmationContainer>
);

export default BookingConfirmation;
