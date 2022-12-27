import { Space, Spin } from 'antd';

export const SpinnerComponent = () => {
  return (
    <Space size="middle" className="w-full h-full flex justify-center">
      <Spin size="large" />
    </Space>
  );
};
