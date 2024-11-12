import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledLogoutButton = styled.button`
  cursor: pointer;
  padding: 10px 30px;
  background-color: #057d7a;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-top: 20px;
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

const Logout = () => {
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        setAuthState({
          isAuthenticated: false,
          user: null,
          roles: [],
        });
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return <StyledLogoutButton onClick={handleLogout}>Logout</StyledLogoutButton>;
};

export default Logout;
