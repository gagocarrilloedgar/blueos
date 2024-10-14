import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import { createSupabaseAuthRepository } from "./modules/auth/infra/SupabaseAuthRepository";
import { Login, SignUp } from "./pages/auth";
import { AuthProvider } from "./pages/auth/AuthProvider";
import { Dashboard } from "./pages/dashboard";

const repo = createSupabaseAuthRepository();

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider authRepo={repo}>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "/login",
        element: <Login authRepo={repo} />
      },
      {
        path: "/signup",
        element: <SignUp authRepo={repo} />
      },
      {
        path: "/app",
        children: [
          {
            index: true,
            element: <Dashboard />
          }
        ]
      }
    ]
  }
]);
