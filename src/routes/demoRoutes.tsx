
import { lazy } from 'react';

const MercedesDealer = lazy(() => import('@/pages/MercedesDealer'));
const RoomService = lazy(() => import('@/pages/room-service'));
const RetailServices = lazy(() => import('@/pages/RetailServices'));

export const demoRoutes = [
  { path: "/mercedes-dealer", element: <MercedesDealer /> },
  { path: "/room-service", element: <RoomService /> },
  { path: "/retail-services", element: <RetailServices /> },
];
