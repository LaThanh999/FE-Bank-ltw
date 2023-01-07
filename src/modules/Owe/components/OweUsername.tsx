import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, notification, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CARD_ID } from 'constants/common';
import { useSocket } from 'hooks/useSocket';
import { GetUserRecommendServer } from 'services/account';
import { AddOweServer } from 'services/owe';
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

export const OweUsername = ({
  callBack,
  dataBanks,
}: {
  callBack: () => unknown;
  dataBanks: BankDTO[] | undefined;
}) => {
  const [form] = Form.useForm();
  const carId = localStorage.getItem(CARD_ID) as string;
  const { sendSocket } = useSocket();

  const { data: dataRecommend } = useQuery(
    ['getUserRecommend'],
    () => GetUserRecommendServer({ accountNumber: carId as string }),
    {
      refetchOnWindowFocus: false,
    },
  );

  const { mutate: mutateAdd } = useMutation(AddOweServer);

  const selectedUserRecommend = (value: number) => {
    const user = dataRecommend?.find((el) => (el.id = value));
    form.setFieldsValue({
      numberCard: user?.maTaiKhoanNguoiNhan,
      bank: user?.idNganHang,
      nameTo: user?.hoTenNguoiNhan,
    });
  };

  const onFinish = (values: {
    numberCard: string;
    bank: string;
    nameTo: string;
    numberOfMoney: number;
    description: string;
  }) => {
    const { numberCard, numberOfMoney, description } = values;

    if (numberCard === carId) {
      notification.error({
        message: `Thất bại`,
        description: `Vui lòng chọn tài khoản khác`,
        placement: 'bottomRight',
      });
      return;
    }

    mutateAdd(
      {
        maTaiKhoanChuNo: carId as string,
        maTaiKhoanNguoiNo: numberCard,
        soTienChuyen: numberOfMoney,
        noiDung: description,
      },
      {
        onSuccess: () => {
          sendSocket('update owe username');
          notification.success({
            message: `Thành công`,
            description: `Thêm thành công`,
            placement: 'bottomRight',
          });
          form.resetFields();
          callBack();
        },
        onError: () => {
          notification.error({
            message: `Thất bại`,
            description: `Thêm thất bại`,
            placement: 'bottomRight',
          });
        },
      },
    );
  };

  return (
    <Form {...formItemLayout} form={form} onFinish={onFinish}>
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
        name="numberOfMoney"
      >
        <InputNumber type="number" min="0" className="w-full" />
      </Form.Item>
      <Form.Item label="Nội dung" name="description">
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
