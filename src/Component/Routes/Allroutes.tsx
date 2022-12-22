import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../Homescreen/Home";
import Singlebook from "../SInglebook/Singlebook";
import Uploadspage from "../Uploads/Uploadspage";

const Allroutes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/book/:id/details",
      element: <Singlebook />,
    },
    {
      path: "/uploads",
      element: <Uploadspage />,
    },
  ]);

  return element;
};

export default Allroutes;
