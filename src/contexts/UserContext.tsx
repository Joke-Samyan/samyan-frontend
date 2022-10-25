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
  setUserContext: Dispatch<SetStateAction<IUserInfo>>;
}

const UserInfoContextState = {
  userInfoContext: {
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    balance: 0,
  },
  setUserContext: () => {},
};

export const UserInfoContext =
  createContext<IUserInfoContext>(UserInfoContextState);

export const UserInfoContextProvider = ({ children }: Props) => {
  const [userInfoContext, setUserContext] = useState<IUserInfo>({
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    balance: 0,
  });

  return (
    <UserInfoContext.Provider
      value={{
        userInfoContext,
        setUserContext,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
