import { AccountDTO, ParamsAddUserRecommend, UserMoneyDTO, UserRecommendDTO } from 'types/account';
import { HistoryExchangeDTO } from 'types/history';
import axios from 'utils/axios';

export const GetMoneyUserServer = async (idUser: string): Promise<UserMoneyDTO> => {
  try {
    const { data } = await axios.get<UserMoneyDTO>(`/taiKhoan/getMoney/${idUser}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetHistoryServer = async (accountNumber: string): Promise<HistoryExchangeDTO[]> => {
  try {
    const { data } = await axios.get<HistoryExchangeDTO[]>(
      `/lichSuGiaoDich/getByAccountNumber/${accountNumber}`,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetUserRecommendServer = async (
  accountNumber: string,
): Promise<UserRecommendDTO[]> => {
  try {
    const { data } = await axios.get<UserRecommendDTO[]>(
      `/danhSachNguoiNhan/getByAccountNumber/${accountNumber}`,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AddUserRecommendServer = async (params: ParamsAddUserRecommend) => {
  try {
    const { data } = await axios.post(`/danhSachNguoiNhan`, params);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const RemoveUserRecommendServer = async (id: string) => {
  try {
    const { data } = await axios.delete(`danhSachNguoiNhan/deleteByID/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const EditUserRecommendServer = async ({ id, name }: { id: string; name: string }) => {
  try {
    const { data } = await axios.put(`danhSachNguoiNhan/Update/${id}`, {
      tenGoiNho: name,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetUserRecommendBuyAccountServer = async ({
  accountFrom,
  accountTo,
}: {
  accountFrom: string;
  accountTo: string;
}): Promise<UserRecommendDTO> => {
  try {
    const { data } = await axios.post<UserRecommendDTO>(
      `/danhSachNguoiNhan/getByAccountNumberUser`,
      {
        accountFrom,
        accountTo,
      },
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetUserByNumberCardServer = async (numberAccount: string): Promise<AccountDTO> => {
  try {
    const { data } = await axios.get<AccountDTO>(`/taiKhoan/getWithNumberCard/${numberAccount}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
