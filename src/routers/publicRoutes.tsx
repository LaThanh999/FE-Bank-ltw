import AccountPage from 'pages/Account';
import HomePage from 'pages/Home';
import { MyOwePage } from 'pages/MyOwe';
import { OwePage } from 'pages/Owe';
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
  {
    path: '/owe',
    element: <OwePage />,
  },
  {
    path: '/my-owe',
    element: <MyOwePage />,
  },
];

export default publicRoutes;
