import { Tabs } from 'antd';
import { SendPrivateUserNew } from './component/UserNew';
import { SendPrivateUserOld } from './component/UserOld';

export const SendPrivate = () => {
  return (
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
            children: <SendPrivateUserOld />,
          },
          {
            label: `Tài khoản mới`,
            key: '2',
            children: <SendPrivateUserNew />,
          },
        ]}
      />
    </div>
  );
};
