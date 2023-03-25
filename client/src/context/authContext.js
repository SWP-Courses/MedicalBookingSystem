import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_code from "jwt-decode";
import API_URL from "~/api/Router";
import { StoreContext } from "./storeContext";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const {
    routingHistory: { beforeLogin },
    setRoutingHistory,
  } = useContext(StoreContext);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  // Axios interceptor
  const axiosJWT = axios.create({
    headers: {
      authorization: `Bearer ${currentUser?.access_token}`,
    },
  });
  axiosJWT.interceptors.request.use(
    async (config) => {
      console.log("danh chan");
      let currentDate = new Date();
      // console.log(user);
      const decodedToken = jwt_code(currentUser.access_token);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        // lấy access_token và refresh_token
        console.log("lấy refresh");
        const data = await handleRefresh();
        // console.log(data);
        config.headers["authorization"] = "Bearer " + data.access_token;
      }
      // console.log("return config");
      return config;
    },
    (error) => Promise.reject(error)
  );

  const handleRefresh = async () => {
    try {
      const res = await axios.post(API_URL + "/auth/refresh", {
        refresh_token: currentUser.refresh_token,
      });
      setCurrentUser({
        ...currentUser,
        access_token: res.data.access_token,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(beforeLogin);

  // Side Effects

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    const fetchLoginSuccess = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/login/success`, {
          withCredentials: true,
        });
        // console.log(res.data);
        // if (beforeLogin) {
        //   navigate(beforeLogin);
        //   setRoutingHistory((prev) => {
        //     const { beforeLogin, ...newHistory } = prev;
        //     return newHistory;
        //   });
        //   return;
        // }
        console.log(res.data);
        navigate("/customer/profile");
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    !JSON.parse(localStorage.getItem("user")) && fetchLoginSuccess();
  }, [beforeLogin, navigate, setRoutingHistory]);
  // console.log(currentUser);

  // Functions
  const login = async (inputs) => {
    try {
      const res = await axios.post(API_URL + "/auth/login", {
        ...inputs,
      });
      setCurrentUser(res.data);
      // navigate("/");
      // if (["customer", "doctor"].includes(res.data.role))
      //   navigate(`/${res.data.role}/profile`);
      if (res.data.role === "customer") {
        if (beforeLogin) {
          console.log(beforeLogin);
          navigate(beforeLogin);
          setRoutingHistory((prev) => {
            const { beforeLogin, ...newHistory } = prev;
            return newHistory;
          });
          return;
        } else navigate(`/${res.data.role}/profile`);
      }

      if (res.data.role === "doctor") navigate(`/${res.data.role}`);

      if (["admin", "consultant", "cashier"].includes(res.data.role))
        navigate("/staff");
    } catch (error) {
      toast.error(error?.response?.data);
      // if(error?.response?.data) {
      // setIsLoading(false);
      // }
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        API_URL + "/auth/logout",
        { refresh_token: currentUser.refresh_token },
        { withCredentials: true }
      );
      setCurrentUser(null);
      // if (
      //   location.pathname.contains("doctor") ||
      //   location.pathname.contains("customer") ||
      //   location.pathname.contains("staff")
      // )
      // console.log(location.pathname);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //todo
  const update = async (formData) => {
    try {
      // check api phải gửi after change object
      const res = await axios.put(
        `${API_URL}/users/${currentUser._id}`,
        formData
      );
      // console.log(res.data);
      setCurrentUser(res.data);
      navigate(0);
      toast.success("Cập nhật thành công.");
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, update, axiosJWT }}
    >
      {children}
    </AuthContext.Provider>
  );
}
