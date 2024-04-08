import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));
const PageA = lazy(() => import('@/pages/PageA'));

const router = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/:roomId', element: <Home /> },
    ],
  },
  { path: '/page-a', element: <PageA /> },
];
export default router;
