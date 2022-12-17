import { API_LOGIN } from 'constants/api';
import { AuthDTO, AuthParamsDTO } from 'types/auth';
import axios from 'utils/axios';

export const LoginServer = async (params: AuthParamsDTO): Promise<AuthDTO> => {
  try {
    const { data } = await axios.post<AuthDTO>(API_LOGIN, params);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
