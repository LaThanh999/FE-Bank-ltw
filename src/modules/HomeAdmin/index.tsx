import { useQuery } from '@tanstack/react-query';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { GetEmployServer } from 'services/account';

interface DataType {
  key: React.Key;
  name: string;
  phone: string;
  email: string;
  createAt: string;
  action?: any;
}

export const HomeAdmin = () => {
  const { data: dataEmployee } = useQuery(['getMony'], () => GetEmployServer(), {
    refetchOnWindowFocus: false,
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      filters: dataEmployee?.map((el) => ({
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
      filters: dataEmployee?.map((el) => ({
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
      filters: dataEmployee?.map((el) => ({
        text: el.email,
        value: el.email,
      })),
      filterSearch: true,
      onFilter: (value: any, record: any) => record.email.startsWith(value),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Space size="middle">
          <button
            className="underline italic font-medium text-sky-600 hover:text-sky-800"
            onClick={() => {}}
          >
            Xem chi tiết
          </button>
          <button
            className="underline italic font-medium text-sky-600 hover:text-sky-800"
            onClick={() => {}}
          >
            Sửa thông tin
          </button>
          <button
            className="underline italic font-medium text-sky-600 hover:text-sky-800"
            onClick={() => {}}
          >
            Khóa tài khoản
          </button>
        </Space>
      ),
    },
  ];

  const dataTable: DataType[] =
    dataEmployee?.map((el, index) => {
      return {
        key: `customer-${index}`,
        name: el.hoTen,
        phone: el.sdt,
        email: el.email,
        createAt: el.create_at ? moment(el.create_at).format('h:mm:ss, DD/MM/YYYY') : '',
      };
    }) || [];
  return (
    <div className="w-full h-full p-6">
      <div className="text-left text-sky-900 font-black text-lg mb-2 flex justify-between">
        <div>Danh sách nhân viên</div>
        <Button type="primary" onClick={() => {}} className="bg-blue-400 hover:text-white">
          Thêm Nhân viên
        </Button>
      </div>
      <Table dataSource={dataTable} columns={columns} />
    </div>
  );
};
