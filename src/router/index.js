import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const PageA = lazy(() => import('../pages/PageA'));
// import Home from '../pages/Home';

const router = [
  {
    path: '/',
    element: <Home />,
  },
  { path: '/pagea', element: <PageA /> },
];
export default router;
