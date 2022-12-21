import { Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';

export const SendPrivateUserNew = () => {
  const { Option } = Select;
  const { TextArea } = Input;

  const [form] = Form.useForm();

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

  useEffect(() => {
    form.setFieldsValue({ numberCard: '1' });
  }, []);

  const onFinish = (value: any) => {
    console.log('value', value);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[50%] mt-8">
        <Form {...formItemLayout} form={form} className="login-form" onFinish={onFinish}>
          <Form.Item
            required
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn tài khoản nguồn',
              },
            ]}
            label="Tài khoản nguồn"
            name="from"
          >
            <Select>
              <Option value="86">1234 567 789</Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số tiền',
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
                message: 'Vui lòng chọn Ngân hàng',
              },
            ]}
            label="Ngân hàng"
            name="Bank"
          >
            <Select>
              <Option value="86">1234 567 789</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Họ và tên" name="NameTo">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Email" name="Email">
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
            name="NumberOfMoney"
          >
            <Input min="0" type="number" />
          </Form.Item>
          <Form.Item label="Nội dung chuyển tiền" name="Description">
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
            label="Hình thức thanh toán"
            name="typeSend"
          >
            <Select>
              <Option value="86">Người nhận trả</Option>
              <Option value="86">Người chuyển trả</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button bg-sky-600 mt-8">
              Chuyển tiền
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
