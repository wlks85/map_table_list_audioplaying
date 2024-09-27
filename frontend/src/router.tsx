import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

// import WordList from "./components/WordList";
import WordVariants from "./components/WordVariants";
import Layout
 from "./components/Layout";
import HomePage from "./pages/Home";
import PageTitle from "./components/PageTitle";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "",
            element: <HomePage />
        }, 
        // {
        //     path: "/word/:wordId",
        //     element: <WordVariants />,
        // },
        {
            path: "/page/:pagenumber",
            element: <PageTitle />,
        },
    ]
  },
]);

const Provider = ()=> {
    return (<RouterProvider router={router} />);
}

export default Provider;
