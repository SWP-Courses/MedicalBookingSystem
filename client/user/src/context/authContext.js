import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );
  const [routingHistory, setRoutingHistory] = useState({
    beforeLogin: "",
  });
  const navigate = useNavigate();

  // Side Effect
  useEffect(() => {
    // console.log(currentUser);
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Functions
  const login = async (inputs) => {
    const res = await axios.post("/auth/login", {
      role_code: "R3",
      phone: "0123456789",
      password: "111111",
    });
    // console.log(res.data);
    setCurrentUser(res.data);
    navigate("/");
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, routingHistory, setRoutingHistory }}
    >
      {children}
    </AuthContext.Provider>
  );
}
