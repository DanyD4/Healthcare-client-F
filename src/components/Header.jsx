
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #057d7a;
  color: #fff; 

`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.nav`
  a {
    color: #fff;
    margin-left: 1rem;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => (
  <HeaderContainer>
    <Logo>Health Care</Logo>
    <NavLinks>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/about">About</Link>
      <Link to="/booking/dashboard">Book Appointment</Link>
      <Link to="/user/dashboard">Profile</Link>
    </NavLinks>
  </HeaderContainer>
);

export default Header;
