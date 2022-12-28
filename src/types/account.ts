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
  create_at: string;
  update_at: string;
}

export interface ParamsAddUserRecommend {
  maTaiKhoanNguoiChuyen: string;
  maTaiKhoanNguoiNhan: string;
  tenGoiNho: string;
  maNganHang: string;
  create_at: string;
}
