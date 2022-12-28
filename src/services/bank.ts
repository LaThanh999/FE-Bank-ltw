import { axios } from 'utils/axios';
import { BankDTO } from 'types/bank';

export const GetBanksServer = async (): Promise<BankDTO[]> => {
  try {
    const { data } = await axios.get<BankDTO[]>(`/nganHangDoiTac`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
