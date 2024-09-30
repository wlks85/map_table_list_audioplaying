// import * as React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

// import WordList from "./components/WordList";
// import WordVariants from "./components/WordVariants"; 
import Layout
  from "./components/Layout";
import HomePage from "./pages/Home";
import PageTitle from "./components/PageTitle";
import NewCategoriesList from "./components/NewCategoriesList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/:categories",
        element: <HomePage />
      },
      {
        path: "/slug/:slug",
        element: <HomePage />
      },
      {
        path: "/:subcategory/:pagenumber",
        element: <PageTitle />,
      },
      // {
      //   path: "/:categories",
      //   element: <NewCategoriesList />,
      // },
    ]
  },
]);

const Provider = () => {
  return (<RouterProvider router={router} />);
}

export default Provider;
