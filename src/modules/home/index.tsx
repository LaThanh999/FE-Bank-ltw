import { Button, Table } from 'antd';
import { MoneyUser } from 'components/MoneyUser';
import { formatStringReplace } from 'helper/common';
import { formatNumberSpace } from 'helper/number';

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
];

const dataHistory = [
  {
    key: 'h1',
    type: 'Chuyển đi',
    numberMoney: '10.00000 VND',
    atTime: '20/12/2022',
  },
  {
    key: 'h1',
    type: 'Chuyển đi',
    numberMoney: '10.00000 VND',
    atTime: '20/12/2022',
  },
  {
    key: 'h1',
    type: 'Nhận về',
    numberMoney: '10.00000 VND',
    atTime: '20/12/2022',
  },
  {
    key: 'h1',
    type: 'Chuyển đi',
    numberMoney: '10.00000 VND',
    atTime: '20/12/2022',
  },
  {
    key: 'h1',
    type: 'Nhận về',
    numberMoney: '10.00000 VND',
    atTime: '20/12/2022',
  },
  {
    key: 'h1',
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
      <div className="flex flex-col w-[40%] bg-slate-200 h-full p-6">
        <div className="bg-[#4699EB] h-[220px] rounded-2xl p-8 flex flex-col justify-between text-zinc-200">
          <div className="flex justify-between items-center  text-lg">
            <div className="font-bold">Card</div>
            <div className="font-extrabold text-2xl ita">Visa</div>
          </div>
          <div className="flex items-center justify-between ">
            <div
              className="bg-[url('https://cdn4.iconfinder.com/data/icons/credit-card-15/200/329-512.png')] 
            w-[50px] h-[50px] bg-contain"
            ></div>
            <div className="text-2xl font-semibold italic">{formatNumberSpace('123412341234')}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold italic">
              {formatStringReplace('La Chí Thành')}
            </div>
          </div>
        </div>
        <MoneyUser classCss="w-[90%] mt-7 ml-2"></MoneyUser>
        <div className=" flex-1 w-full h-full bg-white mt-6 rounded-md p-6">
          <div className="text-left text-sky-900 font-black text-lg">Danh sách người thân</div>
          <div className="text-right">
            <Button type="primary" className="bg-blue-400 hover:text-white">
              Thêm
            </Button>
          </div>
          <div className="mt-4">
            <Table dataSource={dataSource} columns={columns} />;
          </div>
        </div>
      </div>
      <div className="w-[60%] h-full p-8">
        <div className="text-4xl text-slate-800 font-bold italic mb-8">Lịch sử giao dịch</div>
        <Table dataSource={dataHistory} columns={columnsHistory} />;
      </div>
    </div>
  );
}
