import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/health_care_logo.svg";
import styled from "styled-components";
import Logout from "./Logout"; 

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  min-height: 100vh;
  position: relative;
`;

const LogoContainer = styled.img`
  height: 10rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 1rem;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 800px;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 0.5rem;
`;

const SectionContent = styled.div`
  font-size: 15px;
  color: #555;
`;

const MeetingItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px; 
  p {
    margin: 0; 
    line-height: 1.5; 
  }
`;

const LogoutContainer = styled.div`
  margin-top: 2rem;
`;

function UserDashboard() {
  const {
    authState: { user },
  } = useAuth();

  const upcomingMeetings = [
    { id: 1, date: "2023-12-15", time: "10:00", description: "\u00A0\u00A0(info här)" },
    { id: 2, date: "2023-12-20", time: "13:00", description: " \u00A0\u00A0(info här)" },
  ];

  const meetingHistory = [
    { id: 1, date: "2023-11-01", time: "09:00", description: "\u00A0\u00A0(info här)" },
    { id: 2, date: "2023-10-15", time: "14:00", description: "\u00A0\u00A0(info här)" },
  ];

  const userProfile = {
    firstName: "Boy",
    lastName: "Nadal",
    email: "test@hotmail.com",
    phone: "070-123 4567",
    street: "Main Street 12",
    city: "Göteborg",
    zipcode: "123 45",
  };

  return (
    <UserContainer>
      <LogoContainer src={Logo} alt="Health Care Logo" />
      <Title>Profile Page</Title>
      <p>Welcome, {userProfile.firstName}!</p>

      <SectionContainer>
        <SectionTitle>Personal Profile</SectionTitle>
        <SectionContent>
          <ProfileInfo>
            <p><strong>First Name:</strong> {userProfile.firstName}</p>
            <p><strong>Last Name:</strong> {userProfile.lastName}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Street:</strong> {userProfile.street}</p>
            <p><strong>City:</strong> {userProfile.city}</p>
            <p><strong>Zipcode:</strong> {userProfile.zipcode}</p>
          </ProfileInfo>
        </SectionContent>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Upcoming Meetings</SectionTitle>
        <SectionContent>
          {upcomingMeetings.length > 0 ? (
            upcomingMeetings.map((meeting) => (
              <MeetingItem key={meeting.id}>
                <span>{meeting.date} at {meeting.time}</span>
                <span>{meeting.description}</span>
              </MeetingItem>
            ))
          ) : (
            <p>No upcoming meetings</p>
          )}
        </SectionContent>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Meeting History</SectionTitle>
        <SectionContent>
          {meetingHistory.length > 0 ? (
            meetingHistory.map((meeting) => (
              <MeetingItem key={meeting.id}>
                <span>{meeting.date} at {meeting.time}</span>
                <span>{meeting.description}</span>
              </MeetingItem>
            ))
          ) : (
            <p>No meeting history</p>
          )}
        </SectionContent>
      </SectionContainer>

      <LogoutContainer>
        <Logout /> 
      </LogoutContainer>
    </UserContainer>
  );
}

export default UserDashboard;
