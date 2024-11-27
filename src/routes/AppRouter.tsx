import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "../App";
import ChartPage from "../pages/ChartPage";
import SunriseFormPage from "../pages/SunriseFormPage";
import SunriseReactHookFormPage from "../pages/SunriseReactHookFormPage";
import PreviewForm from "../pages/PreviewForm";
import SectionAForm from "../components/Forms/sunrise-form/SectionAForm";
import SectionBForm from "../components/Forms/sunrise-form/SectionBForm";
import SectionCForm from "../components/Forms/sunrise-form/SectionCForm";

const router = createBrowserRouter(
  [
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
    {
      path: "/form",
      element: <SunriseFormPage />,
    },

    {
      path: "/react-hook-form",
      element: <SunriseReactHookFormPage />,
      children: [
        {
          path: "/react-hook-form",
          element: <SectionAForm />,
        },
        {
          path: "/react-hook-form/section-b",
          element: <SectionBForm />,
        },
        {
          path: "/react-hook-form/section-c",
          element: <SectionCForm />,
        },
      ],
    },
    {
      path: "/form-preview",
      element: <PreviewForm />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const AppRouter: React.FC = () => {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
};

export default AppRouter;
