import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Divider, Form, Input, notification } from 'antd';
import { CardATM } from 'components/CardATM';
import { SpinnerComponent } from 'components/Common/Spin';
import { MoneyUser } from 'components/MoneyUser';
import { ACCESS_TOKEN, CARD_ID, REFRESH_TOKEN, USER_ID } from 'constants/common';
import { useRouter } from 'hooks/useRouter';
import { GetMoneyUserServer } from 'services/account';
import { ResetPassWordServer } from 'services/auth';

export default function Account() {
  const userId = localStorage.getItem(USER_ID) as string;
  const carId = localStorage.getItem(CARD_ID) as string;
  const [form] = Form.useForm();
  const router = useRouter();

  const { data: dataCardUser, isLoading: isLoadingGetMoney } = useQuery(
    ['getMony'],
    () => GetMoneyUserServer(userId as string),
    {
      refetchOnWindowFocus: false,
    },
  );

  const { mutate: mutateAddUserRecommend } = useMutation(ResetPassWordServer);

  const onFinish = (values: any) => {
    const { passwordOld, passwordNew1, passwordNew2 } = values;
    if (passwordNew1 !== passwordNew2) {
      notification.error({
        message: `Thất bại`,
        description: `Vui lòng kiểm tra mật khẩu xác nhận`,
        placement: 'bottomRight',
      });
    } else {
      mutateAddUserRecommend(
        {
          passwordNew: passwordNew1,
          passwordOld,
          numberCard: carId,
        },
        {
          onSuccess: (data) => {
            if (data) {
              notification.success({
                message: `Thành công`,
                description: `Cập nhật mật khẩu thành công`,
                placement: 'bottomRight',
              });
              form.resetFields();
            } else {
              notification.error({
                message: `Thất bại`,
                description: `Vui lòng nhập lại mật khẩu`,
                placement: 'bottomRight',
              });
            }
          },
          onError: () => {
            notification.error({
              message: `Thất bại`,
              description: `Vui lòng nhập lại mật khẩu`,
              placement: 'bottomRight',
            });
          },
        },
      );
    }
  };

  const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    router.push('/login');
  };

  if (isLoadingGetMoney) return <SpinnerComponent />;

  return (
    <div className="w-full h-full flex">
      <div className=" w-[45%] bg-slate-200 h-full p-6 overflow-scroll max-h-[95vh] flex flex-col justify-between ">
        <div>
          <CardATM
            numberCard={dataCardUser?.maTaiKhoan || ''}
            nameCard={dataCardUser?.hoTen || ''}
          />
          <MoneyUser money={dataCardUser?.soDu as string} classCss="w-[90%] mt-7 ml-2"></MoneyUser>
          <Divider dashed type="horizontal" className="bg-sky-600" />
        </div>
        <div className="flex justify-center items-center">
          <Button className=" w-[200px] border-sky-900" type="default" onClick={logOut}>
            Đăng xuất
          </Button>
        </div>
      </div>
      <div className="w-[55%] h-full p-8 flex justify-center items-center  overflow-scroll max-h-[95vh]">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
