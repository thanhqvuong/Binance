import React from "react"; // Import React
import { Line } from "react-chartjs-2"; // Import component Line để vẽ biểu đồ
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js"; // Import các thành phần cần thiết của Chart.js
import "./MarketSection.css"; // Import file CSS để tạo kiểu

// Đăng ký các thành phần của Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const MarketSection = () => {
  // Dữ liệu cho biểu đồ đường (Line chart)
  const data = {
    labels: ["9 AM", "10 AM", "1 PM", "4 PM", "7 PM"], // Trục x (thời gian trong ngày)
    datasets: [
      {
        label: "USDT/VND", // Nhãn của biểu đồ
        data: [25480, 25485, 25490, 25488, 25479], // Giá trị của USDT/VND tại các thời điểm
        borderColor: "#F3BA2F", // Màu đường biểu đồ
        backgroundColor: "rgba(243, 186, 47, 0.2)", // Màu nền của vùng dưới đường biểu đồ
        fill: true, // Đổ màu vùng dưới đường biểu đồ
        tension: 0.4, // Độ cong của đường biểu đồ (0 = góc nhọn, 1 = đường cong mượt)
      },
    ],
  };

  return (
    <section className="market-section">
      {/* Tiêu đề chính của phần thị trường */}
      <h2 className="market-title">Thị trường Tether USDt</h2>

      <div className="market-container">
        {/* Bảng thông tin bên trái */}
        <div className="market-info">
          {/* Mức độ phổ biến */}
          <div className="market-stat">
            <span>Mức độ phổ biến</span>
            <strong>#3</strong>
          </div>
          {/* Vốn hóa thị trường */}
          <div className="market-stat">
            <span>Vốn hóa thị trường</span>
            <strong>₫3,638,508.55B</strong>
          </div>
          {/* Khối lượng giao dịch */}
          <div className="market-stat">
            <span>Khối lượng</span>
            <strong>₫1,123,346.55B</strong>
          </div>
          {/* Lượng cung lưu hành */}
          <div className="market-stat">
            <span>Lượng cung lưu hành</span>
            <strong>142.80B</strong>
          </div>
          {/* Mô tả thông tin thị trường */}
          <p className="market-desc">
            Tether USDt đang tăng giá trị trong tuần này. Hiện tại, Tether USDt có giá là <strong>₫25,870VNĐ/USDT</strong>,
            với lượng cung lưu hành là <strong>142.80B USDT</strong>, dẫn đến tổng vốn hóa thị trường là <strong>₫3,638,508.55B</strong>.
          </p>
        </div>

        {/* Biểu đồ bên phải */}
        <div className="chart-container">
          <h3>USDT/VND</h3>
          <div className="price">
            {/* Giá hiện tại của USDT */}
            <strong>₫25,479.79</strong>
            {/* Phần trăm thay đổi giá với màu sắc tương ứng */}
            <span className="price-change positive">+0%</span>
          </div>
          {/* Biểu đồ đường */}
          <div className="chart-wrapper">
            <Line data={data} /> {/* Render biểu đồ Line Chart */}
          </div>
          {/* Các nút lựa chọn khung thời gian */}
          <div className="timeframe-buttons">
            <button className="active">1 ngày</button>
            <button>7 ngày</button>
            <button>1 tháng</button>
            <button>3 tháng</button>
            <button>1 năm</button>
          </div>
        </div>
      </div>

      {/* Bảng chuyển đổi tỷ giá */}
      <div className="conversion-table">
        <h3>Bảng chuyển đổi</h3>
        <div className="conversion-grid">
          {/* Tỷ giá giao dịch 7 ngày */}
          <div>
            <span>Tỷ giá giao dịch 7 ngày</span>
            <strong className="positive">+0.03%</strong>
          </div>
          {/* Tỷ giá giao dịch 24 giờ */}
          <div>
            <span>Tỷ giá giao dịch trong 24 giờ</span>
            <strong className="positive">+0%</strong>
          </div>
          {/* Tỷ giá giao dịch 1 tháng */}
          <div>
            <span>Tỷ giá giao dịch trong 1 tháng</span>
            <strong className="negative">-0.06%</strong>
          </div>
          {/* Tỷ giá giao dịch 3 tháng */}
          <div>
            <span>Tỷ giá giao dịch trong 3 tháng</span>
            <strong className="negative">-0.02%</strong>
          </div>
        </div>
        {/* Thông báo tình hình thị trường */}
        <p className="highlight">
          <strong>Tỷ giá giao dịch của Tether USDt đang tăng.</strong>
        </p>
        {/* Mô tả chi tiết về tỷ giá và quy đổi */}
        <p className="conversion-desc">
          Hiện tại, giá trị của 1 USDT là <strong>25,479.79 VND</strong>, tức là mua 5 USDT sẽ có giá <strong>127,398.94 VND</strong>.
          Ngược lại, có thể đổi <strong>1.00 VND</strong> để lấy <strong>0.0000392 USDT</strong> và có thể đổi <strong>50.00 VND</strong>
          lấy <strong>0.0019623 USDT</strong>, không bao gồm phí nền tảng và phí gas.
        </p>
      </div>
    </section>
  );
};

export default MarketSection;
