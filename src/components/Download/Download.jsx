import React from "react";
import "./Download.css";
import desktop from "../../assets/desktop.png";

const DownloadSection = () => {
  return (
    <section className="download-section">
      <div className="download-container">
        {/* Mockup điện thoại */}
        <div className="phone-mockup">
          <div className="phone-mockup-wrapper">
            <img src={desktop} alt="Phone UI" />
            <h3>Desktop</h3>
          </div>
        </div>
        {/* Nội dung tải ứng dụng */}
        <div className="download-content">
          <h2 className="download-title">
            Giao dịch cả khi đang di chuyển. Mọi lúc, mọi nơi.
          </h2>

          {/* QR Code */}
          <div className="qr-code">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Windows"
              alt="QR Code Windows"
            />
            <br />
            <h3>IOS And PC</h3>
            <h1>Thêm lựa chọn Tải Xuống</h1>
            <div className="download-buttons">
              <button>MacOS</button>
              <button>Windows</button>
              <button>Linux</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
