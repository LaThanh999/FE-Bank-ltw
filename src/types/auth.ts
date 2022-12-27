export interface AuthParamsDTO {
  username: string;
  password: string;
}

export interface AuthDTO {
  Authorization: boolean;
  accessToken: string;
  refreshToken: string;
  userId: number;
  maTaiKhoan: string;
}
