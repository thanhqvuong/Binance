import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Cộng đồng</h3>
          <div className="social-icons">
            <span>🔗 Discord</span>
            <span>🔗 Telegram</span>
            <span>🔗 TikTok</span>
            <span>🔗 Facebook</span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Về chúng tôi</h3>
          <ul>
            <li>Thông tin thêm</li>
            <li>Cơ hội nghề nghiệp</li>
            <li>Thông báo</li>
            <li>Tin tức</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Sản phẩm</h3>
          <ul>
            <li>Exchange</li>
            <li>Mua tiền mã hóa</li>
            <li>Pay</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Hỗ trợ</h3>
          <ul>
            <li>Chat hỗ trợ 24/7</li>
            <li>Trung tâm trợ giúp</li>
            <li>Phí giao dịch</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
