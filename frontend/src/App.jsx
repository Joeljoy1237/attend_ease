import { lazy } from "react";
import './App.css'
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
const DashboardRootLayout = lazy(() =>
  import("./widgets/Dashboard/layout/DashboardRootLayout")
);
const Dashboard = lazy(() =>
  import("./widgets/Dashboard/widgets/Dashboard/Dashboard")
);

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
