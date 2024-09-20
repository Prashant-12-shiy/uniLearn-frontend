// context/UserContext.js
import { createContext, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children, isAdmin }) => {
  return (
    <UserContext.Provider value={{ isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
