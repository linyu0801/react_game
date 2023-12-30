import { lazy } from 'react';
const Home = lazy(() => import('../pages/Home'));
// import Home from '../pages/Home';

const router = [
  {
    path: '/',
    element: <Home />,
  },
  // { path: '*', element: <ErrorPage /> },
];
export default router;
