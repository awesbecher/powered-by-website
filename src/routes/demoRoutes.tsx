
import React from "react";
import RoomService from "../pages/room-service";
import Insurance from "../pages/Insurance";
import MercedesDealer from "../pages/MercedesDealer";
import RealEstate from "../pages/RealEstate";
import RetailServices from "../pages/RetailServices";

export const demoRoutes = [
  {
    path: "/room-service",
    element: <RoomService />,
  },
  {
    path: "/insurance",
    element: <Insurance />,
  },
  {
    path: "/mercedes-dealer",
    element: <MercedesDealer />,
  },
  {
    path: "/real-estate",
    element: <RealEstate />,
  },
  {
    path: "/retail-services",
    element: <RetailServices />,
  },
];
