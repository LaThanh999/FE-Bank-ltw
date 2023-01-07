import { NotifyOwe, OweDTO } from 'types/owe';
import { axios } from 'utils/axios';

export const GetOweByNumberAccountServer = async ({
  numberCard,
  type,
}: {
  numberCard: string;
  type: number;
}): Promise<OweDTO[]> => {
  try {
    const { data } = await axios.post<OweDTO[]>(`/danhSachNguoiNo/getByNumberCard`, {
      numberCard,
      type,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AddOweServer = async ({
  maTaiKhoanChuNo,
  maTaiKhoanNguoiNo,
  soTienChuyen,
  noiDung,
}: {
  maTaiKhoanChuNo: string;
  maTaiKhoanNguoiNo: string;
  soTienChuyen: number;
  noiDung: string;
}) => {
  try {
    const { data } = await axios.post(`/danhSachNguoiNo`, {
      maTaiKhoanChuNo,
      maTaiKhoanNguoiNo,
      soTienChuyen,
      noiDung,
      tinhTrang: 0,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const RemoveOweRecommendServer = async (id: string) => {
  try {
    const { data } = await axios.delete(`danhSachNguoiNo/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const EditStatusOweServer = async ({ id, status }: { id: number; status: 0 | 1 }) => {
  try {
    const { data } = await axios.put(`danhSachNguoiNo/${id}`, { tinhTrang: status });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getNotifyOweServer = async ({
  numberCard,
}: {
  numberCard: string;
}): Promise<NotifyOwe[]> => {
  try {
    const { data } = await axios.post<NotifyOwe[]>(`/notifications/getByAccountNumber`, {
      numberCard,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AddNotifyOweServer = async ({
  numberCardFrom,
  numberCardTo,
  numberOfMoney,
}: {
  numberCardFrom: string;
  numberCardTo: string;
  numberOfMoney: string;
}) => {
  try {
    const { data } = await axios.post(`/notifications/addNotification`, {
      numberCardFrom,
      numberCardTo,
      numberOfMoney,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const UpdateSeenNotifyOweServer = async ({ numberCard }: { numberCard: string }) => {
  try {
    const { data } = await axios.post(`/notifications/updateNotification`, {
      numberCard,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
