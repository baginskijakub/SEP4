import React from "react";
import { IUser } from "@sep4/types";
const UserContext = React.createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = React.useState<IUser | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => React.useContext(UserContext);
