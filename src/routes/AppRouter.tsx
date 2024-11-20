import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "../App";
import ChartPage from "../pages/ChartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
        <Outlet />
      </>
    ),
  },
  {
    path: "/chart",
    element: <ChartPage />,
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
