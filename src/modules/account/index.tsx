import { Button, Form, Input } from 'antd';
import { CardATM } from 'components/CardATM';
import { MoneyUser } from 'components/MoneyUser';

export default function Account() {
  return (
    <div className="w-full h-full flex">
      <div className=" w-[40%] bg-slate-200 h-full p-6 overflow-scroll max-h-[95vh] ">
        <div>
          <CardATM />
          <MoneyUser classCss="w-[90%] mt-7 ml-2"></MoneyUser>
        </div>
      </div>
      <div className="w-[60%] h-full p-8 flex justify-center items-center  overflow-scroll max-h-[95vh]">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={() => {}}
          autoComplete="off"
        >
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="mb-1 text-2xl font-semibold">Đổi mật khẩu</div>
          </Form.Item>
          <Form.Item
            className="w-[450px]"
            label="Mật khẩu cũ"
            name="passwordOld"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="passwordNew1"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu xác nhận"
            name="passwordNew2"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu xác nhận!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="bg-sky-900" type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
