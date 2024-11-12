import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/health_care_logo.svg";
import styled from "styled-components";
import Logout from "./Logout";
import axios from "axios";
// admin page, can only visit if you have role ADMIN
const AdminContainer = styled.div`
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

const availableSlots = [
  new Date("2024-12-01T10:00:00Z"),
  new Date("2024-12-02T15:00:00Z"),
  new Date("2024-12-03T09:00:00Z"),
];

function AdminDashboard() {
  const {
    authState: { user },
  } = useAuth();
  const [users, setUsers] = useState([]);
  const [dateSlots, setDateSlots] = useState(availableSlots);
  const [selectedDates, setSelectedDates] = useState([]);

  // skapa en availability
  // hämta userId från localStorage
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
        {
          withCredentials: true,
        }
      );
      alert("SUCCESS!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleDateSelection = (date) => {
    setSelectedDates((prevSelected) => {
      if (prevSelected.includes(date)) {
        // ta bort datumet om det redan är valt
        return prevSelected.filter((d) => d !== date);
      } else {
        // lägg till datumet om det inte redan är valt
        return [...prevSelected, date];
      }
    });
  };

  return (
    <AdminContainer>
      <LogoContainer src={Logo} />
      <Title>Admin Dashboard</Title>
      <Text>Welcome, {user}!</Text>
      <ul>
        {dateSlots.map((date, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedDates.includes(date)}
                onChange={() => toggleDateSelection(date)}
              />
              {date.toDateString()}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleAvailability}>Send</button>
      <Logout />
    </AdminContainer>
  );
}

export default AdminDashboard;
