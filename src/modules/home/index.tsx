import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Divider, Form, Input, Modal, notification, Select, Space, Table } from 'antd';
import { CardATM } from 'components/CardATM';
import { SpinnerComponent } from 'components/Common/Spin';
import { MoneyUser } from 'components/MoneyUser';
import { CARD_ID, ID_BANK_LTW, USER_ID } from 'constants/common';
import { formatNumberCurrent } from 'helper/number';
import { useSocket } from 'hooks/useSocket';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  AddUserRecommendServer,
  EditUserRecommendServer,
  GetHistoryServer,
  GetMoneyUserServer,
  GetUserByNumberCardServer,
  GetUserRecommendBuyAccountServer,
  GetUserRecommendServer,
  RemoveUserRecommendServer,
} from 'services/account';
import { GetBanksServer } from 'services/bank';

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

export default function Home() {
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
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <button
            className="underline italic font-medium text-sky-600 hover:text-sky-800"
            onClick={() => {
              editUserRecommend(record.id, record.numberCardFrom);
            }}
          >
            Sửa
          </button>
          <button
            className="underline italic font-medium text-sky-600 hover:text-sky-800"
            onClick={() => {
              removeUserRecommend(record.id);
            }}
          >
            Hủy
          </button>
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const userId = localStorage.getItem(USER_ID);
  const carId = localStorage.getItem(CARD_ID);

  const { messageReceiveSocket } = useSocket();

  const {
    data: dataCardUser,
    isLoading: isLoadingGetMoney,
    refetch: refetchGetMoney,
  } = useQuery(['getMoney'], () => GetMoneyUserServer(userId as string), {
    refetchOnWindowFocus: false,
  });
  const { data: dataHistories, isLoading: isLoadingHistory } = useQuery(
    ['getHistory'],
    () => GetHistoryServer({ cardNumber: carId as string }),
    {
      refetchOnWindowFocus: false,
    },
  );
  const {
    data: dataRecommend,
    isLoading: isLoadingRecommend,
    refetch: refetchDataRecommend,
  } = useQuery(
    ['getUserRecommend'],
    () => GetUserRecommendServer({ accountNumber: carId as string }),
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    refetchGetMoney();
  }, [messageReceiveSocket]);

  const { data: dataBanks } = useQuery(['getBanks'], () => GetBanksServer(), {
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateAddUserRecommend } = useMutation(AddUserRecommendServer);
  const { mutate: mutateRemoveUserRecommend } = useMutation(RemoveUserRecommendServer);
  const { mutate: mutateEditUserRecommend } = useMutation(EditUserRecommendServer);
  const { mutate: mutateCheckUserRecommend } = useMutation(GetUserRecommendBuyAccountServer);
  const { mutate: mutateGetUser } = useMutation(GetUserByNumberCardServer);

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
  const [dataUserRecommend, setDataRecommend] = useState<
    {
      key: number;
      name: string;
      address: string;
      nameBank: string;
      bank: string;
      id: number;
      numberCardFrom: string;
    }[]
  >([]);

  useEffect(() => {
    if (!isOpenModalAdd) {
      form.resetFields();
    }
  }, [isOpenModalAdd]);

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

  useEffect(() => {
    const dataTemp = dataRecommend?.map((el, index) => {
      return {
        key: index,
        name: el.tenGoiNho,
        address: el.maTaiKhoanNguoiNhan,
        bank: el.tenNganHang,
        nameBank: el.hoTenNguoiNhan,
        id: el.id,
        numberCardFrom: el.maTaiKhoanNguoiNhan,
      };
    });
    if (dataTemp) setDataRecommend(dataTemp);
  }, [dataRecommend]);

  const addUserRecommend = (values: {
    nameRecommend: string;
    numberCard: string;
    bank: string;
  }) => {
    const { nameRecommend, numberCard, bank } = values;

    mutateGetUser(numberCard, {
      onSuccess: (user) => {
        if (user.id || user.hoTen) {
          mutateCheckUserRecommend(
            {
              accountFrom: carId as string,
              accountTo: numberCard,
            },
            {
              onSuccess: (data) => {
                if (data.id) {
                  notification.error({
                    message: `Thất bại`,
                    description: `Người dùng đã được lưu`,
                    placement: 'bottomRight',
                  });
                } else {
                  mutateAddUserRecommend(
                    {
                      maTaiKhoanNguoiChuyen: carId as string,
                      maTaiKhoanNguoiNhan: numberCard,
                      tenGoiNho: nameRecommend || user.hoTen,
                      idNganHang: bank,
                      // eslint-disable-next-line camelcase
                      create_at: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
                    },
                    {
                      onSuccess: () => {
                        notification.success({
                          message: `Thành công`,
                          description: `Tạo thành công`,
                          placement: 'bottomRight',
                        });
                        refetchDataRecommend();
                        setIsOpenModalAdd(false);
                      },
                      onError: () => {
                        notification.error({
                          message: `Thất bại`,
                          description: `Tạo thất bại`,
                          placement: 'bottomRight',
                        });
                      },
                    },
                  );
                }
              },
            },
          );
        } else {
          notification.error({
            message: `Thất bại`,
            description: `Vui lòng kiểm tra lại Số Tài Khoản`,
            placement: 'bottomRight',
          });
        }
      },
      onError: () => {
        notification.error({
          message: `Thất bại`,
          description: `Vui lòng kiểm tra lại Số Tài Khoản`,
          placement: 'bottomRight',
        });
      },
    });
  };

  const removeUserRecommend = (id: string) => {
    Modal.confirm({
      zIndex: 10,
      title: 'Xác nhận',
      content: 'Bạn có muốn xóa ?',
      okText: 'Xác nhận',
      okType: 'default',
      centered: true,
      cancelText: 'Hủy',
      onOk: () => {
        mutateRemoveUserRecommend(id, {
          onSuccess: () => {
            notification.success({
              message: `Thành công`,
              description: `Xóa thành công`,
              placement: 'bottomRight',
            });
            refetchDataRecommend();
            setIsOpenModalAdd(false);
          },
          onError: () => {
            notification.error({
              message: `Thất bại`,
              description: `Xóa thất bại`,
              placement: 'bottomRight',
            });
          },
        });
      },
    });
  };

  const editUserRecommend = (id: string, numberAccountTo: string) => {
    mutateCheckUserRecommend(
      {
        accountFrom: carId as string,
        accountTo: numberAccountTo,
      },
      {
        onSuccess: (data) => {
          if (data.id) {
            form.setFieldsValue({
              nameRecommendEdit: data.tenGoiNho,
              numberCardEdit: data.maTaiKhoanNguoiNhan,
              bankEdit: data.idNganHang,
              idUserRecommend: data.id,
              nameRecommend: data.hoTenNguoiNhan,
            });
          }
        },
      },
    );
    setIsOpenModalEdit(true);
  };

  const submitEditUserRecommend = (values: {
    nameRecommendEdit: string;
    idUserRecommend: string;
    nameRecommend: string;
  }) => {
    const { nameRecommendEdit, idUserRecommend, nameRecommend } = values;
    mutateEditUserRecommend(
      {
        id: idUserRecommend,
        name: nameRecommendEdit || nameRecommend,
      },
      {
        onSuccess: () => {
          notification.success({
            message: `Thành công`,
            description: `Sửa thành công`,
            placement: 'bottomRight',
          });
          refetchDataRecommend();
          setIsOpenModalEdit(false);
        },
        onError: () => {
          notification.error({
            message: `Thất bại`,
            description: `Sửa thất bại`,
            placement: 'bottomRight',
          });
        },
      },
    );
  };

  if (isLoadingGetMoney || isLoadingHistory || isLoadingRecommend) return <SpinnerComponent />;

  return (
    <>
      <div className="w-full h-full flex">
        <div className=" w-[45%] bg-slate-200 h-full p-6 overflow-scroll max-h-[95vh]">
          <>
            <CardATM
              numberCard={dataCardUser?.maTaiKhoan || ''}
              nameCard={dataCardUser?.hoTen || ''}
            />
            <MoneyUser
              money={dataCardUser?.soDu as string}
              classCss="w-[90%] mt-7 ml-2"
            ></MoneyUser>
            <Divider dashed type="horizontal" className="bg-sky-600" />
          </>
          <div className="text-left text-sky-900 font-black text-lg mb-2 flex justify-between">
            <div>Danh sách người quen</div>
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
        <div className="w-[55%] h-full p-8  overflow-scroll max-h-[95vh]">
          <div className="text-left text-sky-900 font-black text-lg mb-2">Lịch sử giao dịch</div>
          <Table dataSource={dataHistory} columns={columnsHistory} />
        </div>
      </div>
      {/* Modal Add */}
      <Modal
        title="Thêm người thân"
        centered
        open={isOpenModalAdd}
        okType="primary"
        footer={null}
        onOk={() => setIsOpenModalAdd(false)}
        onCancel={() => setIsOpenModalAdd(false)}
      >
        <Form {...formItemLayout} className="mt-6" form={form} onFinish={addUserRecommend}>
          <Form.Item label="Tên gọi" name="nameRecommend">
            <Input />
          </Form.Item>
          <Form.Item
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số tài khoản',
              },
            ]}
            label="Số tài khoản"
            name="numberCard"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn ngân hàng',
              },
            ]}
            initialValue={ID_BANK_LTW}
            label="Ngân hàng"
            name="bank"
          >
            <Select
              options={dataBanks?.map((el) => ({
                value: el.id,
                label: el.tenNganHang,
              }))}
              defaultValue={ID_BANK_LTW}
            ></Select>
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" className="login-form-button bg-sky-600 mt-8">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal Edit */}
      <Modal
        title="Sửa thông tin người thân"
        centered
        open={isOpenModalEdit}
        okType="primary"
        footer={null}
        onOk={() => setIsOpenModalEdit(false)}
        onCancel={() => setIsOpenModalEdit(false)}
      >
        <Form {...formItemLayout} className="mt-6" form={form} onFinish={submitEditUserRecommend}>
          <Form.Item hidden label="id" name="idUserRecommend">
            <Input hidden />
          </Form.Item>
          <Form.Item hidden label="id" name="nameRecommend">
            <Input hidden />
          </Form.Item>
          <Form.Item label="Tên gọi" name="nameRecommendEdit">
            <Input />
          </Form.Item>
          <Form.Item label="Số tài khoản" name="numberCardEdit">
            <Input disabled type="number" />
          </Form.Item>
          <Form.Item initialValue={ID_BANK_LTW} label="Ngân hàng" name="bankEdit">
            <Select
              disabled
              options={dataBanks?.map((el) => ({
                value: el.id,
                label: el.tenNganHang,
              }))}
              defaultValue={ID_BANK_LTW}
            ></Select>
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" className="login-form-button bg-sky-600 mt-8">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
