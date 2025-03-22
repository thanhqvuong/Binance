import React from "react";
import { useNavigate } from "react-router-dom";
import "./WhyChoseBinance.css";

const WhyChooseBinance = () => {
  const navigate = useNavigate();

  return (
    <div className="why-binance-container">
      <h2 className="section-title">Lý do nên chọn Binance</h2>
      <div className="features">
        <div className="feature-card">
          <h3>Khả năng tiếp cận</h3>
          <p>Bắt đầu giao dịch tiền mã hóa bằng cách nạp tiền từ 35 loại tiền pháp định khả dụng.</p>
        </div>
        <div className="feature-card">
          <h3>Tiện lợi</h3>
          <p>Giao dịch liền mạch bằng 32 phương thức thanh toán khả dụng.</p>
        </div>
        <div className="feature-card">
          <h3>Chi phí thấp</h3>
          <p>Tận hưởng mức giá ưu đãi với tỷ lệ cạnh tranh, chi phí thấp và tỷ lệ chuyển đổi ổn định.</p>
        </div>
        <div className="feature-card">
          <h3>An toàn và Bảo mật</h3>
          <p>Bảo vệ và bảo mật tài sản của bạn mọi lúc, mọi nơi.</p>
        </div>
      </div>

      <h2 className="section-title">Cặp tiền pháp định - tiền mã hóa hàng đầu</h2>
      <p className="description">Nạp nội tệ để mua tiền mã hóa.</p>
      <div className="no-records">Không có hồ sơ</div>
      <button className="buy-crypto-button" onClick={() => navigate("/buycrypto")}>
        Mua Tiền mã hóa
      </button>
    </div>
  );
};

export default WhyChooseBinance;
