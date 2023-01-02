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

export const ResetPassWordServer = async ({
  passwordNew,
  passwordOld,
  numberCard,
}: {
  passwordNew: string;
  passwordOld: string;
  numberCard: string;
}) => {
  try {
    const { data } = await axios.post('/dangNhap/resetPassword', {
      passwordNew,
      passwordOld,
      numberCard,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendOTPForgotPasswordServer = async ({ username }: { username: string }) => {
  try {
    const { data } = await axios.post(`/dangNhap/sendForgotPassWordOtp`, {
      username,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const isVerifyOTPForgotPasswordServer = async ({
  username,
  inputOtp,
}: {
  username: string;
  inputOtp: number;
}): Promise<{ otpVerified: boolean }> => {
  try {
    const { data } = await axios.post<{ otpVerified: boolean }>(
      `/dangNhap/checkForgotPassWordOtp`,
      {
        username,
        inputOtp,
      },
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateForgotPassWordServer = async ({
  username,
  password,
  inputOtp,
}: {
  username: string;
  password: string;
  inputOtp: string;
}): Promise<{ status: number; message: string }> => {
  try {
    const { data } = await axios.post<{ status: number; message: string }>(
      '/dangNhap/updateForgotPassWord',
      {
        username,
        password,
        inputOtp,
      },
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
