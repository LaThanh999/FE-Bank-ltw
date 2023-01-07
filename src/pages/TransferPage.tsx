import { TYPE, USER_TYPE } from 'constants/common';
import HomePage from './Home';
import { HomeAdminPage } from './HomeAdmin';
import { HomeEmployeePage } from './HomeEmployee';

export const TransferPage = () => {
  const typeUser = localStorage.getItem(TYPE);

  return (
    <>
      {Number(typeUser) === USER_TYPE.customer && <HomePage />}
      {Number(typeUser) === USER_TYPE.employee && <HomeEmployeePage />}
      {Number(typeUser) === USER_TYPE.admin && <HomeAdminPage />}
    </>
  );
};
