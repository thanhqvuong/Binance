import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./TradingChart.css";

const TradingChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      // Lấy giá trước đó, nếu chưa có dữ liệu thì mặc định 30,000
      let previousPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 30000;
      
      // Tạo 30 điểm dữ liệu ngẫu nhiên
      const newData = Array.from({ length: 30 }, (_, i) => {
        // Sinh giá ngẫu nhiên trong khoảng 30,000 - 32,000
        const price = (30000 + Math.random() * 2000).toFixed(2);
        // Tính mức thay đổi so với giá trước đó
        const change = (price - previousPrice).toFixed(2);
        previousPrice = price; // Cập nhật giá trước đó
        return {
          time: `${i + 1}s`, // Gán thời gian theo giây
          price: parseFloat(price), // Chuyển về số thực
          change: parseFloat(change), // Chuyển về số thực
        };
      });
      setChartData(newData); // Cập nhật state dữ liệu biểu đồ
    };

    generateData(); // Gọi hàm sinh dữ liệu lần đầu
    const interval = setInterval(generateData, 1000); // Cập nhật mỗi giây
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <div className="trading-chart">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="time" hide={false} /> {/* Trục X hiển thị thời gian */}
          <YAxis domain={['auto', 'auto']} hide={false} /> {/* Trục Y hiển thị giá */}
          <Tooltip /> {/* Hiển thị tooltip khi hover vào cột */}
          <Bar dataKey="price" fill="#16c784" /> {/* Cột giá BTC */}
          <Bar 
            dataKey="change" 
            className={(entry) =>
              entry.change > 0 ? "bar-up" : entry.change < 0 ? "bar-down" : "bar-neutral"
            } // Đổi màu cột theo mức thay đổi giá
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TradingChart;
