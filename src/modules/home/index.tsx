import { useQuery } from '@tanstack/react-query';
import { Button, Divider, Form, Input, Modal, Space, Table } from 'antd';
import { CardATM } from 'components/CardATM';
import { SpinnerComponent } from 'components/Common/Spin';
import { MoneyUser } from 'components/MoneyUser';
import { CARD_ID, USER_ID } from 'constants/common';
import { formatNumberCurrent } from 'helper/number';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GetHistoryServer, GetMoneyUserServer, GetUserRecommendServer } from 'services/account';

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

const columns = [
  {
    title: 'Tên gợi nhớ',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Họ tên',
    dataIndex: 'nameBank',
    key: 'nameBank',
  },
  {
    title: 'Số tài khoản',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Ngân hàng',
    dataIndex: 'bank',
    key: 'bank',
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
    title: 'Thời gian',
    dataIndex: 'atTime',
    key: 'atTime',
  },
];

export default function Home() {
  const [form] = Form.useForm();
  const userId = localStorage.getItem(USER_ID);
  const carId = localStorage.getItem(CARD_ID);
  const { data: dataCardUser, isLoading: isLoadingGetMoney } = useQuery(
    ['getMony'],
    () => GetMoneyUserServer(userId as string),
    {
      refetchOnWindowFocus: false,
    },
  );
  const { data: dataHistories, isLoading: isLoadingHistory } = useQuery(
    ['getHistory'],
    () => GetHistoryServer(carId as string),
    {
      refetchOnWindowFocus: false,
    },
  );

  const { data: dataRecommend, isLoading: isLoadingRecommend } = useQuery(
    ['getUserRecommend'],
    () => GetUserRecommendServer(carId as string),
    {
      refetchOnWindowFocus: false,
    },
  );

  const [dataHistory, setDataHistory] = useState<
    {
      key: number;
      type: string;
      nameFrom: string;
      nameTo: string;
      numberMoney: string;
      atTime: string;
    }[]
  >([]);

  const [dataUserRecommend, setDataRecommend] = useState<
    {
      key: number;
      name: string;
      address: string;
      nameBank: string;
      bank: string;
    }[]
  >([]);

  useEffect(() => {
    const dataTemp = dataHistories?.map((el, index) => {
      return {
        key: index,
        type: el.type === 1 ? 'Chuyển đi' : 'Nhận về',
        nameFrom: el.hoTenNguoiGui,
        nameTo: el.hoTenNguoiNhan,
        numberMoney: `${formatNumberCurrent(el.soTienChuyen) || 0} VND`,
        atTime: moment(el.create_at).format('h:mm:ss, DD/MM/YYYY'),
      };
    });
    if (dataTemp) setDataHistory(dataTemp);
  }, [dataHistories]);

  useEffect(() => {
    const dataTemp = dataRecommend?.map((el, index) => {
      return {
        key: index,
        name: el.tenGoiNho,
        address: el.maTaiKhoanNguoiNhan,
        bank: el.maNganHang,
        nameBank: el.hoTenNguoiNhan,
      };
    });
    if (dataTemp) setDataRecommend(dataTemp);
  }, [dataRecommend]);

  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

  if (isLoadingGetMoney || isLoadingHistory || isLoadingRecommend) return <SpinnerComponent />;

  return (
    <>
      <div className="w-full h-full flex">
        <div className=" w-[40%] bg-slate-200 h-full p-6 overflow-scroll max-h-[95vh]">
          <div>
            <CardATM
              numberCard={dataCardUser?.maTaiKhoan || ''}
              nameCard={dataCardUser?.hoTen || ''}
            />
            <MoneyUser
              money={dataCardUser?.soDu as string}
              classCss="w-[90%] mt-7 ml-2"
            ></MoneyUser>
            <Divider dashed type="horizontal" className="bg-sky-600" />
          </div>
        </div>
        <div className="w-[60%] h-full p-8  overflow-scroll max-h-[95vh]">
          <div>
            <div className="text-left text-sky-900 font-black text-lg mb-2 flex justify-between">
              <div>Danh sách người nhận</div>
              <Button
                type="primary"
                onClick={() => {
                  setIsOpenModalAdd(true);
                }}
                className="bg-blue-400 hover:text-white"
              >
                Thêm
              </Button>
            </div>
            <Table dataSource={dataUserRecommend} columns={columns} />
          </div>
          <div>
            <div className="text-left text-sky-900 font-black text-lg mb-2">Lịch sử giao dịch</div>
            <Table dataSource={dataHistory} columns={columnsHistory} />
          </div>
        </div>
      </div>
      <div>
        <Modal
          title="Thêm người thân"
          centered
          open={isOpenModalAdd}
          okType="primary"
          footer={null}
          onOk={() => setIsOpenModalAdd(false)}
          onCancel={() => setIsOpenModalAdd(false)}
        >
          <Form {...formItemLayout} className="mt-6" form={form} onFinish={() => {}}>
            <Form.Item label="Tên gọi" name="NameTo">
              <Input />
            </Form.Item>
            <Form.Item label="Số tài khoản" name="numberCard">
              <Input />
            </Form.Item>
            <Form.Item label="Ngân hàng" name="Bank">
              <Input />
            </Form.Item>
            <Form.Item className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button bg-sky-600 mt-8"
              >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
