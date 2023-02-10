import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext();

export default function StoreContextProvider({ children }) {
  const [routingHistory, setRoutingHistory] = useState({
    beforeLogin: "",
  });
  const navigate = useNavigate();

  // Side Effect

  // Functions

  return (
    <StoreContext.Provider value={{ routingHistory, setRoutingHistory }}>
      {children}
    </StoreContext.Provider>
  );
}
