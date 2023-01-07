import AccountPage from 'pages/Account';
import { AddCustomerPage } from 'pages/AddCustomer';
import { CustomerDetailPage } from 'pages/CustomerDetail';
import { HistoryAdminPage } from 'pages/HistoryAdmin';
import HomePage from 'pages/Home';
import { HomeAdminPage } from 'pages/HomeAdmin';
import { HomeEmployeePage } from 'pages/HomeEmployee';
import { MyOwePage } from 'pages/MyOwe';
import { OwePage } from 'pages/Owe';
import { RechargeMoneyPage } from 'pages/RechargeMoney';
import SendPrivatePage from 'pages/SendPrivate';
import SendPublicPage from 'pages/SendPublic';
import { TransferPage } from 'pages/TransferPage';

const publicRoutes = [
  {
    path: '/',
    element: <TransferPage />,
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
  // admin
  {
    path: '/home-admin',
    element: <HomeAdminPage />,
  },
  {
    path: '/history-admin',
    element: <HistoryAdminPage />,
  },
];

export default publicRoutes;
