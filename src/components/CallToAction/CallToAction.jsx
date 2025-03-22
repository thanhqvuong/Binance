import React from "react";
import { Link } from "react-router-dom";
import "./CallToAction.css";

const CallToAction = ({ onOpenChat }) => {
  return (
    <div className="cta-container">
      <h2 className="cta-heading">Bắt đầu tăng thu nhập ngay hôm nay</h2>
      <Link to="/register">
        <button className="register-btn">Đăng ký</button>
      </Link>
      {/* Nút Chatbot - Gọi hàm mở chatbot */}
      <div className="cta-support" onClick={onOpenChat}>
        <span className="support-icon">💬</span>
      </div>
    </div>
  );
};

export default CallToAction;