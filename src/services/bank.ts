import { axios } from 'utils/axios';
import { BankDTO } from 'types/bank';
import { HistoryBankPublicDTO } from 'types/history';

export const GetBanksServer = async (): Promise<BankDTO[]> => {
  try {
    const { data } = await axios.get<BankDTO[]>(`/nganHangDoiTac`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetHistoryPublicBankServer = async (): Promise<HistoryBankPublicDTO[]> => {
  try {
    const { data } = await axios.get<HistoryBankPublicDTO[]>(`lichSuGiaoDich/getAllAnotherBank`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
