import { useMutation, useQuery } from '@tanstack/react-query';
import { Modal, notification, Space, Table, Tabs } from 'antd';
import { SpinnerComponent } from 'components/Common/Spin';
import { CARD_ID } from 'constants/common';
import { formatNumberCurrent } from 'helper/number';
import { useEffect, useState } from 'react';
import { GetBanksServer } from 'services/bank';
import { GetOweByNumberAccountServer, RemoveOweRecommendServer } from 'services/owe';
import { OweNumberCard } from './components/OweNumberCard';
import { OweUsername } from './components/OweUsername';

export const Owe = () => {
  const carId = localStorage.getItem(CARD_ID);

  const [dataOweState, setDataOweState] = useState<
    {
      key: number;
      name: string;
      numberCard: string;
      money: string;
      description: string;
      status: number;
      statusFormat: string;
      id: number;
    }[]
  >([]);

  const columnsOwe = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'numberCard',
      key: 'numberCard',
    },
    {
      title: 'Số tiền',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusFormat',
      key: 'statusFormat',
    },
    {
      title: 'Nội dung',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, data: any) => (
        <Space size="middle">
          <button
            className="underline italic font-medium text-sky-600 hover:text-sky-800"
            onClick={() => {
              removeOwe(data.id);
            }}
          >
            Huỷ
          </button>
        </Space>
      ),
    },
  ];

  const {
    data: dataOwe,
    isLoading: isLoadingDataOwe,
    refetch: refetchDataOwe,
  } = useQuery(
    ['getListOwe'],
    () => GetOweByNumberAccountServer({ numberCard: carId as string, type: 1 }),
    {
      refetchOnWindowFocus: false,
    },
  );

  const { data: dataBanks } = useQuery(['getBanks'], () => GetBanksServer(), {
    refetchOnWindowFocus: false,
  });
  const { mutate: mutateRemoveUserRecommend } = useMutation(RemoveOweRecommendServer);

  useEffect(() => {
    const dataTemp = dataOwe?.map((el, index) => {
      return {
        key: index,
        name: el.hoTenNguoiNo as string,
        numberCard: el.maTaiKhoanNguoiNo,
        money: `${formatNumberCurrent(el.soTienChuyen)} VND`,
        description: el.noiDung,
        id: el.id,
        status: el.tinhTrang,
        statusFormat: el.tinhTrang === 0 ? 'Chưa thanh toán' : 'Đã thanh toán',
      };
    });
    if (dataTemp) setDataOweState(dataTemp);
  }, [dataOwe]);

  const removeOwe = (id: string) => {
    Modal.confirm({
      zIndex: 10,
      title: 'Xác nhận',
      content: 'Bạn có muốn xóa ?',
      okText: 'Xác nhận',
      okType: 'default',
      centered: true,
      cancelText: 'Hủy',
      onOk: () => {
        mutateRemoveUserRecommend(id, {
          onSuccess: () => {
            notification.success({
              message: `Thành công`,
              description: `Hủy thành công`,
              placement: 'bottomRight',
            });
            refetchDataOwe();
          },
          onError: () => {
            notification.error({
              message: `Thất bại`,
              description: `Hủy thất bại`,
              placement: 'bottomRight',
            });
          },
        });
      },
    });
  };

  if (isLoadingDataOwe) return <SpinnerComponent />;

  return (
    <>
      <div className="w-full h-full flex">
        <div className=" w-[40%] bg-slate-200 h-full p-6 overflow-scroll max-h-[95vh]">
          <div className="bg-white w-full h-full rounded-lg flex flex-col items-center justify-center">
            <div className="text-sky-900 font-black text-lg mb-6 ">Tạo nhắc nợ</div>
            <Tabs
              defaultActiveKey="1"
              type="card"
              size="large"
              centered
              className="font-bold"
              destroyInactiveTabPane={true}
              items={[
                {
                  forceRender: false,
                  label: `Người quen`,
                  key: '1',
                  children: <OweUsername dataBanks={dataBanks} callBack={refetchDataOwe} />,
                },
                {
                  forceRender: false,
                  label: `Tài khoản mới`,
                  key: '2',
                  children: <OweNumberCard dataBanks={dataBanks} callBack={refetchDataOwe} />,
                },
              ]}
            />
          </div>
        </div>
        <div className="w-[60%] h-full p-8  overflow-scroll max-h-[95vh]">
          <div className="overflow-auto">
            <div className="text-left text-sky-900 font-black text-lg mb-2 flex justify-between">
              <div>Danh sách người nợ</div>
            </div>
            <Table dataSource={dataOweState} columns={columnsOwe} />
          </div>
        </div>
      </div>
    </>
  );
};
