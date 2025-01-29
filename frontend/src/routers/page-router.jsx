import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home";
import GoogleLogin from "../pages/google-login.jsx";

import Login from "../pages/login.jsx";
import VerifyOtp from "../pages/verify-otp.jsx";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/verify-otp", element: <VerifyOtp /> },

    ],
  },
]);
