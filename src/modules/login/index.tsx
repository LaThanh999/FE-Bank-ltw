import { Button, Form, Input } from 'antd';

export default function Login() {
  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;
    console.log(username, password);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
          onFinishFailed={onFinishFailed}
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
