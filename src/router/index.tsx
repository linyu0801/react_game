import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));

const router = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/:roomId', element: <Home /> },
    ],
  },
];
export default router;
