export interface UserMoneyDTO {
  hoTen: string;
  maTaiKhoan: string;
  soDu: string;
}

export interface UserRecommendDTO {
  id: number;
  maTaiKhoanNguoiChuyen: string;
  maTaiKhoanNguoiNhan: string;
  tenGoiNho: string;
  maNganHang: string;
  hoTenNguoiNhan: string;
  loaiGiaoDich: string;
  idNganHang: number;
  tenNganHang: string;
  create_at: string;
  update_at: string;
}

export interface AccountDTO {
  id: number;
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  sdt: string;
  loaiTaiKhoan: number;
  maTaiKhoan: string;
  OTP?: any;
  create_at?: any;
}

export interface ParamsAddUserRecommend {
  maTaiKhoanNguoiChuyen: string;
  maTaiKhoanNguoiNhan: string;
  tenGoiNho: string;
  idNganHang: string;
  create_at: string;
}

export interface UserCustomerDTO {
  id: number;
  taiKhoan: string;
  hoTen: string;
  email: string;
  sdt: string;
  loaiTaiKhoan: number;
  maTaiKhoan: string;
  OTP: string;
  refreshToken: string;
  create_at: any;
  update_at: string;
  maNganHang: number;
  soDu: string;
  isBlock?: number;
}

export interface ParamsAddCustomerDTO {
  username: string;
  fullName: string;
  email: string;
  phone: string;
}
