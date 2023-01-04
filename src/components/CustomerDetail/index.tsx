import { useMutation, useQuery } from '@tanstack/react-query';
import { Table, Tabs } from 'antd';
import { formatStringReplace } from 'helper/common';
import { formatNumberCurrent } from 'helper/number';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GetHistoryServer, GetUserByNumberCardWithMoneyServer } from 'services/account';
import { UserCustomerDTO } from 'types/account';

export const CustomerDetailComponent = ({ cardNumber }: { cardNumber: string }) => {
  const columnsHistory = [
    {
      title: 'Loại giao dịch',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Người gửi',
      dataIndex: 'nameFrom',
      key: 'nameFrom',
    },
    {
      title: 'Người nhận',
      dataIndex: 'nameTo',
      key: 'nameTo',
    },
    {
      title: 'Số tiền',
      dataIndex: 'numberMoney',
      key: 'numberMoney',
    },
    {
      title: 'Nội dung',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thời gian',
      dataIndex: 'atTime',
      key: 'atTime',
    },
  ];

  const { mutate: mutateAddUserRecommend } = useMutation(GetUserByNumberCardWithMoneyServer);

  const [data, setData] = useState<UserCustomerDTO>();
  const [dataHistory, setDataHistory] = useState<
    {
      key: number;
      type: string;
      nameFrom: string;
      nameTo: string;
      description: string;
      numberMoney: string;
      atTime: string;
    }[]
  >([]);
  const [type, setType] = useState<number>(0);

  const { data: dataHistories } = useQuery(
    ['getHistory', type],
    () => GetHistoryServer({ cardNumber, type }),
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (cardNumber) {
      mutateAddUserRecommend(
        { cardNumber },
        {
          onSuccess: (data) => {
            setData(data);
          },
        },
      );
    }
  }, [cardNumber]);

  useEffect(() => {
    const dataTemp = dataHistories?.map((el, index) => {
      return {
        key: index,
        type: el.type === 1 ? 'Chuyển đi' : 'Nhận về',
        nameFrom: el.hoTenNguoiGui,
        nameTo: el.hoTenNguoiNhan,
        description: el.noiDung,
        numberMoney: `${formatNumberCurrent(el.soTienChuyen) || 0} VND`,
        atTime: moment(el.create_at).format('h:mm:ss, DD/MM/YYYY'),
      };
    });
    if (dataTemp) setDataHistory(dataTemp);
  }, [dataHistories]);

  const onChange = (tab: string) => {
    switch (tab) {
      case 'tab-1':
        setType(0);
        return;
      case 'tab-2':
        setType(1);
        return;
      case 'tab-3':
        setType(2);
        return;

      default:
        break;
    }
  };

  return (
    <div className="p-4">
      <div className="text-lg font-medium text-sky-900 flex justify-center mb-4">
        <div>Chi tiết tài khoản</div>
      </div>
      <div className="text-base font-semibold italic p-8">
        <div className="flex justify-between mb-2">
          <div className="flex">
            Chủ tài khoản:{' '}
            <div className="ml-4 font-medium text-cyan-900 not-italic">{data?.hoTen}</div>
          </div>
          <div className="flex">
            Số điện thoại:{' '}
            <div className="ml-4 font-medium text-cyan-900 not-italic">{data?.sdt}</div>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="flex">
            Số tài khoản:{' '}
            <div className="ml-4 font-medium text-cyan-900 not-italic">
              {formatStringReplace(data?.maTaiKhoan)}
            </div>
          </div>
          <div className="flex">
            Số dư tài khoản:{' '}
            <div className="ml-4 font-medium text-cyan-900 not-italic">{`${formatNumberCurrent(
              data?.soDu,
            )} VND`}</div>
          </div>
        </div>
      </div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="middle"
        onChange={onChange}
        items={[
          {
            label: `Tất cả giao dịch`,
            key: 'tab-1',
            children: <Table dataSource={dataHistory} columns={columnsHistory} />,
          },
          {
            label: `Chuyển đi`,
            key: 'tab-2',
            children: <Table dataSource={dataHistory} columns={columnsHistory} />,
          },
          {
            label: `Nhận về`,
            key: 'tab-3',
            children: <Table dataSource={dataHistory} columns={columnsHistory} />,
          },
        ]}
      />
    </div>
  );
};
