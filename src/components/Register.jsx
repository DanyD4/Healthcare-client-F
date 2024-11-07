//import React, { useState } from "react";
import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import axios from "axios";


// Styled Components
const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


const RegisterTitle = styled.h2`
  font-size: 22px;
`;


const FormWrapper = styled.form`
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 350px;
  gap: 10px;
`;


const StyledInput = styled.input`
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #fafafa;
  border-radius: 5px;
  padding: 10px;


  &:focus {
    outline: none;
    border-color: #057d7a;
  }
`;


const RegisterButton = styled.button`
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


const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); //nytt

  const navigate = useNavigate();

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  console.log("API URL:", import.meta.env.VITE_API_URL); // nytt

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !username || !password) {
      alert("Fill in all fields for registration!");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          firstName,
          lastName,
          email,
          username,
          password,
        }
      );
      dispatch ({
        type: "REGISTER",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));
      console.log("User registered successfully");
      setMessage("User registered successfully");
      return navigate ("/");
    } catch (err) {
      console.log ("Error: " + err);
      setMessage("Error: " + err);
    }

};

return (
  <RegisterContainer>
    <RegisterTitle>Create Account</RegisterTitle>
    <FormWrapper onSubmit={handleSubmit}>
      <label>First Name</label>
      <StyledInput
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <label>Last Name</label>
      <StyledInput
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <label>User Name</label>
      <StyledInput
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label>Email Address</label>
      <StyledInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password</label>
      <StyledInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <RegisterButton type="submit">Register</RegisterButton>
    </FormWrapper>
    {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
  </RegisterContainer>
);
};


export default Register;








/*

// Main Register Component
function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();


    const userData = {
      firstName,
      lastName,
      userName,
      email,
      password,
    };


    try {
      const response = await axios.post("https://api.yourdomain.com/register", userData);
      setMessage("Registration successful!");
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };


  return (
    <RegisterContainer>
      <RegisterTitle>Create Account</RegisterTitle>
      <FormWrapper onSubmit={handleSubmit}>
        <label>First Name</label>
        <StyledInput
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name</label>
        <StyledInput
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>User Name</label>
        <StyledInput
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <label>Email Address</label>
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <RegisterButton type="submit">Register</RegisterButton>
      </FormWrapper>
      {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
    </RegisterContainer>
  );
}


export default Register;
*/