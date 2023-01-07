import { useQuery } from '@tanstack/react-query';
import Table, { ColumnsType } from 'antd/es/table';
import { formatNumberCurrent } from 'helper/number';
import moment from 'moment';
import { useMemo } from 'react';
import { GetHistoryPublicBankServer } from 'services/bank';

interface DataType {
  key: React.Key;
  bankTo: string;
  bankFrom: string;
  nameFrom: string;
  cardTo: string;
  money: string;
  cardFrom: string;
  createAt: string;
}

export const HistoryAdmin = () => {
  const { data: dataHistory } = useQuery(
    ['getHistoryBankPublic'],
    () => GetHistoryPublicBankServer(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const bankFilterFrom = useMemo(() => {
    let result: any = [];
    dataHistory?.forEach((el) => {
      if (result.findIndex((item: any) => item === el.tenNganHangGui) < 0) {
        result = [...result, el.tenNganHangGui];
      }
    });
    return result;
  }, [dataHistory]);

  const bankFilterTo = useMemo(() => {
    let result: any = [];
    dataHistory?.forEach((el) => {
      if (result.findIndex((item: any) => item === el.tenNganHangNhan) < 0) {
        result = [...result, el.tenNganHangNhan];
      }
    });
    return result;
  }, [dataHistory]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên ngân hàng gửi',
      dataIndex: 'bankFrom',
      key: 'bankFrom',
      filters: bankFilterFrom?.map((el: any) => ({
        text: el,
        value: el,
      })),
      filterSearch: true,
      onFilter: (value: any, record: any) => {
        return record.bankFrom.startsWith(value);
      },
    },
    {
      title: 'Tên ngân hàng nhận',
      dataIndex: 'bankTo',
      key: 'bankTo',
      filters: bankFilterTo?.map((el: any) => ({
        text: el,
        value: el,
      })),
      filterSearch: true,
      onFilter: (value: any, record: any) => record.bankTo.startsWith(value),
    },
    {
      title: 'Tên người nhận',
      dataIndex: 'nameTo',
      key: 'nameTo',
    },
    {
      title: 'Số tài khoản gửi',
      dataIndex: 'cardFrom',
      key: 'cardFrom',
    },
    {
      title: 'Số tài khoản người nhận',
      dataIndex: 'cardTo',
      key: 'cardTo',
    },
    {
      title: 'Số tiền giao dịch',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Thời gian',
      dataIndex: 'createAt',
      key: 'createAt',
    },
  ];

  const dataTable: DataType[] =
    dataHistory?.map((el, index) => {
      return {
        key: `customer-${index}`,
        bankTo: el.tenNganHangNhan,
        bankFrom: el.tenNganHangGui,
        nameFrom: el.hoTenNguoiGui,
        cardTo: el.taiKhoanNguoiNhan,
        cardFrom: el.taiKhoanNguoiGui,
        money: `${formatNumberCurrent(el.soTienChuyen)} VNĐ`,
        createAt: el.create_at ? moment(el.create_at).format('h:mm:ss, DD/MM/YYYY') : '',
      };
    }) || [];

  return (
    <div className="w-full h-full p-6">
      <div className="text-left text-sky-900 font-black text-lg mb-2 flex justify-between">
        <div>Lịch sử giao dịch với các ngân hàng</div>
      </div>
      <Table dataSource={dataTable} columns={columns} />
    </div>
  );
};
