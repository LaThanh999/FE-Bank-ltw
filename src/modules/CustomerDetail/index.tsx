import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import Search from 'antd/es/input/Search';
import { CustomerDetailComponent } from 'components/CustomerDetail';
import { useState } from 'react';
import { GetUserByNumberCardOrEmailPhone } from 'services/account';

export const CustomerDetail = () => {
  const [cardNumberState, setCardNumberState] = useState<string>();
  const { mutate } = useMutation(GetUserByNumberCardOrEmailPhone);

  const onSearch = (value: string) => {
    if (!value) {
      setCardNumberState('');
    } else {
      mutate(
        { inputSearch: value },
        {
          onSuccess: (data) => {
            if (data.maTaiKhoan) {
              setCardNumberState(data.maTaiKhoan);
            } else {
              notification.error({
                message: `Thất bại`,
                description: `Không tìm thấy số tài khoản`,
                placement: 'bottomRight',
              });
              setCardNumberState('');
            }
          },
          onError: () => {
            notification.error({
              message: `Thất bại`,
              description: `Không tìm thấy số tài khoản`,
              placement: 'bottomRight',
            });
            setCardNumberState('');
          },
        },
      );
    }
  };
  return (
    <div className="w-full h-full p-6">
      <div className="flex justify-center items-center mt-10">
        <div className="mr-4 text-base font-semibold">Nhập Email/ Số Tài Khoản/ SĐT:</div>
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 400 }}
        />
      </div>
      {cardNumberState && <CustomerDetailComponent cardNumber={cardNumberState as string} />}
    </div>
  );
};
