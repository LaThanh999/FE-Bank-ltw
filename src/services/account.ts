import { UserMoneyDTO, UserRecommendDTO } from 'types/account';
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
