import { lazy } from "react";

const LazyLogin = lazy(() => import("../pages/login/Login"));
const LazyRegister = lazy(() => import("../pages/register/Register"));

const AuthRouter = [
  {
    path: "/login",
    element: <LazyLogin />,
  },
  {
    path: "/register",
    element: <LazyRegister />,
  },
];

export default AuthRouter;
