import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// button to handle logout, you can change this as you want
// does not have to look or be like this but you can see how to use the logout call
const Logout = () => {

  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
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

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
