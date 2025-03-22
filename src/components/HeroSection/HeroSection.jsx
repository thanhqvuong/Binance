import React, { useState, useEffect } from "react"; // Import React và các hooks
import "./HeroSection.css"; // Import file CSS cho HeroSection
import { Link } from "react-router-dom"; // Import Link để điều hướng
import { useTheme } from "../../store/Theme"; // Import hook để lấy theme từ context

const HeroSection = () => {
  const [isPopular, setIsPopular] = useState(true); // State để kiểm soát tab hiển thị (Phổ biến/Niêm yết mới)
  const { theme } = useTheme(); // Lấy theme từ context

  useEffect(() => {
    // Cập nhật class cho <body> khi theme thay đổi
    document.body.classList.remove("light-mode", "dark-mode"); // Xóa cả 2 class cũ trước
    document.body.classList.add(theme); // Thêm class của theme hiện tại
  }, [theme]); // Chạy lại khi `theme` thay đổi

  return (
    <section className={`hero-section ${theme}`}> {/* Áp dụng class theme vào HeroSection */}
      <div className="hero-container">
        {/* Phần bên trái - Giới thiệu Binance */}
        <div className="hero-left">
          <h1 className="hero-title">
            +250 Triệu Người <br /> Dùng Tin Chọn <br /> Binance
          </h1>
          <div className="hero-input">
            <input type="text" placeholder="Email/Số điện thoại" className="hero-input-field" />
            <Link to="/login">
              <button className="hero-button">Hãy bắt đầu</button>
            </Link>
          </div>
        </div>

        {/* Phần bên phải - Bảng giá thị trường và tin tức */}
        <div className="hero-right">
          <div className="market-news-container">
            {/* Nút chuyển đổi giữa "Phổ biến" và "Niêm yết mới" */}
            <div className="toggle-buttons">
              <button
                className={`toggle-button ${isPopular ? 'active' : ''}`}
                onClick={() => setIsPopular(true)} // Bấm để hiển thị danh sách phổ biến
              >
                Phổ biến
              </button>
              <button
                className={`toggle-button ${!isPopular ? 'active' : ''}`}
                onClick={() => setIsPopular(false)} // Bấm để hiển thị danh sách niêm yết mới
              >
                Niêm yết mới
              </button>
            </div>

            {/* Nếu tab đang ở "Phổ biến" */}
            {isPopular ? (
              <div className="market-overview">
                <h2 className="market-title">Phổ biến</h2>
                <ul className="market-list">
                  <li><span className="coin-name btc">BTC</span> <span className="coin-value">₫2,446,434,352.44</span> <span className="coin-change positive">+0,14%</span></li>
                  <li><span className="coin-name eth">ETH</span> <span className="coin-value">₫68,802,075.89</span> <span className="coin-change positive">+0,17%</span></li>
                  <li><span className="coin-name bnb">BNB</span> <span className="coin-value">₫16,618,677.57</span> <span className="coin-change negative">-0,34%</span></li>
                  <li><span className="coin-name xrp">XRP</span> <span className="coin-value">₫66,102.90</span> <span className="coin-change positive">+0,40%</span></li>
                  <li><span className="coin-name sol">SOL</span> <span className="coin-value">₫4,310,759.17</span> <span className="coin-change positive">+1,50%</span></li>
                </ul>
              </div>
            ) : (
              // Nếu tab đang ở "Niêm yết mới"
              <div className="market-overview">
                <h2 className="market-title">Niêm yết mới</h2>
                <ul className="market-list">
                  <li><span className="coin-name layer">LAYER</span> <span className="coin-value">₫16,205.25</span> <span className="coin-change positive">+4,53%</span></li>
                  <li><span className="coin-name cheems">1000CHEEMS</span> <span className="coin-value">₫22.24</span> <span className="coin-change positive">+4,44%</span></li>
                  <li><span className="coin-name tst">TST</span> <span className="coin-value">₫1,979.05</span> <span className="coin-change negative">-8,28%</span></li>
                  <li><span className="coin-name bera">BERA</span> <span className="coin-value">₫167,032.02</span> <span className="coin-change positive">+12,81%</span></li>
                  <li><span className="coin-name anime">ANIME</span> <span className="coin-value">₫587.33</span> <span className="coin-change positive">+0,88%</span></li>
                </ul>
              </div>
            )}

            {/* Link điều hướng đến trang thị trường */}
            <div className="market-overview">
              <Link to="/market" style={{ textDecoration: "none", color: "inherit" }}>
                <h3>Xem thêm coin</h3>
              </Link>
            </div>

            {/* Phần tin tức mới nhất */}
            <div className="news-section">
              <h2 className="news-title">Tin tức</h2>
              <ul className="news-list">
                <li>Vitalik Buterin thảo luận về những ưu điểm và rủi ro của máy giải trình tự tập trung</li>
                <li>Các Thượng nghị sĩ kêu gọi loại bỏ nhân viên DOGE khỏi CFPB vì lo ngại về Musk</li>
                <li>Vitalik Buterin thảo luận về vai trò kép và tính phí tập trung của Ethereum</li>
                <li>Nhật Bản tăng cường khuôn khổ quản lý tiền điện tử và tiền ổn định</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
