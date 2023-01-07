import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, Modal, notification, Select } from 'antd';
import { CountDown } from 'components/Common/CountDown';
import { CARD_ID, ID_BANK_LTW, timeExpiredMinutes } from 'constants/common';
import moment from 'moment';
import { useState } from 'react';
import { GetUserRecommendServer, TransferServer } from 'services/account';
import { isVerifyOTPTransferServer, sendOTPTransferServer } from 'services/otpTransfer';

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

export const SendPrivateUserOld = ({ callBack }: { callBack: () => unknown }) => {
  const { TextArea } = Input;

  const [form] = Form.useForm();
  const carId = localStorage.getItem(CARD_ID) as string;

  const [isOpenModalTransfer, setIsOpenModalTransfer] = useState(false);
  const [showInputOTP, setShowInputOTP] = useState(false);
  const [timeOTP, setTimeOTP] = useState<any>();
  const [expired, setExpired] = useState(false);

  const { data: dataRecommend } = useQuery(
    ['getUserRecommend'],
    () => GetUserRecommendServer({ accountNumber: carId as string }),
    {
      refetchOnWindowFocus: false,
    },
  );

  const { mutate: mutateSendOTP } = useMutation(sendOTPTransferServer);
  const { mutate: mutateVerifyOtp } = useMutation(isVerifyOTPTransferServer);
  const { mutate: mutateTransfer } = useMutation(TransferServer);

  const onFinish = (values: {
    numberCard: string;
    bank: string;
    nameTo: string;
    numberOfMoney: number;
    description: string;
    typeTransfer: number;
  }) => {
    const { numberCard } = values;

    if (numberCard === carId) {
      notification.error({
        message: `Thất bại`,
        description: `Vui lòng chọn tài khoản khác`,
        placement: 'bottomRight',
      });
      return;
    } else {
      setIsOpenModalTransfer(true);
    }
  };

  const selectedUserRecommend = (value: number) => {
    const user = dataRecommend?.find((el) => el.id === value);
    form.setFieldsValue({
      numberCard: user?.maTaiKhoanNguoiNhan,
      bank: user?.idNganHang,
      nameTo: user?.hoTenNguoiNhan,
    });
  };

  const sendOTP = () => {
    const numberCardFrom = carId;
    const numberCardTo = form.getFieldValue('numberCard');
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
    const numberCardFrom = carId;
    const numberCardTo = form.getFieldValue('numberCard');
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

  const onTransfer = () => {
    const valueForm = form.getFieldsValue();
    const { numberCard, numberOfMoney, description, otp, typeTransfer } = valueForm;
    mutateVerifyOtp(
      {
        numberCardFrom: carId,
        numberCardTo: numberCard,
        inputOtp: otp,
      },
      {
        onSuccess: ({ otpVerified }: { otpVerified: boolean }) => {
          if (otpVerified) {
            mutateTransfer(
              {
                soTaiKhoanGui: carId,
                soTaiKhoanNhan: numberCard,
                soTien: numberOfMoney,
                noiDung: description,
                idNganHangNhan: ID_BANK_LTW,
                idNganHangGui: ID_BANK_LTW,
                idLoaiGiaoDich: 1,
                traPhi: typeTransfer,
              },
              {
                onSuccess: (data: any) => {
                  if (data.Status === 2) {
                    notification.success({
                      message: `Thành công`,
                      description: `Thanh toán thành công`,
                      placement: 'bottomRight',
                    });
                    callBack();
                    form.resetFields();
                  } else {
                    notification.error({
                      message: `Thất bại`,
                      description: `Thanh toán thất bại`,
                      placement: 'bottomRight',
                    });
                  }
                  setIsOpenModalTransfer(false);
                },
                onError: () => {
                  notification.error({
                    message: `Thất bại`,
                    description: `Thanh toán thất bại`,
                    placement: 'bottomRight',
                  });
                  setIsOpenModalTransfer(false);
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

  return (
    <div className="flex justify-center items-center">
      <div className="w-[75%] mt-8">
        <Form {...formItemLayout} form={form} className="login-form" onFinish={onFinish}>
          <Form.Item
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn người quen',
              },
            ]}
            label="Người quen"
            name="to"
          >
            <Select
              onSelect={selectedUserRecommend}
              options={dataRecommend?.map((el) => ({
                value: el.id,
                label: el.tenGoiNho,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item label="Số tài khoản" name="numberCard">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Họ và tên" name="nameTo">
            <Input disabled />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số tiền',
              },
            ]}
            label="Số tiền"
            name="numberOfMoney"
          >
            <Input min="0" type="number" />
          </Form.Item>
          <Form.Item label="Nội dung " name="description">
            <TextArea />
          </Form.Item>
          <Form.Item
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn hình thức thanh toán',
              },
            ]}
            label="Hình thức"
            name="typeTransfer"
          >
            <Select
              options={[
                {
                  value: 0,
                  label: ' Người nhận trả',
                },
                {
                  value: 1,
                  label: ' Người chuyển trả',
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit" className="login-form-button bg-sky-600 mt-8">
              Chuyển tiền
            </Button>
          </Form.Item>
        </Form>
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
          <Form {...formItemLayout} className="mt-8" form={form} onFinish={onTransfer}>
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
          </Form>
        )}
      </Modal>
    </div>
  );
};
