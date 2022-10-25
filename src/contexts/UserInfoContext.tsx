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
}

const UserInfoContextState = {
  userInfoContext: {
    user_id: "634eaa9d85398e1732e742e4",
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    balance: 0,
  },
  setUserInfoContext: () => {},
};

export const UserInfoContext =
  createContext<IUserInfoContext>(UserInfoContextState);

export const UserInfoContextProvider = ({ children }: Props) => {
  const [userInfoContext, setUserInfoContext] = useState<IUserInfo>({
    user_id: "634eaa9d85398e1732e742e4",
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    balance: 555,
  });

  return (
    <UserInfoContext.Provider
      value={{
        userInfoContext,
        setUserInfoContext,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
