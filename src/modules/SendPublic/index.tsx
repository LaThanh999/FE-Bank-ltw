import { Button, Form, Input, InputNumber, notification, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CARD_ID } from 'constants/common';
import { debounce } from 'lodash';
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

export const SendPublic = () => {
  const [form] = Form.useForm();
  const carId = localStorage.getItem(CARD_ID) as string;

  const onChangeNumberCard = () => {
    const numberCard = form.getFieldValue('numberCard') as string;
    if (numberCard === carId) {
      form.setFieldValue('nameTo', '');
      notification.error({
        message: `Thất bại`,
        description: `Không thể chọn tài khoản của mình`,
        placement: 'bottomRight',
      });
      return;
    }
    const onCallBack = debounce(() => {}, 300);
    onCallBack();
  };

  const onFinish = () => {};

  return (
    <div className="w-full h-full flex">
      <div className="text-xl font-medium text-sky-900 flex justify-center my-6 w-full">
        <div>Chuyển khoản liên ngân hàng</div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[75%] mt-8">
          <Form
            {...formItemLayout}
            form={form}
            onValuesChange={onChangeNumberCard}
            className="login-form"
            onFinish={onFinish}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số tài khoản',
                },
              ]}
              label="Số tài khoản"
              name="numberCard"
            >
              <Input type="number" />
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
              <Input min="0" type="number" />
            </Form.Item>
            <Form.Item label="Nội dung" name="description">
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
              name="typeTransfer"
            >
              <Select
                options={[
                  {
                    value: 0,
                    label: ' Người nhận trả',
                  },
                  {
                    value: 1,
                    label: ' Người chuyển trả',
                  },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button bg-sky-600 mt-8"
              >
                Chuyển tiền
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* <Modal
          afterClose={() => {
            setShowInputOTP(false);
            setExpired(false);
            form.resetFields();
          }}
          destroyOnClose
          title="Xác nhận thanh toán"
          centered
          open={isOpenModalTransfer}
          okType="primary"
          footer={null}
          onOk={() => setIsOpenModalTransfer(false)}
          onCancel={() => setIsOpenModalTransfer(false)}
        >
          {!showInputOTP && (
            <>
              <div className="text-center text-lg font-medium">
                Vui lòng nhập OTP để xác nhận thanh toán
              </div>
              <div
                className="text-center text-base underline text-cyan-800 cursor-pointer"
                onClick={sendOTP}
              >
                Gửi OTP qua Email của bạn
              </div>
            </>
          )}
          {showInputOTP && (
            <Form {...formItemLayout} className="mt-8" form={form} onFinish={onTransfer}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập OTP',
                  },
                ]}
                label="OTP"
                name="otp"
              >
                <InputNumber className="w-full" type="number" placeholder="Nhập OTP" />
              </Form.Item>
              <div className="flex items-center justify-center mt-1">
                <CountDown timeOTP={timeOTP} setExpired={setExpired} />
                <Button disabled={!expired} type="link">
                  <div className="underline" onClick={reSendOTP}>
                    Gửi lại OTP
                  </div>
                </Button>
              </div>
              <Form.Item className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button bg-sky-600 mt-2"
                >
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal> */}
      </div>
    </div>
  );
};
