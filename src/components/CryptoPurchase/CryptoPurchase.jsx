import React from "react";
import "./CryptoPurchase.css";

const CryptoPurchase = () => {
  return (
    <div className="crypto-container">
      <h2 className="crypto-title">Cách mua tiền mã hóa</h2>
      <div className="crypto-steps">
        <div className="crypto-step">
          <div className="crypto-icon">{icon1}</div>
          <h3>1. Nhập số tiền và chọn thanh toán</h3>
          <p>
            Nhập số tiền, chọn phương thức thanh toán khả dụng và chọn tài khoản
            thanh toán hoặc liên kết thẻ thanh toán.
          </p>
        </div>
        <div className="crypto-step">
          <div className="crypto-icon">{icon2}</div>
          <h3>2. Xác nhận lệnh</h3>
          <p>
            Xác nhận thông tin chi tiết giao dịch, bao gồm định giá cặp giao
            dịch, phí và các mẹo giải thích khác.
          </p>
        </div>
        <div className="crypto-step">
          <div className="crypto-icon">{icon3}</div>
          <h3>3. Nhận tiền mã hóa</h3>
          <p>
            Sau khi thanh toán thành công, tiền mã hóa đã mua sẽ được nạp vào Ví
            Spot hoặc Ví Funding của bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

const icon1 = (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#F3C623"/>
    <path d="M7 12H17M7 16H14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const icon2 = (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="#F3C623"/>
    <path d="M9 12H15M12 9V15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const icon3 = (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L21 12H3L12 3Z" fill="#F3C623"/>
    <path d="M3 21H21V12H3V21Z" fill="#F3C623"/>
  </svg>
);

export default CryptoPurchase;
