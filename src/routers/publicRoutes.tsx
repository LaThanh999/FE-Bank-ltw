import AccountPage from 'pages/Account';
import HomePage from 'pages/Home';
import SendPrivatePage from 'pages/SendPrivate';
import SendPublicPage from 'pages/SendPublic';

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
  {
    path: '/send-private',
    element: <SendPrivatePage />,
  },
  {
    path: '/send-public',
    element: <SendPublicPage />,
  },
];

export default publicRoutes;