import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./EarningCalculator.css";

// Định nghĩa các mức tăng trưởng hàng năm theo số năm đầu tư
const growthRates = {
  1: 0.05, // 5% mỗi năm
  2: 0.04, // 4% mỗi năm
  3: 0.035, // 3.5% mỗi năm
  5: 0.03, // 3% mỗi năm
};

const EarningsCalculator = () => {
  // State lưu số tiền đầu tư ban đầu, mặc định là 1000 USDT
  const [investment, setInvestment] = useState(1000);
  
  // State lưu số năm đầu tư được chọn, mặc định là 3 năm
  const [selectedYears, setSelectedYears] = useState(3);
  
  // State lưu dữ liệu để hiển thị trên biểu đồ
  const [chartData, setChartData] = useState([]);

  // useEffect chạy lại khi `investment` hoặc `selectedYears` thay đổi
  useEffect(() => {
    let newData = []; // Mảng mới chứa dữ liệu cho biểu đồ
    let rate = growthRates[selectedYears]; // Lấy tỷ lệ tăng trưởng tương ứng với số năm đã chọn

    // Tính toán giá trị đầu tư theo từng năm
    for (let i = 0; i <= selectedYears; i++) {
      let amount = investment * Math.pow(1 + rate, i); // Công thức lãi kép: A = P(1 + r)^n
      newData.push({ year: `${i} năm`, value: parseFloat(amount.toFixed(2)) }); // Làm tròn 2 chữ số thập phân
    }

    setChartData(newData); // Cập nhật state biểu đồ
  }, [investment, selectedYears]); // Chạy lại khi investment hoặc selectedYears thay đổi

  return (
    <div className="calculator-container">
      <h2>Tính toán thu nhập từ tiền mã hóa</h2>
      <div className="calculator-content">
        {/* Cột bên trái - Nhập số liệu */}
        <div className="input-calculator-section">
          <div className="input-calculator-group">
            <label>Tôi có</label>
            <input
              type="number"
              value={investment} // Liên kết với state `investment`
              onChange={(e) => setInvestment(Number(e.target.value))} // Cập nhật giá trị khi nhập số mới
            />
            <span>USDT</span> {/* Đơn vị tiền */}
          </div>
          
          {/* Nút chọn số năm đầu tư */}
          <div className="year-buttons">
            {[1, 2, 3, 5].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYears(year)} // Cập nhật số năm được chọn
                className={selectedYears === year ? "active" : ""} // Đánh dấu nút đang được chọn
              >
                {year} năm
              </button>
            ))}
          </div>
        </div>

        {/* Cột bên phải - Biểu đồ */}
        <div className="chart-calculator-section">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}> {/* Biểu đồ dạng cột */}
              <CartesianGrid strokeDasharray="3 3" /> {/* Lưới nền biểu đồ */}
              <XAxis dataKey="year" /> {/* Trục X hiển thị số năm */}
              <YAxis /> {/* Trục Y hiển thị giá trị đầu tư */}
              <Tooltip contentStyle={{ backgroundColor: "var(--tooltip-bg)", color: "var(--text-color)" }} /> {/* Tooltip hiển thị giá trị khi hover */}
              <Bar dataKey="value" fill="var(--primary-color)" /> {/* Thanh cột hiển thị giá trị */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EarningsCalculator;
