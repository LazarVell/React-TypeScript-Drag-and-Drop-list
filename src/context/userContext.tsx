import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import userList from "../users.json";

const reduceduserList = userList.slice(0, 10);

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  zip: number;
  birthdate: string;
  city: string;
}

interface UserContextProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
}

const defaultState: UserContextProps = {
  users: [],
  setUsers: () => {},
};

export const UserContext =
  createContext<Partial<UserContextProps>>(defaultState);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>(reduceduserList);

  const contextValue: UserContextProps = {
    users,
    setUsers,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
