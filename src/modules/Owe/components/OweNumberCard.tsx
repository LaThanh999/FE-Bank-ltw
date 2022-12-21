import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
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

export const OweNumberCard = () => {
  const [form] = Form.useForm();

  return (
    <Form {...formItemLayout} form={form} onFinish={() => {}}>
      <Form.Item label="Số tài khoản" name="numberCard">
        <Input />
      </Form.Item>
      <Form.Item label="Ngân hàng" name="Bank">
        <Input />
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
      <Form.Item label="Nội dung" name="Description">
        <TextArea />
      </Form.Item>
      <Form.Item className="flex justify-center">
        <Button type="primary" htmlType="submit" className="login-form-button bg-sky-600 mt-8">
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );
};
