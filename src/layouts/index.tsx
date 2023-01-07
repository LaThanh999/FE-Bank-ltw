import React, { useEffect, useState } from 'react';
import { DesktopOutlined, UserOutlined, LaptopOutlined, MessageOutlined } from '@ant-design/icons';
import {
  Layout,
  Menu,
  theme,
  MenuProps,
  Badge,
  Popover,
  Divider,
  Button,
  Modal,
  Form,
  notification,
  InputNumber,
  Input,
} from 'antd';
import { useRouter } from 'hooks/useRouter';
import { Outlet } from 'react-router-dom';
import { CountDown } from 'components/Common/CountDown';
import {
  ACCESS_TOKEN,
  CARD_ID,
  ID_BANK_LTW,
  REFRESH_TOKEN,
  timeExpiredMinutes,
  TYPE,
  USER_TYPE,
} from 'constants/common';
import {
  AddNotifyOweServer,
  EditStatusOweServer,
  getNotifyOweServer,
  UpdateSeenNotifyOweServer,
} from 'services/owe';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSocket } from 'hooks/useSocket';
import clsx from 'clsx';
import { TransferServer } from 'services/account';
import moment from 'moment';
import { isVerifyOTPTransferServer, sendOTPTransferServer } from 'services/otpTransfer';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem({
  label,
  key,
  icon,
  children,
  path,
}: {
  label: React.ReactNode;
  key?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  path?: string;
}): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    path,
  } as MenuItem;
}

const itemsMenu: MenuItem[] = [
  getItem({
    label: 'Trang chủ',
    key: '1',
    icon: <DesktopOutlined />,
  }),
  getItem({
    label: 'Chuyển khoản',
    icon: <LaptopOutlined />,
    key: 'sub1',
    children: [
      getItem({ label: 'Nội bộ', key: '2' }),
      getItem({ label: 'Liên ngân hàng', key: '3' }),
    ],
  }),
  getItem({
    label: 'Nhắc nợ',
    key: '',
    icon: <DesktopOutlined />,
    children: [
      getItem({ label: 'Danh sách', key: '4' }),
      getItem({ label: 'Chưa thanh toán', key: '5' }),
    ],
  }),
  getItem({
    label: 'Cá nhân',
    key: '6',
    icon: <UserOutlined />,
  }),
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

const itemsEmployee: MenuItem[] = [
  getItem({
    label: 'Trang chủ',
    key: 'employee-1',
    icon: <DesktopOutlined />,
  }),
  getItem({
    label: 'Khách hàng',
    key: 'sub-employee-1',
    icon: <LaptopOutlined />,
    children: [
      getItem({ label: 'Chi tiết', key: 'employee-2' }),
      getItem({ label: 'Nạp tiền', key: 'employee-3' }),
      getItem({ label: 'Thêm khách hàng', key: 'employee-4' }),
    ],
  }),
  getItem({
    label: 'Cá nhân',
    key: 'sub-employee-2',
    icon: <LaptopOutlined />,
    children: [getItem({ label: 'Đăng xuất', key: 'employee-5' })],
  }),
];

const LayoutContainer = () => {
  const carId = localStorage.getItem(CARD_ID) as string;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const typeUser = localStorage.getItem(TYPE);
  const { messageReceiveSocket, sendSocket } = useSocket();

  const { data: dataNoti, refetch: refetchDataNoti } = useQuery(
    ['getNotify'],
    () => getNotifyOweServer({ numberCard: carId as string }),
    {
      refetchOnWindowFocus: false,
    },
  );

  const { mutate } = useMutation(UpdateSeenNotifyOweServer);

  useEffect(() => {
    refetchDataNoti();
  }, [messageReceiveSocket]);

  const keyPath = (value: string) => {
    switch (value) {
      case '/home':
        return '1';
      case '/send-private':
        return '2';
      case '/send-public':
        return '3';
      case '/owe':
        return '4';
      case '/my-owe':
        return '5';
      case '/account':
        return '6';
      default:
        return '1';
    }
  };

  const keyPathEmployee = (value: string) => {
    switch (value) {
      case '/home-employee':
        return 'employee-1';
      case '/customer-detail':
        return 'employee-2';
      case '/recharge-money':
        return 'employee-3';
      case '/add-customer':
        return 'employee-4';
      default:
        return 'employee-1';
    }
  };

  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [selectedItemEmployee, setSelectedItemEmployee] = useState<string[]>([]);

  useEffect(() => {
    setSelectedItem([keyPath(router.location.pathname)]);
    setSelectedItemEmployee([keyPathEmployee(router.location.pathname)]);
  }, [router.location]);

  const onClickMenu = (item: any) => {
    switch (item.key) {
      case '1':
        router.push('/home');
        return;
      case '2':
        router.push('/send-private');
        return;
      case '3':
        router.push('/send-public');
        return;
      case '4':
        router.push('/owe');
        return;
      case '5':
        router.push('/my-owe');
        return;
      case '6':
        router.push('/account');
        return;
      default:
        router.push('/home');
    }
  };

  const onClickMenuEmployee = (item: any) => {
    switch (item.key) {
      case 'employee-1':
        router.push('/home-employee');
        return;
      case 'employee-2':
        router.push('/customer-detail');
        return;
      case 'employee-3':
        router.push('/recharge-money');
        return;
      case 'employee-4':
        router.push('/add-customer');
        return;
      case 'employee-5':
        router.push('/login');
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        return;
      default:
        router.push('/home-employee');
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    mutate(
      { numberCard: carId },
      {
        onSuccess: () => {
          setTimeout(() => {
            refetchDataNoti();
          }, 1000);
        },
      },
    );
    setOpen(newOpen);
  };

  // action transfer

  const { mutate: mutateTransfer } = useMutation(TransferServer);
  const { mutate: mutateSendOTP } = useMutation(sendOTPTransferServer);
  const { mutate: mutateVerifyOtp } = useMutation(isVerifyOTPTransferServer);
  const { mutate: mutateAddNotify } = useMutation(AddNotifyOweServer);
  const { mutate: mutateEditOwe } = useMutation(EditStatusOweServer);

  const [isOpenModalTransfer, setIsOpenModalTransfer] = useState(false);
  const [showInputOTP, setShowInputOTP] = useState(false);
  const [timeOTP, setTimeOTP] = useState<any>();
  const [expired, setExpired] = useState(false);

  const [form] = Form.useForm();

  const submitTransfer = (values: any) => {
    const { otp, cardFrom, cardTo, bankTo, bankFrom, numberMoney, idOwe } = values;
    mutateVerifyOtp(
      {
        numberCardFrom: cardFrom,
        numberCardTo: cardTo,
        inputOtp: otp,
      },
      {
        onSuccess: ({ otpVerified }: { otpVerified: boolean }) => {
          if (otpVerified) {
            mutateTransfer(
              {
                soTaiKhoanGui: cardFrom,
                soTaiKhoanNhan: cardTo,
                soTien: numberMoney,
                noiDung: 'Thanh toán nhắc nợ',
                idNganHangNhan: bankTo,
                idNganHangGui: bankFrom,
                idLoaiGiaoDich: 1,
                traPhi: 1,
              },
              {
                onSuccess: () => {
                  mutateAddNotify(
                    {
                      numberCardFrom: cardFrom,
                      numberCardTo: cardTo,
                      numberOfMoney: numberMoney,
                    },
                    {
                      onSuccess: () => {
                        sendSocket('updated owe');
                      },
                    },
                  );
                  mutateEditOwe(
                    { id: idOwe, status: 1 },
                    {
                      onSuccess: () => {
                        notification.success({
                          message: `Thành công`,
                          description: `Thanh toán thành công`,
                          placement: 'bottomRight',
                        });
                        setIsOpenModalTransfer(false);
                      },
                      onError: () => {
                        notification.error({
                          message: `Thất bại`,
                          description: `Thanh toán thất bại`,
                          placement: 'bottomRight',
                        });
                      },
                    },
                  );
                },
                onError: () => {
                  notification.error({
                    message: `Thất bại`,
                    description: `Thanh toán thất bại`,
                    placement: 'bottomRight',
                  });
                },
              },
            );
          } else {
            form.setFieldValue('otp', null);
            notification.error({
              message: `OTP không đúng`,
              description: `Vui lòng nhập lại OTP`,
              placement: 'bottomRight',
            });
          }
        },
        onError: () => {
          form.setFieldValue('otp', null);
          notification.error({
            message: `OTP không đúng`,
            description: `Vui lòng nhập lại OTP`,
            placement: 'bottomRight',
          });
        },
      },
    );
  };

  const sendOTP = () => {
    const numberCardFrom = form.getFieldValue('cardFrom');
    const numberCardTo = form.getFieldValue('cardTo');
    mutateSendOTP(
      {
        numberCardFrom,
        numberCardTo,
      },
      {
        onSuccess: () => {
          setShowInputOTP(true);
          setTimeOTP(
            new Date(moment().add(timeExpiredMinutes, 'minutes').add(1, 'seconds').format()),
          );
        },
        onError: () => {
          notification.error({
            message: `Thất bại`,
            description: `Gửi OTP thất bại`,
            placement: 'bottomRight',
          });
        },
      },
    );
  };

  const reSendOTP = () => {
    const numberCardFrom = form.getFieldValue('cardFrom');
    const numberCardTo = form.getFieldValue('cardTo');
    mutateSendOTP(
      {
        numberCardFrom,
        numberCardTo,
      },
      {
        onSuccess: () => {
          setTimeOTP(
            new Date(moment().add(timeExpiredMinutes, 'minutes').add(1, 'seconds').format()),
          );
          setExpired(false);
        },
        onError: () => {
          notification.error({
            message: `Thất bại`,
            description: `Gửi OTP thất bại`,
            placement: 'bottomRight',
          });
        },
      },
    );
  };

  const submitTransferOwe = (data: any) => {
    setIsOpenModalTransfer(true);
    form.setFieldsValue(
      form.setFieldsValue({
        idOwe: data.idOwe,
        cardFrom: data.numberCardTo,
        cardTo: data.numberCardFrom,
        nameTo: data.hoTenNguoiGui,
        bankTo: ID_BANK_LTW,
        bankFrom: ID_BANK_LTW,
        numberMoney: data.money,
        email: data.email,
      }),
    );
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Popover
            content={
              dataNoti &&
              dataNoti.length > 0 && (
                <div className="w-[350px] max-h-[500px] overflow-auto">
                  <Divider dashed className="bg-sky-600" />
                  {dataNoti.map((el, index) => (
                    <div
                      key={index}
                      className={clsx('flex p-1', {
                        ' bg-sky-100 ': el.isSeen === 0,
                      })}
                    >
                      <div className="tex-base font-medium mr-2"> Từ {el.hoTenNguoiGui}: </div>
                      <div className="tex-base font-normal">{el.message}</div>
                      {el.type === 0 && el.isSeen === 0 && (
                        <Button
                          type="primary"
                          className="login-form-button bg-sky-600 mt-3"
                          onClick={() => {
                            submitTransferOwe(el);
                          }}
                        >
                          Thanh toán
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )
            }
            title="Thông báo"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <div
              style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}
              className="flex justify-center items-center text-white 
             font-bold text-lg rounded-lg cursor-pointer"
            >
              <Badge size="small" count={dataNoti?.filter((item) => item.isSeen === 0).length}>
                <div className="flex">
                  <div className="text-white font-bold text-lg mr-2">Thông báo</div>
                  {dataNoti && dataNoti.length > 0 && (
                    <MessageOutlined style={{ fontSize: '25px', color: '#08c' }} />
                  )}
                </div>
              </Badge>
            </div>
          </Popover>
          {Number(typeUser) === USER_TYPE.customer && (
            <Menu
              onClick={onClickMenu}
              theme="dark"
              selectedKeys={selectedItem}
              defaultSelectedKeys={[itemsMenu[0]?.key as string]}
              mode="inline"
              items={itemsMenu}
            ></Menu>
          )}
          {Number(typeUser) === USER_TYPE.employee && (
            <Menu
              onClick={onClickMenuEmployee}
              theme="dark"
              selectedKeys={selectedItemEmployee}
              defaultSelectedKeys={[itemsEmployee[0]?.key as string]}
              mode="inline"
              items={itemsEmployee}
            ></Menu>
          )}
        </Sider>
        <Layout className="site-layout" hasSider={false}>
          <Content style={{ margin: '20px' }}>
            <div
              style={{
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: '10px',
              }}
              className="h-full overflow-auto"
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <Modal
        afterClose={() => {}}
        destroyOnClose
        title="Xác nhận thanh toán"
        centered
        open={isOpenModalTransfer}
        okType="primary"
        footer={null}
        onOk={() => setIsOpenModalTransfer(false)}
        onCancel={() => setIsOpenModalTransfer(false)}
      >
        <Form {...formItemLayout} className="mt-8" form={form} onFinish={submitTransfer}>
          <Form.Item hidden label="id" name="idOwe">
            <Input hidden />
          </Form.Item>
          <Form.Item hidden label="Email" name="email">
            <Input hidden />
          </Form.Item>
          <Form.Item hidden label="id" name="cardFrom">
            <Input hidden />
          </Form.Item>
          <Form.Item label="Tên người nhận" name="nameTo">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Số tài khoản người nhận" name="cardTo">
            <Input disabled />
          </Form.Item>
          <Form.Item hidden label="id" name="bankTo">
            <Input hidden />
          </Form.Item>
          <Form.Item hidden label="id" name="bankFrom">
            <Input hidden />
          </Form.Item>
          <Form.Item label="Số tiền" name="numberMoney">
            <Input disabled />
          </Form.Item>
          {!showInputOTP && (
            <div className="flex justify-center flex-col w-full" id="111">
              <div className="text-center text-base font-medium">
                Vui lòng nhập OTP để xác nhận thanh toán
              </div>
              <div
                className="text-center text-base underline text-cyan-800 cursor-pointer"
                onClick={sendOTP}
              >
                Gửi OTP qua Email của bạn
              </div>
            </div>
          )}
          {showInputOTP && (
            <>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập OTP',
                  },
                ]}
                label="OTP"
                name="otp"
              >
                <InputNumber className="w-full" type="number" placeholder="Nhập OTP" />
              </Form.Item>
              <div className="flex items-center justify-center mt-1">
                <CountDown timeOTP={timeOTP} setExpired={setExpired} />
                <Button disabled={!expired} type="link">
                  <div className="underline" onClick={reSendOTP}>
                    Gửi lại OTP
                  </div>
                </Button>
              </div>
              <Form.Item className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button bg-sky-600 mt-2"
                >
                  Xác nhận
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default LayoutContainer;
