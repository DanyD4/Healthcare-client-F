import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/health_care_logo.svg";
import styled from "styled-components";
import Logout from "./Logout";
import axios from "axios";

const BookingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LogoContainer = styled.img`
  height: 20rem;
`;

const Title = styled.h2`
  font-size: 22px;
`;

const Text = styled.p`
  font-size: 18px;
`;

function BookingDashboard() {
  const {
    authState: { user },
  } = useAuth();
  const [dateSlots, setDateSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const caregiverId = "6734784598870028bd51e900"; // Hårdkodad caregiverID för att hämta availability

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/availability/caregiver/${caregiverId}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data); 
        setDateSlots(response.data.flatMap(slot => slot.availableSlots)); // Mappar ut tiderna som vi hämtar från en array med hjälp av flatMap.
      } catch (error) {
        console.error("Error fetching available slots:", error);
      }
    };

    fetchAvailableSlots();
  }, []);


  const toggleDateSelection = (slot) => {
    setSelectedDate((prevSelected) => (prevSelected === slot ? null : slot));
  };
  

  const handleBooking = async () => {
    if (!selectedDate) {
      alert("Please select a date!");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments/create`,
        {
          patientId: localStorage.getItem("userId"),
          caregiverId: caregiverId,
          dateTime: selectedDate,
        },
        {
          withCredentials: true, 
        }
      );
      alert("Appointment booked successfully, check your mailbox!");
      setDateSlots((prevSlots) => prevSlots.filter((slot) => slot !== selectedDate));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to book the appointment.");
    }
  };

  return (
    <BookingContainer>
      <LogoContainer src={Logo} />
      <Title>Booking Dashboard</Title>
      <Text>Welcome, {user}!</Text>
      <ul>
        {dateSlots.map((slot, index) => {
          const date = new Date(slot);
          return (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  name="dateSlot"
                  checked={selectedDate === slot}
                  onChange={() => toggleDateSelection(slot)}
                />
                {date.toISOString()} 
              </label>
            </li>
          );
        })}
      </ul>
      <button onClick={handleBooking}>Book Appointment</button>
      <Logout />
    </BookingContainer>
  );
}

export default BookingDashboard;

