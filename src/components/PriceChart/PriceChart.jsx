import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./PriceChart.css";

// Hàm tạo dữ liệu giả lập cho biểu đồ
const generateFakeData = () => {
  const now = new Date();
  let startPriceVND = 150000; // Giá khởi điểm của VNĐ
  let data = [];

  for (let i = 29; i >= 0; i--) {
    let randomChangePercent = (Math.random() * 70 - 35).toFixed(2); // Biến động giá từ -35% đến +35%
    let changeAmount = (startPriceVND * randomChangePercent) / 100; // Tính mức thay đổi giá
    startPriceVND = Math.max(1, startPriceVND + changeAmount); // Đảm bảo giá không nhỏ hơn 1
    let startPriceUSDT = (startPriceVND / 150000).toFixed(3); // Quy đổi ra USDT
    let time = new Date(now.getTime() - i * 1000).toLocaleTimeString(); // Mốc thời gian

    data.push({ time, vnd: Math.round(startPriceVND), usdt: parseFloat(startPriceUSDT) });
  }
  return data;
};

const PriceChart = () => {
  const [data, setData] = useState(generateFakeData()); // State chứa dữ liệu biểu đồ
  const [latestPriceVND, setLatestPriceVND] = useState(data[data.length - 1].vnd); // Giá VNĐ mới nhất
  const [latestPriceUSDT, setLatestPriceUSDT] = useState(data[data.length - 1].usdt); // Giá USDT mới nhất
  const [priceChangePercent, setPriceChangePercent] = useState(0); // % biến động giá
  const [priceColor, setPriceColor] = useState("#000"); // Màu sắc thể hiện xu hướng giá

  // Hàm cập nhật giá ngẫu nhiên mỗi giây
  const updatePrice = () => {
    const now = new Date();
    let randomChangePercent = (Math.random() * 70 - 35).toFixed(2); // Biến động ±35%
    let changeAmount = (latestPriceVND * randomChangePercent) / 100; // Tính mức thay đổi giá
    let newPriceVND = Math.max(1, latestPriceVND + changeAmount); // Đảm bảo giá không âm
    let newPriceUSDT = (newPriceVND / 150000).toFixed(3); // Quy đổi sang USDT

    let percentChange = ((newPriceVND - latestPriceVND) / latestPriceVND) * 100; // Tính phần trăm thay đổi giá
    setPriceChangePercent(percentChange.toFixed(2));

    // Xác định màu sắc dựa trên biến động giá
    if (newPriceVND > latestPriceVND) setPriceColor("#0ecb81"); // Xanh nếu giá tăng
    else if (newPriceVND < latestPriceVND) setPriceColor("#ff4d4f"); // Đỏ nếu giá giảm
    else setPriceColor("#000"); // Màu mặc định nếu không thay đổi

    // Cập nhật giá trị mới
    setLatestPriceVND(newPriceVND);
    setLatestPriceUSDT(parseFloat(newPriceUSDT));

    // Cập nhật dữ liệu biểu đồ, giữ lại 30 điểm dữ liệu gần nhất
    setData((prevData) => [
      ...prevData.slice(-29),
      { time: now.toLocaleTimeString(), vnd: Math.round(newPriceVND), usdt: parseFloat(newPriceUSDT) },
    ]);
  };

  // useEffect thiết lập interval để cập nhật giá mỗi giây
  useEffect(() => {
    const interval = setInterval(updatePrice, 1000);
    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, [latestPriceVND]);

  return (
    <div className="price-chart">
      <h2>📈 Biểu Đồ Giá USDT/VND</h2>

      {/* Hiển thị giá VNĐ và USDT hiện tại với màu sắc thay đổi theo xu hướng */}
      <p style={{ color: priceColor, fontWeight: "bold", fontSize: "18px" }}>
        Giá VNĐ: {latestPriceVND.toLocaleString("vi-VN").replace(/\./g, ",")} VND |
        Giá USDT: {latestPriceUSDT} USDT
      </p>

      {/* Hiển thị phần trăm thay đổi giá với icon tương ứng */}
      <p style={{ color: priceColor, fontSize: "16px", fontWeight: "bold" }}>
        {priceChangePercent > 0 && `🟢 +${priceChangePercent}%`}
        {priceChangePercent < 0 && `🔴 ${priceChangePercent}%`}
        {priceChangePercent == 0 && `⚫ 0.00%`}
      </p>

      {/* Biểu đồ giá theo thời gian */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.slice(-10)} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="#444" /> {/* Lưới nền */}
          <XAxis dataKey="time" tick={{ fill: "#ccc" }} /> {/* Trục X hiển thị thời gian */}
          <YAxis tick={{ fill: "#ccc" }} /> {/* Trục Y hiển thị giá */}
          <Tooltip formatter={(value) => value.toLocaleString("vi-VN").replace(/\./g, ",")} /> {/* Tooltip hiển thị giá */}
          <Legend /> {/* Chú thích các thanh trong biểu đồ */}
          <Bar dataKey="vnd" fill="#fcb900" name="VNĐ" /> {/* Thanh biểu đồ cho VNĐ */}
          <Bar dataKey="usdt" fill="#0ecb81" name="USDT" /> {/* Thanh biểu đồ cho USDT */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
