"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext<any>(undefined);
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
