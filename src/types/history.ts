export interface HistoryExchangeDTO {
  id: number;
  maGiaoDich: string;
  taiKhoanNguoiNhan: string;
  taiKhoanNguoiGui: string;
  soTienChuyen: string;
  phiGiaoDich: string;
  maNganHangNguoiNhan: string;
  maNganHangNguoiGui: string;
  loaiGiaoDich: string;
  ngayGioGiaoDich: string;
  create_at: string;
  update_at: string;
  hoTenNguoiNhan: string;
  hoTenNguoiGui: string;
  noiDung: string;
  type: number;
}

export interface HistoryBankPublicDTO {
  id: number;
  maGiaoDich: string;
  taiKhoanNguoiNhan: string;
  taiKhoanNguoiGui: string;
  soTienChuyen: string;
  phiGiaoDich: string;
  noiDung: string;
  tienThucNhan: string;
  idNganHangNhan: number;
  idNganHangGui: number;
  idLoaiGiaoDich: number;
  ngayGioGiaoDich: string;
  create_at: string;
  update_at: string;
  hoTenNguoiNhan: string;
  hoTenNguoiGui: string;
  tenNganHangNhan: string;
  tenNganHangGui: string;
}
