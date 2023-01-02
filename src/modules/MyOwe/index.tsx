import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, Modal, notification, Space, Table } from 'antd';
import { CountDown } from 'components/Common/CountDown';
import { SpinnerComponent } from 'components/Common/Spin';
import { CARD_ID, timeExpiredMinutes } from 'constants/common';
import { formatNumberCurrent } from 'helper/number';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { TransferServer } from 'services/account';
import { isVerifyOTPTransferServer, sendOTPTransferServer } from 'services/otpTransfer';
import {
  EditStatusOweServer,
  GetOweByNumberAccountServer,
  RemoveOweRecommendServer,
} from 'services/owe';

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

export const MyOwe = () => {
  const carId = localStorage.getItem(CARD_ID);
  const [form] = Form.useForm();
  const [isOpenModalTransfer, setIsOpenModalTransfer] = useState(false);
  const [showInputOTP, setShowInputOTP] = useState(false);
  const [timeOTP, setTimeOTP] = useState<any>();
  const [expired, setExpired] = useState(false);

  const [dataIsOweState, setDataIsOweState] = useState<
    {
      key: number;
      name: string;
      numberCard: string;
      money: string;
      description: string;
      id: number;
      moneyFormat: string;
      cardFrom: string;
      cardTo: string;
      bankForm: string;
      bankTo: string;
      statusFormat: string;
      status: number;
    }[]
  >([]);

  const columnsIsOwe = [
    {
      title: 'Họ tên người nhắc',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'numberCard',
      key: 'numberCard',
    },
    {
      title: 'Số tiền',
      dataIndex: 'moneyFormat',
      key: 'money',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusFormat',
      key: 'statusFormat',
    },
    {
      title: 'Nội dung',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, data: any) => (
        <Space size="middle" className="flex justify-end">
          {data.status !== 1 && (
            <button
              className="underline italic font-medium text-sky-600 hover:text-sky-800"
              onClick={() => {
                onTranfer(data);
              }}
            >
              Thanh toán
            </button>
          )}

          <button
            className="underline italic font-medium text-sky-600 hover:text-sky-800"
            onClick={() => {
              removeOwe(data.id);
            }}
          >
            Huỷ
          </button>
        </Space>
      ),
    },
  ];

  const {
    data: dataIsOwe,
    isLoading: isLoadingDataIsOwe,
    refetch: refetchDataIsOwe,
  } = useQuery(
    ['getIsOwe'],
    () => GetOweByNumberAccountServer({ numberCard: carId as string, type: 2 }),
    {
      refetchOnWindowFocus: false,
    },
  );
  const { mutate: mutateRemoveUserRecommend } = useMutation(RemoveOweRecommendServer);
  const { mutate: mutateTransfer } = useMutation(TransferServer);
  const { mutate: mutateEditOwe } = useMutation(EditStatusOweServer);
  const { mutate: mutateSendOTP } = useMutation(sendOTPTransferServer);
  const { mutate: mutateVerifyOtp } = useMutation(isVerifyOTPTransferServer);

  useEffect(() => {
    const dataTemp = dataIsOwe?.map((el, index) => {
      return {
        key: index,
        name: el.hoTenChuNo as string,
        numberCard: el.maTaiKhoanChuNo,
        moneyFormat: `${formatNumberCurrent(el.soTienChuyen)} VND`,
        description: el.noiDung,
        id: el.id,
        money: el.soTienChuyen,
        bankForm: el.maNganHangNguoiNo,
        bankTo: el.maNganHangChuNo,
        cardFrom: el.maTaiKhoanNguoiNo,
        cardTo: el.maTaiKhoanChuNo,
        status: el.tinhTrang,
        statusFormat: el.tinhTrang === 0 ? 'Chưa thanh toán' : 'Đã thanh toán',
      };
    });
    if (dataTemp) setDataIsOweState(dataTemp);
  }, [dataIsOwe]);

  const removeOwe = (id: string) => {
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
              description: `Hủy thành công`,
              placement: 'bottomRight',
            });
            refetchDataIsOwe();
          },
          onError: () => {
            notification.error({
              message: `Thất bại`,
              description: `Hủy thất bại`,
              placement: 'bottomRight',
            });
          },
        });
      },
    });
  };

  const onTranfer = (data: any) => {
    form.setFieldsValue({
      cardFrom: data.cardFrom,
      cardTo: data.cardTo,
      bankTo: data.bankTo,
      bankFrom: data.bankForm,
      numberMoney: data.money,
      idOwe: data.id,
    });
    setIsOpenModalTransfer(true);
  };

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
                  mutateEditOwe(
                    { id: idOwe, status: 1 },
                    {
                      onSuccess: () => {
                        notification.success({
                          message: `Thành công`,
                          description: `Thanh toán thành công`,
                          placement: 'bottomRight',
                        });
                        refetchDataIsOwe();
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

  if (isLoadingDataIsOwe) return <SpinnerComponent />;

  return (
    <>
      <div className="w-full h-full flex p-8">
        <div className="overflow-auto flex flex-1 flex-col">
          <div className="text-left text-sky-900 font-black text-lg mb-2 flex justify-between">
            <div>Danh sách chưa thanh toán</div>
          </div>
          <Table dataSource={dataIsOweState} columns={columnsIsOwe} />
        </div>
      </div>
      <Modal
        afterClose={() => {
          setShowInputOTP(false);
          setExpired(false);
          form.resetFields();
        }}
        destroyOnClose
        title="Xác nhận thanh toán"
        centered
        open={isOpenModalTransfer}
        okType="primary"
        footer={null}
        onOk={() => setIsOpenModalTransfer(false)}
        onCancel={() => setIsOpenModalTransfer(false)}
      >
        {!showInputOTP && (
          <>
            <div className="text-center text-lg font-medium">
              Vui lòng nhập OTP để xác nhận thanh toán
            </div>
            <div
              className="text-center text-base underline text-cyan-800 cursor-pointer"
              onClick={sendOTP}
            >
              Gửi OTP qua Email của bạn
            </div>
          </>
        )}
        {showInputOTP && (
          <Form {...formItemLayout} className="mt-8" form={form} onFinish={submitTransfer}>
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
            <Form.Item hidden label="id" name="idOwe">
              <Input hidden />
            </Form.Item>
            <Form.Item hidden label="id" name="cardFrom">
              <Input hidden />
            </Form.Item>
            <Form.Item hidden label="id" name="cardTo">
              <Input hidden />
            </Form.Item>
            <Form.Item hidden label="id" name="bankTo">
              <Input hidden />
            </Form.Item>
            <Form.Item hidden label="id" name="bankFrom">
              <Input hidden />
            </Form.Item>
            <Form.Item hidden label="id" name="numberMoney">
              <Input hidden />
            </Form.Item>
            <Form.Item className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button bg-sky-600 mt-2"
              >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};
