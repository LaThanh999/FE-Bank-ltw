import { axios } from 'utils/axios';

export const sendOTPTransferServer = async ({
  numberCardFrom,
  numberCardTo,
}: {
  numberCardFrom: string;
  numberCardTo: string;
}) => {
  try {
    const { data } = await axios.post(`/sendOTP`, {
      numberCardFrom,
      numberCardTo,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const isVerifyOTPTransferServer = async ({
  numberCardFrom,
  numberCardTo,
  inputOtp,
}: {
  numberCardFrom: string;
  numberCardTo: string;
  inputOtp: number;
}): Promise<{ otpVerified: boolean }> => {
  try {
    const { data } = await axios.post<{ otpVerified: boolean }>(`/sendOTP/isVerifyOtp`, {
      numberCardFrom,
      numberCardTo,
      inputOtp,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
