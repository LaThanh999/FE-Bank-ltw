import { useQuery } from '@tanstack/react-query';
import { Divider, Tabs } from 'antd';
import { CardATM } from 'components/CardATM';
import { SpinnerComponent } from 'components/Common/Spin';
import { MoneyUser } from 'components/MoneyUser';
import { USER_ID } from 'constants/common';
import { GetMoneyUserServer } from 'services/account';
import { SendPrivateUserNew } from './component/UserNew';
import { SendPrivateUserOld } from './component/UserOld';

export const SendPrivate = () => {
  const userId = localStorage.getItem(USER_ID);

  const {
    data: dataCardUser,
    isLoading: isLoadingGetMoney,
    refetch: refetchDataMoney,
  } = useQuery(['getMony'], () => GetMoneyUserServer(userId as string), {
    refetchOnWindowFocus: false,
  });

  if (isLoadingGetMoney) return <SpinnerComponent />;

  return (
    <div className="w-full h-full flex">
      <div className=" w-[45%] bg-slate-200 h-full p-6 overflow-scroll max-h-[95vh]">
        <div>
          <CardATM
            numberCard={dataCardUser?.maTaiKhoan || ''}
            nameCard={dataCardUser?.hoTen || ''}
          />
          <MoneyUser money={dataCardUser?.soDu as string} classCss="w-[90%] mt-7 ml-2"></MoneyUser>
          <Divider dashed type="horizontal" className="bg-sky-600" />
        </div>
      </div>
      <div className="w-[55%] h-full p-8  overflow-scroll max-h-[95vh]">
        <div className="p-6">
          <Tabs
            defaultActiveKey="1"
            type="card"
            size="large"
            centered
            className="font-bold"
            items={[
              {
                label: `Người quen`,
                key: '1',
                children: <SendPrivateUserOld callBack={refetchDataMoney} />,
              },
              {
                label: `Tài khoản mới`,
                key: '2',
                children: <SendPrivateUserNew callBack={refetchDataMoney} />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
