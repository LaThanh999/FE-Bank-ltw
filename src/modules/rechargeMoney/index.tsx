import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, notification } from 'antd';
import { debounce } from 'lodash';
import { AddMoneyCustomerServer, GetUserByNumberCardOrEmailPhone } from 'services/account';

export const RechargeMoney = () => {
  const [form] = Form.useForm();

  const { mutate: mutateAddMoney } = useMutation(AddMoneyCustomerServer);
  const { mutate: mutateGetInfo } = useMutation(GetUserByNumberCardOrEmailPhone);

  const onValuesChange = (value: any) => {
    const input = value.target.value;
    const onCallBack = debounce(() => {
      mutateGetInfo(
        { inputSearch: input },
        {
          onSuccess: (data) => {
            form.setFieldValue('name', data.hoTen);
            form.setFieldValue('numberCard', data.maTaiKhoan);
          },
          onError: () => {
            form.resetFields();
          },
        },
      );
    }, 500);
    onCallBack();
  };

  const onFinish = (values: any) => {
    const { numberOfMoney, numberCard } = values;
    mutateAddMoney(
      {
        numberOfMoney,
        numberCard,
      },
      {
        onSuccess: ({ status }) => {
          if (status === 1) {
            notification.success({
              message: `Thành công`,
              description: `Nạp tiền vào tài khoản thành công`,
              placement: 'bottomRight',
            });
            form.resetFields();
          } else {
            notification.error({
              message: `Thất bại`,
              description: `Nạp tiền vào tài khoản thất bại`,
              placement: 'bottomRight',
            });
          }
        },
        onError: () => {
          notification.error({
            message: `Thất bại`,
            description: 'Nạp tiền vào tài khoản thất bại',
            placement: 'bottomRight',
          });
        },
      },
    );
  };

  return (
    <div className="w-full h-full flex">
      <div className=" w-full bg-slate-200 h-full p-6 overflow-scroll max-h-[95vh]">
        <div className="bg-white w-full h-full rounded-lg flex flex-col items-center justify-center">
          <div className="text-sky-900 font-black text-lg mb-6 ">Nạp tiền vào tài khoản</div>
          <Form
            className="w-[400px]"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 40 }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              required
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập',
                },
              ]}
              label="Thông tin"
              name="inputInfo"
            >
              <Input
                onChange={(e) => {
                  onValuesChange(e);
                }}
              />
            </Form.Item>
            <Form.Item hidden label="Card" name="numberCard">
              <Input hidden />
            </Form.Item>
            <Form.Item
              required
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thông tin',
                },
              ]}
              label="Họ và tên"
              name="name"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              required
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số tiền',
                },
                { type: 'number' },
              ]}
              label="Số tiền"
              name="numberOfMoney"
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button bg-sky-600 mt-8"
              >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
