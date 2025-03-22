import React, { useState, useEffect } from "react";
import "./TradeHistory.css";

const TradeHistory = () => {
  const [trades, setTrades] = useState(() => {
    // Lấy dữ liệu từ localStorage khi component mount
    const savedTrades = localStorage.getItem("trades");
    return savedTrades ? JSON.parse(savedTrades) : [];
  });

  useEffect(() => {
    const generateTrade = () => {
      const isBuy = Math.random() > 0.5; // Xác định giao dịch mua hoặc bán
      const newTrade = {
        price: (30000 + Math.random() * 2000).toFixed(2), // Giá ngẫu nhiên
        amount: (Math.random() * 2).toFixed(4), // Khối lượng ngẫu nhiên
        type: isBuy ? "buy" : "sell", // Loại giao dịch
        time: new Date().toLocaleTimeString(), // Thời gian giao dịch
      };

      // Lưu tối đa 20 giao dịch gần nhất
      setTrades((prevTrades) => {
        const updatedTrades = [newTrade, ...prevTrades].slice(0, 20);
        localStorage.setItem("trades", JSON.stringify(updatedTrades));
        return updatedTrades;
      });
    };

    generateTrade(); // Gọi lần đầu
    const interval = setInterval(generateTrade, 1000); // Cập nhật mỗi giây
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="trade-history">
      <h3>Trade History</h3>
      <div className="trade-list">
        {trades.map((trade, index) => (
          <div key={index} className={`trade-item ${trade.type}`}>
            <span className="time">{trade.time}</span>
            <span className="price">{trade.price}</span>
            <span className="amount">{trade.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeHistory;
