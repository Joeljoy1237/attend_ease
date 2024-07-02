import { lazy } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import DashboardRootLayout from "./widgets/Dashboard/layout/DashboardRootLayout";
import Dashboard from "./widgets/Dashboard/widgets/Dashboard/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardRootLayout />,
    },
    {
      path: "/dashboard",
      element: <DashboardRootLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
