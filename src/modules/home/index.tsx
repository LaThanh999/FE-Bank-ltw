import { Button, Divider, Space, Table } from 'antd';
import { CardATM } from 'components/CardATM';
import { MoneyUser } from 'components/MoneyUser';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Tên gợi nhớ',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Số tài khoản',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <button className="underline italic font-medium text-sky-600 hover:text-sky-800">
          Edit
        </button>
        <button className="underline italic font-medium text-sky-600 hover:text-sky-800">
          Delete
        </button>
      </Space>
    ),
  },
];

const dataHistory = [
  {
    key: 'h1',
    type: 'Chuyển đi',
    numberMoney: '10.00000 VND',
    atTime: '20/12/2022',
  },
  {
    key: 'h2',
    type: 'Chuyển đi',
    numberMoney: '10.00000 VND',
    atTime: '20/12/2022',
  },
  {
    key: 'h3',
    type: 'Nhận về',
    numberMoney: '10.00000 VND',
    atTime: '20/12/2022',
  },
  {
    key: 'h4',
    type: 'Chuyển đi',
    numberMoney: '10.00000 VND',
    atTime: '20/12/2022',
  },
  {
    key: 'h5',
    type: 'Nhận về',
    numberMoney: '10.00000 VND',
    atTime: '20/12/2022',
  },
  {
    key: 'h6',
    type: 'Nhận về',
    numberMoney: '10.00000 VND',
    atTime: '20/12/2022',
  },
];

const columnsHistory = [
  {
    title: 'Loại giao dịch',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Số tiền',
    dataIndex: 'numberMoney',
    key: 'numberMoney',
  },
  {
    title: 'Thời gian',
    dataIndex: 'atTime',
    key: 'atTime',
  },
];

export default function Home() {
  return (
    <div className="w-full h-full flex">
      <div className=" w-[40%] bg-slate-200 h-full p-6 overflow-scroll max-h-[95vh]">
        <div>
          <CardATM />
          <MoneyUser classCss="w-[90%] mt-7 ml-2"></MoneyUser>
          <Divider dashed type="horizontal" className="bg-sky-600" />
        </div>
        <div>
          <CardATM />
          <MoneyUser classCss="w-[90%] mt-7 ml-2"></MoneyUser>
          <Divider dashed type="horizontal" className="bg-sky-600" />
        </div>
        <div>
          <CardATM />
          <MoneyUser classCss="w-[90%] mt-7 ml-2"></MoneyUser>
          <Divider dashed type="horizontal" className="bg-sky-600" />
        </div>
        <div>
          <CardATM />
          <MoneyUser classCss="w-[90%] mt-7 ml-2"></MoneyUser>
          <Divider dashed type="horizontal" className="bg-sky-600" />
        </div>
        <div>
          <CardATM />
          <MoneyUser classCss="w-[90%] mt-7 ml-2"></MoneyUser>
          <Divider dashed type="horizontal" className="bg-sky-600" />
        </div>
      </div>
      <div className="w-[60%] h-full p-8  overflow-scroll max-h-[95vh]">
        <div>
          <div className="text-left text-sky-900 font-black text-lg mb-2 flex justify-between">
            <div>Danh sách người nhận</div>
            <Button type="primary" className="bg-blue-400 hover:text-white">
              Thêm
            </Button>
          </div>
          <Table dataSource={dataSource} columns={columns} />
        </div>
        <div>
          <div className="text-left text-sky-900 font-black text-lg mb-2">Lịch sử giao dịch</div>
          <Table dataSource={dataHistory} columns={columnsHistory} />
        </div>
      </div>
    </div>
  );
}
