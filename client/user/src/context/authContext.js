import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import API_URL from "~/api/Router";


export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );
  const location = useLocation();

  // Side Effect
  useEffect(() => {
    // console.log(currentUser);
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Functions
  const login = async (inputs, setIsLoading) => {
    try {
      const res = await axios.post(API_URL+"/auth/login", {
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
    try {
      await axios.post(API_URL+"/auth/logout");
      setCurrentUser(null);
      if(location.pathname === '/doctor' || location.pathname === '/customer')
        navigate("/")
    } catch(err) {
      console.log(err);
    }
  };

  //todo
 const update = async (formData) => {
  try {
    // check api phải gửi after change object
    const res =  await axios.put(`${API_URL}/users/${currentUser._id}`, formData);
    console.log(res.data);
    setCurrentUser(res.data);
    navigate(0);
  } catch(err) {
    console.log(err);
  }
 }

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, update }}
    >
      {children}
    </AuthContext.Provider>
  );
}
