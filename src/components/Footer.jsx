import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #057d7a;
  color: #fff;
  position: fixed;
  width: 100%;
  bottom: 0;
`;


const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

const Footer = () => (
  <FooterContainer>
    <FooterText> © 2024 Health Care AB .</FooterText>
  </FooterContainer>
);

export default Footer;
