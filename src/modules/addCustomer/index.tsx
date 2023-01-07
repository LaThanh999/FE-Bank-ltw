import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, Modal, notification } from 'antd';
import { AddCustomerServer } from 'services/account';
import { ParamsAddCustomerDTO } from 'types/account';

export const AddCustomer = () => {
  const [form] = Form.useForm<ParamsAddCustomerDTO>();

  const { mutate: mutateAdd } = useMutation(AddCustomerServer);

  const onFinish = (values: ParamsAddCustomerDTO) => {
    Modal.confirm({
      zIndex: 10,
      title: 'Xác nhận',
      content: 'Bạn có chắc chắn ?',
      okText: 'Xác nhận',
      okType: 'default',
      centered: true,
      cancelText: 'Hủy',
      onOk: () => {
        mutateAdd(values, {
          onSuccess: ({ status }) => {
            if (status === 1) {
              notification.success({
                message: `Thành công`,
                description: `Tạo tài khoản thành công`,
                placement: 'bottomRight',
              });
              form.resetFields();
            } else {
              notification.error({
                message: `Thất bại`,
                description: `Tạo tài khoản không thành công`,
                placement: 'bottomRight',
              });
            }
          },
          onError: (err: any) => {
            let description;
            if (err.response.data.status === 2) {
              description = `Tên đăng nhập hoặc email đã được sử dụng`;
            } else description = `Tạo tài khoản không thành công`;
            notification.error({
              message: `Thất bại`,
              description,
              placement: 'bottomRight',
            });
          },
        });
      },
    });
  };

  return (
    <div className="w-full h-full flex">
      <div className=" w-full bg-slate-200 h-full p-6 overflow-scroll max-h-[95vh]">
        <div className="bg-white w-full h-full rounded-lg flex flex-col items-center justify-center">
          <div className="text-sky-900 font-black text-lg mb-6 ">Tạo tài khoản</div>
          <Form labelCol={{ span: 9 }} wrapperCol={{ span: 26 }} form={form} onFinish={onFinish}>
            <Form.Item
              required
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập',
                },
              ]}
              label="Tên đăng nhập"
              name="username"
            >
              <Input />
            </Form.Item>
            <Form.Item
              required
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ và tên',
                },
              ]}
              label="Họ và tên"
              name="fullName"
            >
              <Input />
            </Form.Item>
            <Form.Item
              required
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập email',
                },
                { type: 'email', message: 'Vui lòng nhập email' },
              ]}
              label="Email"
              name="email"
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              required
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại',
                },
                { type: 'number' },
              ]}
              label="Số điện thoại"
              name="phone"
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button bg-sky-600 mt-8"
              >
                Tạo tài khoản
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
