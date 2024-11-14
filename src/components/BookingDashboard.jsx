import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/health_care_logo.svg";
import styled from "styled-components";
import Logout from "./Logout";
import axios from "axios";
//import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";


const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0rem;
  min-height: 100vh;
  background-color: #f5f8fa;
`;

const LogoContainer = styled.img`
  height: 10rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
`;



const Text = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 2rem;
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 1.5rem 0;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #444;
  margin-bottom: 2rem;
`;

const DateColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const DateList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DateItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;

  label {
    font-size: 16px;
    color: #333;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  padding: 10px 30px;
  background-color: #057d7a;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  text-align: center;
  border: none;

  &:hover {
    background-color: #2fadaa;
    transform: translateY(-3px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
      &.flyttaKnapp {
    display: block;
    align-self: flex-end;
     width: 350px; 
     
  }

`;

function BookingDashboard() {
  const {
    authState: { user },
  } = useAuth();
  const [dateSlots, setDateSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  //const navigate = useNavigate();
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const caregiverId = "6734784598870028bd51e900"; // Hårdkodad caregiverID för att hämta availability.

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/availability/caregiver/${caregiverId}`,
          {
            withCredentials: true,
          }
        );
        setDateSlots(response.data.flatMap(slot => slot.availableSlots));
        
        
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
      //navigate("/user-dashboard")
      setBookingConfirmed(true);
      
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to book the appointment.");
    }
  };

  return (
    <BookingContainer>
      <LogoContainer src={Logo} alt="Health Care Logo" />
      <Title>Booking Dashboard</Title>
      <Text>Welcome, {user}!</Text>

      <SectionContainer>
        <SectionTitle>Please select the time you would like to book a meeting</SectionTitle>
        <DateColumns>
          {[0, 5, 10, 15].map((startIndex) => (
            <DateList key={startIndex}>
              {dateSlots.slice(startIndex, startIndex + 5).map((slot, index) => {
                const date = new Date(slot);
                return (
                  <DateItem key={index}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedDate === slot}
                        onChange={() => toggleDateSelection(slot)}
                      />
                       {date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' })} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </label>
                  </DateItem>
                );
              })}
            </DateList>
          ))}
        </DateColumns>
        
        <StyledButton onClick={handleBooking}>Book Appointment</StyledButton>
        
          {bookingConfirmed && (
          <Link to="/user/dashboard">
             <StyledButton className="flyttaKnapp" as="span">View Scheduled Appointment Here!</StyledButton>
          </Link>
        )}
      </SectionContainer>

      <Logout />
    </BookingContainer>
  );
}

export default BookingDashboard;