import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Login, SignUp } from "./pages/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  }
]);
