import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/health_care_logo.svg";
import styled from "styled-components";
import Logout from "./Logout";
import axios from "axios";




const AdminContainer = styled.div`
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


const LoginButton = styled.button`
  cursor: pointer;
  padding: 10px 30px;
  background-color: #057d7a;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-top: 40px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
  text-align: center;
  border: none;


  &:hover {
    background-color: #2fadaa;
    transform: translateY(-3px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
`;


const generateDecemberWeekdays = () => {
  const dates = [];
  const year = 2024;
  const month = 11;


  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
 
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      dates.push(date);
    }
  }


  return dates;
};




function AdminDashboard() {
  const {
    authState: { user },
  } = useAuth();




  const [dateSlots] = useState(generateDecemberWeekdays());
  const [selectedDates, setSelectedDates] = useState([]);
  const caregiverId = localStorage.getItem("userId");


  const handleAvailability = async () => {
    const formattedDates = selectedDates.map((date) => date.toISOString());
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/availability/create`,
        {
          caregiverId: caregiverId,
          availableSlots: formattedDates,
        },
        { withCredentials: true }
      );
      alert("Availability Submitted!");
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const toggleDateSelection = (date) => {
    setSelectedDates((prevSelected) =>
      prevSelected.includes(date)
        ? prevSelected.filter((d) => d !== date)
        : [...prevSelected, date]
    );
  };


  return (
    <AdminContainer>
      <LogoContainer src={Logo} alt="Health Care Logo" />
      <Title>Profile Page</Title>
      <Text>Welcome, {user}!</Text>


      <SectionContainer>
        <SectionTitle>Which dates in December would you like to be available?</SectionTitle>
        <DateColumns>
          {[0, 5, 10, 15].map((startIndex) => (
            <DateList key={startIndex}>
              {dateSlots.slice(startIndex, startIndex + 5).map((date, index) => (
                <DateItem key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedDates.includes(date)}
                      onChange={() => toggleDateSelection(date)}
                    />
                     {date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' })} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </label>
                </DateItem>
              ))}
            </DateList>
          ))}
        </DateColumns>
        <LoginButton onClick={handleAvailability}>Submit Availability</LoginButton>
      </SectionContainer>


      <LoginButton as={Logout} />
    </AdminContainer>
  );
}


export default AdminDashboard;


