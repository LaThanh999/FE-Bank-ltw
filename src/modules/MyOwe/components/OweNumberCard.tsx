import { Button, Form, Input, InputNumber, notification, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CARD_ID } from 'constants/common';
import { BankDTO } from 'types/bank';
import { debounce } from 'lodash';
import { useMutation } from '@tanstack/react-query';
import { GetUserByNumberCardWithBankIdServer } from 'services/account';
import { AddOweServer } from 'services/owe';
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

export const OweNumberCard = ({
  callBack,
  dataBanks,
}: {
  callBack: () => unknown;
  dataBanks: BankDTO[] | undefined;
}) => {
  const [form] = Form.useForm();
  const carId = localStorage.getItem(CARD_ID) as string;

  const { mutate: mutateGetUser } = useMutation(GetUserByNumberCardWithBankIdServer);
  const { mutate: mutateAdd } = useMutation(AddOweServer);

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

  const onChangeNumberCard = () => {
    const numberCard = form.getFieldValue('numberCard') as string;
    const bank = form.getFieldValue('bank');
    if (numberCard === carId) {
      form.setFieldValue('nameTo', '');
      notification.error({
        message: `Thất bại`,
        description: `Không thể chọn tài khoản của mình`,
        placement: 'bottomRight',
      });
      return;
    }
    const onCallBack = debounce(() => {
      if (numberCard.toString().length === 10 && bank) {
        mutateGetUser(
          { numberCard, bankId: bank },
          {
            onSuccess: (data) => {
              if (data.id) {
                form.setFieldValue('nameTo', data.hoTen);
              } else {
                form.setFieldValue('nameTo', '');
                notification.error({
                  message: `Không tìm thấy thông tin tài khoản`,
                  description: `Vui lòng kiểm tra lại STK hoặc ngân hàng`,
                  placement: 'bottomRight',
                });
                return;
              }
            },
            onError: () => {
              form.setFieldValue('nameTo', '');
              notification.error({
                message: `Không tìm thấy thông tin tài khoản`,
                description: `Vui lòng kiểm tra lại STK hoặc ngân hàng`,
                placement: 'bottomRight',
              });
            },
          },
        );
      }
    }, 300);
    onCallBack();
  };

  return (
    <Form {...formItemLayout} form={form} onValuesChange={onChangeNumberCard} onFinish={onFinish}>
      <Form.Item
        required
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập số tài khoản',
          },
        ]}
        label="Số tài khoản"
        name="numberCard"
      >
        <Input />
      </Form.Item>
      <Form.Item
        required
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn ngân hàng',
          },
        ]}
        label="Ngân hàng"
        name="bank"
      >
        <Select
          options={dataBanks?.map((el) => ({
            value: el.id,
            label: el.tenNganHang,
          }))}
        ></Select>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập kiểm tra ',
          },
        ]}
        label="Họ và tên"
        name="nameTo"
      >
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
