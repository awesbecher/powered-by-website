import { lazy } from 'react';

const RoomService = lazy(() => import('@/pages/room-service'));
const RetailServices = lazy(() => import('@/pages/RetailServices'));
const AutoDealer = lazy(() => import('@/pages/auto-dealer'));

export const demoRoutes = [
  { path: "/auto-dealer", element: <AutoDealer /> },
  { path: "/room-service", element: <RoomService /> },
  { path: "/retail-services", element: <RetailServices /> },
];
