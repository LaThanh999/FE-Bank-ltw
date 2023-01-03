import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, notification } from 'antd';
import { useRouter } from 'hooks/useRouter';
import { useState } from 'react';
import {
  isVerifyOTPForgotPasswordServer,
  sendOTPForgotPasswordServer,
  updateForgotPassWordServer,
} from 'services/auth';

export default function ForgotPassword() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const { mutate: mutateSendOTP } = useMutation(sendOTPForgotPasswordServer);
  const { mutate: mutateCheckOTP } = useMutation(isVerifyOTPForgotPasswordServer);
  const { mutate: mutateUpdatePassword } = useMutation(updateForgotPassWordServer);

  const sendOTP = (values: any) => {
    const { username } = values;
    mutateSendOTP(
      { username },
      {
        onSuccess: (data) => {
          if (data.status === 1) {
            setIsSendOtp(true);
          }
        },
        onError: () => {
          notification.error({
            message: `Thất bại`,
            description: `Vui lòng kiểm tra lại thông tin`,
            placement: 'bottomRight',
          });
        },
      },
    );
  };
  const checkOTP = (values: any) => {
    const { username, inputOtp } = values;
    mutateCheckOTP(
      {
        username,
        inputOtp,
      },
      {
        onSuccess: (data) => {
          if (data.otpVerified) {
            setOtpVerified(true);
          } else {
            notification.error({
              message: `Thất bại`,
              description: `Vui lòng kiểm tra OTP`,
              placement: 'bottomRight',
            });
          }
        },
        onError: () => {
          notification.error({
            message: `Thất bại`,
            description: `Vui lòng kiểm tra OTP`,
            placement: 'bottomRight',
          });
        },
      },
    );
  };

  const updatePassword = (values: any) => {
    const { username, inputOtp, password, passwordConfirm } = values;
    if (password !== passwordConfirm) {
      notification.error({
        message: `Thất bại`,
        description: `Vui lòng kiểm tra lại mật khẩu xác nhận`,
        placement: 'bottomRight',
      });
      return;
    }
    mutateUpdatePassword(
      {
        username,
        inputOtp,
        password,
      },
      {
        onSuccess: (data) => {
          if (data.status === 1) {
            notification.success({
              message: `Thành công`,
              description: `Cập nhật mật khẩu thành công`,
              placement: 'bottomRight',
            });
            router.push('/login');
          } else {
            notification.error({
              message: `Thất bại`,
              description: `Vui lòng kiểm tra lại thông tin`,
              placement: 'bottomRight',
            });
          }
        },
        onError: () => {
          notification.error({
            message: `Thất bại`,
            description: `Vui lòng kiểm tra lại thông tin`,
            placement: 'bottomRight',
          });
        },
      },
    );
  };

  return (
    <div className="flex">
      <div
        className="bg-[url('https://png.pngtree.com/background/20210715/original/pngtree-green-simple-leafy-bank-card-background-picture-image_1283618.jpg')]
       bg-contain w-[45vw] h-screen"
      ></div>
      <div className="w-[55vw] bg-[#eeeee4] h-screen flex justify-center items-center ">
        {!isSendOtp && (
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={sendOTP}
            autoComplete="off"
          >
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div className="mb-1 text-2xl font-semibold">Quên mật khẩu</div>
            </Form.Item>
            <Form.Item
              className="w-[450px]"
              label="Số tài khoản / Email"
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập số tài khoản hoặc email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item className="flex justify-end">
              <Button
                type="link"
                className="underline"
                onClick={() => {
                  router.push('/login');
                }}
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button className="bg-primary" type="primary" htmlType="submit">
                Gửi OTP
              </Button>
            </Form.Item>
          </Form>
        )}
        {isSendOtp && !otpVerified && (
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={checkOTP}
            autoComplete="off"
          >
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div className="mb-1 text-2xl font-semibold">Quên mật khẩu</div>
            </Form.Item>
            <Form.Item
              className="w-[450px]"
              label="Số tài khoản / Email"
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập số tài khoản hoặc email!' }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập OTP',
                },
              ]}
              label="OTP"
              name="inputOtp"
            >
              <InputNumber className="w-full" type="number" placeholder="Nhập OTP" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button className="bg-primary" type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        )}
        {isSendOtp && otpVerified && (
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={updatePassword}
            autoComplete="off"
          >
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div className="mb-1 text-2xl font-semibold">Quên mật khẩu</div>
            </Form.Item>
            <Form.Item
              hidden
              className="w-[450px]"
              label="Số tài khoản / Email"
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập số tài khoản hoặc email!' }]}
            >
              <Input hidden />
            </Form.Item>
            <Form.Item
              hidden
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập OTP',
                },
              ]}
              label="OTP"
              name="inputOtp"
            >
              <InputNumber hidden className="w-full" type="number" placeholder="Nhập OTP" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Mật khẩu xác nhận"
              name="passwordConfirm"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu xác nhận!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button className="bg-primary" type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}
