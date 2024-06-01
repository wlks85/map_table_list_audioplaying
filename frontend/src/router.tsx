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
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "",
            element: <HomePage />
        }, 
        {
            path: "/word/:wordId",
            element: <WordVariants />,
        },
    ]
  },
]);

const Provider = ()=> {
    return (<RouterProvider router={router} />);
}

export default Provider;
