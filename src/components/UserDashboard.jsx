import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/health_care_logo.svg";
import styled from "styled-components";
import Logout from "./Logout";
import axios from "axios";


const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
   padding: 0rem 2rem 2rem 2rem; 
`;
const LogoutButton = styled(Logout)`
  margin-bottom: 2rem; /* Justera detta värde efter behov */
`;

const LogoContainer = styled.img`
  height: 20rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 2rem;
`;

const UpcomingMeetingsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 0rem;
`;

const MeetingTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #444;
  margin-bottom: 1rem;
`;

const MeetingItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
`;


const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

function UserDashboard() {
  const [userProfile, setUserProfile] = useState("");
  const [appointments, setAppointments] = useState([]);
  const {
    authState: { user },
  } = useAuth();

  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/check`,
          {
            withCredentials: true,
          }
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/appointments/patient/${loggedInUserId}`,
          {
            withCredentials: true,
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching user appointments:", error);
      }
    };

    fetchAllAppointments();
  }, []);

  return (
    <UserContainer>
      <LogoContainer src={Logo} alt="Health Care Logo" />
      <Title>User Dashboard</Title>
      <Text>Welcome, {userProfile.username}!</Text>

      <UpcomingMeetingsContainer>
        <MeetingTitle>Upcoming Meetings</MeetingTitle>
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            const date = new Date(appointment.localDateTime);
            return (
              <MeetingItem key={appointment.id}>
                <span>{formatDate(date)}</span>
                <span>{formatTime(date)}</span>
              </MeetingItem>
            );
          })
        ) : (
          <p>No upcoming meetings scheduled.</p>
        )}
      </UpcomingMeetingsContainer>  
      

     

      <Logout />
    </UserContainer>
  );
}

export default UserDashboard;
