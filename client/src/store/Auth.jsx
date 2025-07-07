import { createContext, useContext, useEffect, useState } from "react";

// CREATE CONTEXT
export const AuthContext = createContext();

// CONTEXT PROVIDER
export const AuthProvider = ({ children }) => {

  const API = import.meta.env.VITE_API;

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([])
  const authorizationToken = `Bearer ${token}`;

  // Store token in localStorage and update state
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  // Remove token from localStorage and update state
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Check if token exists
  const isLoggIn = !!token;

  // JWT Authentication -> get current logged-in user
  const userAuthentication = async () => {
    try {
      const response = await fetch(`${API}/auth/user`, {
        method: "GET",
        headers: {
          "Authorization": authorizationToken,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else if (response.status === 401) {
        console.warn("Unauthorized. Logging out...");
        logoutUser();
      }
    } catch (error) {
      console.error("Error while fetching user data:", error);
    }
  };

  //Fetching services
  const fetchServices = async()=>{
    try {
      const response = await fetch(`${API}/data/service`, {
        method : "GET"
      })

      if(response.ok){
        const data =  await response.json()
        // console.log(data.message);
        setServices(data.message)
      }
    } catch (error) {
      console.error("Seveice frontend error: ", error)
    }
  }

  //Service useEffect
  useEffect(() => {
    fetchServices()
  }, [])
  

  // Run when token changes
  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]);  

  return (
    <AuthContext.Provider value={{ isLoggIn, storeTokenInLS, logoutUser, token, user, services, authorizationToken, API }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
