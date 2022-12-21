import { Button, Form, Input, Space, Table, Tabs } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { OweNumberCard } from './components/OweNumberCard';
import { OweUsername } from './components/OweUsername';

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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const Owe = () => {
  const [form] = Form.useForm();

  return (
    <div className="w-full h-full flex">
      <div className=" w-[40%] bg-slate-200 h-full p-6 overflow-scroll max-h-[95vh]">
        <div className="bg-white w-full h-full rounded-lg flex flex-col items-center justify-center">
          <div className="text-sky-900 font-black text-lg mb-6 ">Tạo nhắc nợ</div>
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
                children: <OweUsername />,
              },
              {
                label: `Tài khoản mới`,
                key: '2',
                children: <OweNumberCard />,
              },
            ]}
          />
        </div>
      </div>
      <div className="w-[60%] h-full p-8  overflow-scroll max-h-[95vh]">
        <div className="h-[50%] overflow-auto">
          <div className="text-left text-sky-900 font-black text-lg mb-2 flex justify-between">
            <div>Danh sách nợ</div>
          </div>
          <Table dataSource={dataSource} columns={columns} />
        </div>
        <div className="h-[50%] overflow-auto">
          <div className="text-left text-sky-900 font-black text-lg mb-2 flex justify-between">
            <div>Danh sách chưa thanh toán</div>
          </div>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </div>
  );
};
