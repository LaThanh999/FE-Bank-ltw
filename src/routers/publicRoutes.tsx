import AccountPage from 'pages/Account';
import HomePage from 'pages/Home';

const publicRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/account',
    element: <AccountPage />,
  },
];

export default publicRoutes;
