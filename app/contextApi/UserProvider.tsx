"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getLoggedinUserInfo } from "../services/auth-service";

const UserContext = createContext<any>(undefined);
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState();

  const getLoggedinUser = async () => {
    try {
      const response = await getLoggedinUserInfo();
      if (response) {
        setUser(response);
      }
    } catch (error) {
      console.log(
        `There was an error when trying to get the logged in user data: ${error}`
      );
    }
  };

  useEffect(() => {
    getLoggedinUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
