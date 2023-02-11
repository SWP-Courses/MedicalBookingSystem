import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";


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
  const login = async (inputs, setIsLoading) => {
    try {
      const res = await axios.post("/auth/login", {
        ...inputs
      });
      setCurrentUser(res.data);
      // setIsLoading(false);
      navigate("/");
    } catch (error) {
        toast.error(error?.response?.data);
        if(error?.response?.data) {
          setIsLoading(false);
        }
    }
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
