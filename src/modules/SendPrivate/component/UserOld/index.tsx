import { useQuery } from '@tanstack/react-query';
import { Button, Form, Input, Select } from 'antd';
import { CARD_ID } from 'constants/common';
import { useEffect } from 'react';
import { GetUserRecommendServer } from 'services/account';
import { BankDTO } from 'types/bank';

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

export const SendPrivateUserOld = ({
  callBack,
  dataBanks,
}: {
  callBack: () => unknown;
  dataBanks: BankDTO[] | undefined;
}) => {
  const { TextArea } = Input;

  const [form] = Form.useForm();
  const carId = localStorage.getItem(CARD_ID) as string;

  const { data: dataRecommend } = useQuery(
    ['getUserRecommend'],
    () => GetUserRecommendServer(carId as string),
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    form.setFieldsValue({ numberCard: '1' });
  }, []);

  const onFinish = (value: any) => {
    console.log('value', value);
  };

  const selectedUserRecommend = (value: number) => {
    const user = dataRecommend?.find((el) => (el.id = value));
    form.setFieldsValue({
      numberCard: user?.maTaiKhoanNguoiNhan,
      bank: user?.idNganHang,
      nameTo: user?.hoTenNguoiNhan,
    });
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
          <Form.Item label="Ngân hàng" name="bank">
            <Select
              options={dataBanks?.map((el) => ({
                value: el.id,
                label: el.tenNganHang,
              }))}
              disabled
            ></Select>
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
            name="NumberOfMoney"
          >
            <Input min="0" type="number" />
          </Form.Item>
          <Form.Item label="Nội dung " name="Description">
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
            name="typeSend"
          >
            {/* <Select>
              <Option value="86">Người nhận trả</Option>
              <Option value="86">Người chuyển trả</Option>
            </Select> */}
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit" className="login-form-button bg-sky-600 mt-8">
              Chuyển tiền
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
