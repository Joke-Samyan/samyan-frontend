import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { IUserInfo } from "../interfaces/IUser";

interface Props {
  children: React.ReactNode;
}
interface IUserInfoContext {
  userInfoContext: IUserInfo;
  setUserInfoContext: Dispatch<SetStateAction<IUserInfo>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const UserInfoContextState = {
  userInfoContext: {
    user_id: "634eaa9d85398e1732e742e4",
    email: "",
    password: "",
    name: "",
    surname: "",
    balance: 0,
  },
  setUserInfoContext: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};

export const UserInfoContext =
  createContext<IUserInfoContext>(UserInfoContextState);

export const UserInfoContextProvider = ({ children }: Props) => {
  const [userInfoContext, setUserInfoContext] = useState<IUserInfo>(
    UserInfoContextState.userInfoContext
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <UserInfoContext.Provider
      value={{
        userInfoContext,
        setUserInfoContext,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
