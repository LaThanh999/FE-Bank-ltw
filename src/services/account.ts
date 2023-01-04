import {
  AccountDTO,
  ParamsAddCustomerDTO,
  ParamsAddUserRecommend,
  UserCustomerDTO,
  UserMoneyDTO,
  UserRecommendDTO,
} from 'types/account';
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

export const GetHistoryServer = async ({
  cardNumber,
  type,
}: {
  cardNumber: string;
  type?: number;
}): Promise<HistoryExchangeDTO[]> => {
  try {
    const { data } = !type
      ? await axios.get<HistoryExchangeDTO[]>(`/lichSuGiaoDich/getByAccountNumber/${cardNumber}`)
      : await axios.get<HistoryExchangeDTO[]>(
          `/lichSuGiaoDich/getByAccountNumber/${cardNumber}/${type}`,
        );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetUserRecommendServer = async ({
  accountNumber,
}: {
  accountNumber: string;
}): Promise<UserRecommendDTO[]> => {
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

export const GetUserByNumberCardWithBankIdServer = async ({
  numberCard,
  bankId,
}: {
  numberCard: string;
  bankId: string;
}): Promise<AccountDTO> => {
  try {
    const { data } = await axios.post<AccountDTO>(`/taiKhoan/getWithNumberCardAndBankId`, {
      numberCard,
      bankId,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const TransferServer = async ({
  soTaiKhoanGui,
  soTaiKhoanNhan,
  soTien,
  noiDung,
  idNganHangNhan,
  idNganHangGui,
  idLoaiGiaoDich,
  traPhi,
}: {
  soTaiKhoanGui: string;
  soTaiKhoanNhan: string;
  soTien: number;
  noiDung: string;
  idNganHangNhan: number;
  idNganHangGui: number;
  idLoaiGiaoDich: number;
  traPhi: 0 | 1;
}) => {
  try {
    const { data } = await axios.post(`/taiKhoanNganHang/transfer`, {
      soTaiKhoanGui,
      soTaiKhoanNhan,
      soTien,
      noiDung,
      idNganHangNhan,
      idNganHangGui,
      idLoaiGiaoDich,
      traPhi,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetCustomerServer = async (): Promise<UserCustomerDTO[]> => {
  try {
    const { data } = await axios.get<UserCustomerDTO[]>(`/taiKhoan/getAllCustomer`);
    return data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetUserByNumberCardWithMoneyServer = async ({
  cardNumber,
}: {
  cardNumber: string;
}): Promise<UserCustomerDTO> => {
  try {
    const { data } = await axios.get<UserCustomerDTO>(
      `/taiKhoan/getWithNumberCardWithMoney/${cardNumber}`,
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetUserByNumberCardOrEmailPhone = async ({
  inputSearch,
}: {
  inputSearch: string;
}): Promise<UserCustomerDTO> => {
  try {
    const { data } = await axios.post<UserCustomerDTO>(`/taiKhoan/getWithNumberCardOrEmailPhone`, {
      inputSearch,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AddCustomerServer = async (
  params: ParamsAddCustomerDTO,
): Promise<{ status: number }> => {
  try {
    const { data } = await axios.post<{ status: number }>(`/taiKhoan/addCustomer`, params);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AddMoneyCustomerServer = async ({
  numberOfMoney,
  numberCard,
}: {
  numberOfMoney: string;
  numberCard: number;
}): Promise<{ status: number }> => {
  try {
    const { data } = await axios.post<{ status: number }>(`/taiKhoan/addMoneyCustomer`, {
      numberOfMoney,
      numberCard,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
