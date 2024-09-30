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
        element: <Navigate to="/Grammatik" />
      },
      {
        path: "/Grammatik",
        element: <HomePage />
      },
      // {
      //     path: "/word/:wordId",
      //     element: <WordVariants />,
      // },
      {
        path: "/:subcategory/:pagenumber",
        element: <PageTitle />,
      },
      {
        path: "/:categories",
        element: <NewCategoriesList />,
      },
    ]
  },
]);

const Provider = () => {
  return (<RouterProvider router={router} />);
}

export default Provider;
