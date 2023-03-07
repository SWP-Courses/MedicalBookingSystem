import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext();

export default function StoreContextProvider({ children }) {
  const [routingHistory, setRoutingHistory] = useState({
    beforeLogin: "",
  });
  const [booking, setBooking] = useState();
  const navigate = useNavigate();

  // Side Effects

  // Functions

  return (
    <StoreContext.Provider value={{ routingHistory, setRoutingHistory }}>
      {children}
    </StoreContext.Provider>
  );
}
