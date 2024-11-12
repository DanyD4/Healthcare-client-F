// ProviderDashboard.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

// Styled Components
const Container = styled.div`
  max-width: 800px;
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

const SectionTitle = styled.h3`
  font-size: 20px;
  margin-top: 20px;
`;

const CalendarContainer = styled.div`
  margin-bottom: 20px;
`;

const BookingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  th {
    background-color: #f1f1f1;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 10px;
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

const ProviderDashboard = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [availabilityTimes, setAvailabilityTimes] = useState(["09:00", "11:00", "13:00", "15:00"]);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

 
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/caregiver/bookings");
        setBookings(response.data);
        setFilteredBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    fetchBookings();
  }, []);


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
        times: availabilityTimes,
      }));

      await axios.post("http://localhost:8080/api/auth/availability", {
        caregiverId: "specificCaregiverId", 
        availabilityData,
      });

      console.log("Availability saved successfully");
    } catch (error) {
      console.error("Failed to save availability:", error);
    }
  };


  useEffect(() => {
    let filtered = bookings;
    if (statusFilter !== "All") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }
    if (dateFilter) {
      filtered = filtered.filter((b) => b.date.startsWith(dateFilter));
    }
    setFilteredBookings(filtered);
  }, [statusFilter, dateFilter, bookings]);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  return (
    <Container>
      <Title>Provider Dashboard</Title>

      <SectionTitle>Manage Availability</SectionTitle>
      <CalendarContainer>
        <Calendar
          onClickDay={handleDateChange}
          tileClassName={({ date }) =>
            selectedDates.some((d) => d.getTime() === date.getTime()) ? "selected" : null
          }
        />
      </CalendarContainer>
      <SaveButton onClick={handleSaveAvailability}>Save Availability</SaveButton>

      <SectionTitle>My Bookings</SectionTitle>
      <FilterSection>
        <label>
          Status:
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            value={dateFilter}
            onChange={handleDateFilterChange}
          />
        </label>
      </FilterSection>

      <BookingTable>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Patient Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.patientName}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </BookingTable>
    </Container>
  );
};

export default ProviderDashboard;
