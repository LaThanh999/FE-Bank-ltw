import { useQuery } from '@tanstack/react-query';
import { Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CustomerDetailComponent } from 'components/CustomerDetail';
import { formatNumberCurrent } from 'helper/number';
import moment from 'moment';
import { useState } from 'react';
import { GetCustomerServer } from 'services/account';

interface DataType {
  key: React.Key;
  name: string;
  phone: string;
  email: string;
  numberOfMoney: string;
  createAt: string;
  action?: any;
}

export default function HomeEmployee() {
  const { data: dataCustomer } = useQuery(['getMony'], () => GetCustomerServer(), {
    refetchOnWindowFocus: false,
  });

  const [openModal, setOpenModal] = useState(false);
  const [cardNumberState, setCardNumberState] = useState<string>();

  const columns: ColumnsType<DataType> = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      filters: dataCustomer?.map((el) => ({
        text: el.hoTen,
        value: el.hoTen,
      })),
      filterSearch: true,
      onFilter: (value: any, record: any) => record.name.startsWith(value),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      filters: dataCustomer?.map((el) => ({
        text: el.sdt,
        value: el.sdt,
      })),
      filterSearch: true,
      onFilter: (value: any, record: any) => record.phone.startsWith(value),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filters: dataCustomer?.map((el) => ({
        text: el.email,
        value: el.email,
      })),
      filterSearch: true,
      onFilter: (value: any, record: any) => record.email.startsWith(value),
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      filters: dataCustomer?.map((el) => ({
        text: el.maTaiKhoan,
        value: el.maTaiKhoan,
      })),
      filterSearch: true,
      onFilter: (value: any, record: any) => record.cardNumber.startsWith(value),
    },
    {
      title: 'Số dư',
      dataIndex: 'numberOfMoney',
      key: 'numberOfMoney',
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record: any) => (
        <Space size="middle">
          <button
            className="underline italic font-medium text-sky-600 hover:text-sky-800"
            onClick={() => {
              setCardNumberState(record.cardNumber);
              setOpenModal(true);
            }}
          >
            Xem chi tiết
          </button>
        </Space>
      ),
    },
  ];

  const dataTable: DataType[] =
    dataCustomer?.map((el, index) => {
      return {
        key: `customer-${index}`,
        name: el.hoTen,
        phone: el.sdt,
        email: el.email,
        cardNumber: el.maTaiKhoan,
        numberOfMoney: `${formatNumberCurrent(el.soDu) || 0} VND`,
        createAt: el.create_at ? moment(el.create_at).format('h:mm:ss, DD/MM/YYYY') : '',
      };
    }) || [];

  return (
    <div className="w-full h-full p-6">
      <div className="text-lg font-medium text-sky-900 flex justify-center mb-4">
        <div>Danh sách khách hàng</div>
      </div>
      <Table dataSource={dataTable} columns={columns} />
      <Modal
        destroyOnClose
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        width={1000}
        footer={null}
      >
        <CustomerDetailComponent cardNumber={cardNumberState as string} />
      </Modal>
    </div>
  );
}
