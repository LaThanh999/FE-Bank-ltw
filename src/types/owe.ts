export interface OweDTO {
  hoTenChuNo?: string;
  hoTenNguoiNo?: string;
  id: number;
  maTaiKhoanChuNo: string;
  maTaiKhoanNguoiNo: string;
  maNganHangChuNo: string;
  maNganHangNguoiNo: string;
  soTienChuyen: string;
  noiDung: any;
  tinhTrang: number;
  create_at: string;
  update_at: string;
}

export interface NotifyOwe {
  id: number;
  numberCardFrom: string;
  numberCardTo: string;
  message: string;
  type: number;
  isSeen: number;
  update_at: Date;
  hoTenNguoiNhan: string;
  hoTenNguoiGui: string;
}
