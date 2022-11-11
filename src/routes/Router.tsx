import { Suspense, useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserInfoContext } from "../contexts/UserInfoContext";
import { getUserInfo } from "../apis/auth";
import { getUserBalance } from "../apis/account";
import UserRouter from "./UserRouter";
import AuthRouter from "./AuthRouter";

const Router = () => {
  const { setUserInfoContext, isAuthenticated, setIsAuthenticated } =
    useContext(UserInfoContext);

  useEffect(() => {
    handleGetUserInfo().then((response) => {
      if (
        response.detail !== "Not authenticated" &&
        localStorage.getItem("token")
      ) {
        setIsAuthenticated(true);
        handleGetUserBalance(response.user_id).then((balance) => {
          if (balance.status === "success") {
            response.balance = balance.data;
            setUserInfoContext(response);
          }
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  async function handleGetUserInfo() {
    return await getUserInfo();
  }

  async function handleGetUserBalance(user_id: string): Promise<any> {
    return await getUserBalance(user_id);
  }

  return (
    <BrowserRouter>
      <Routes>
        {AuthRouter.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              !isAuthenticated ? (
                <Suspense fallback={null}>{route.element}</Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        ))}
        {UserRouter.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              isAuthenticated ? (
                <Suspense fallback={null}>{route.element}</Suspense>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
