import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, notification } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';
import { ACCESS_TOKEN, CARD_ID, REFRESH_TOKEN, USER_ID } from 'constants/common';
import { useRouter } from 'hooks/useRouter';
import { useRef } from 'react';
import { LoginServer } from 'services/auth';

export default function Login() {
  const { mutate } = useMutation(LoginServer);
  const router = useRouter();
  const captchaRef = useRef(null);

  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;

    const formatCaptcha = captchaRef as any;

    const token = formatCaptcha.current.getValue();

    if (token) {
      mutate(
        {
          username,
          password,
        },
        {
          onSuccess: (data) => {
            localStorage.setItem(ACCESS_TOKEN, data.accessToken);
            localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
            localStorage.setItem(USER_ID, String(data.userId));
            localStorage.setItem(CARD_ID, data.maTaiKhoan);
            router.push('/home');
          },
          onError: () => {
            notification.error({
              message: `Đăng nhập thất bại`,
              description: `Vui lòng kiểm tra lại tài khoản mật khẩu`,
              placement: 'bottomRight',
            });
          },
        },
      );
    } else {
      notification.error({
        message: `Vui lòng xác nhận Captcha`,
        placement: 'bottomRight',
      });
    }
  };

  return (
    <div className="flex">
      <div
        className="bg-[url('https://png.pngtree.com/background/20210715/original/pngtree-green-simple-leafy-bank-card-background-picture-image_1283618.jpg')]
       bg-contain w-[45vw] h-screen"
      ></div>
      <div className="w-[55vw] bg-[#eeeee4] h-screen flex justify-center items-center ">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="mb-1 text-2xl font-semibold">Đăng nhập</div>
          </Form.Item>
          <Form.Item
            className="w-[450px]"
            label="Tài khoản / Email"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản hoặc email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="flex justify-end">
            <ReCAPTCHA sitekey="6Lf_qIcjAAAAAANkzfwrMXTgZFHeEb6pl7ufaqlT" ref={captchaRef} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="bg-primary" type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
