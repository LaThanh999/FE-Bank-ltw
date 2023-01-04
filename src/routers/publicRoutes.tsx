import AccountPage from 'pages/Account';
import { AddCustomerPage } from 'pages/AddCustomer';
import { CustomerDetailPage } from 'pages/CustomerDetail';
import HomePage from 'pages/Home';
import { HomeEmployeePage } from 'pages/HomeEmployee';
import { MyOwePage } from 'pages/MyOwe';
import { OwePage } from 'pages/Owe';
import { RechargeMoneyPage } from 'pages/RechargeMoney';
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
  // employee
  {
    path: '/home-employee',
    element: <HomeEmployeePage />,
  },
  {
    path: '/customer-detail',
    element: <CustomerDetailPage />,
  },
  {
    path: '/add-customer',
    element: <AddCustomerPage />,
  },
  {
    path: '/recharge-money',
    element: <RechargeMoneyPage />,
  },
];

export default publicRoutes;
