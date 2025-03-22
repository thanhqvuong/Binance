import React, { useState, useEffect } from "react";
import "./MarketTrades.css";

const EXCHANGE_RATE = 25870; // 1 USDT = 25,870 VND

// ✅ Hàm định dạng số tiền VND (luôn ≥ 0, có dấu phẩy phân cách)
const formatVND = (amount) => {
  return Math.max(0, Math.floor(amount)).toLocaleString("vi-VN") + " VND";
};

const MarketTrades = () => {
  // ✅ Lấy danh sách giao dịch từ localStorage khi component mount
  const [trades, setTrades] = useState(() => {
    const savedTrades = localStorage.getItem("marketTrades");
    return savedTrades ? JSON.parse(savedTrades) : [];
  });

  useEffect(() => {
    const generateTrade = () => {
      const isBuy = Math.random() > 0.5; // ✅ Xác định loại giao dịch (mua hoặc bán)

      // ✅ Tạo khối lượng giao dịch USDT (tối thiểu 1 USDT, hiển thị 4 số thập phân)
      const usdtAmount = (Math.random() * 2 + 1).toFixed(4);

      // ✅ Giá USDT ngẫu nhiên từ 30,000 - 32,000
      const priceInUSDT = (30000 + Math.random() * 2000).toFixed(2);

      // ✅ Quy đổi sang VND
      const priceInVND = priceInUSDT * EXCHANGE_RATE;

      // ✅ Tạo giao dịch mới
      const newTrade = {
        price: priceInUSDT, // Giá 1 USDT (USD)
        priceVND: formatVND(priceInVND), // Giá quy đổi VND
        amount: usdtAmount, // Số lượng USDT giao dịch
        type: isBuy ? "buy" : "sell", // Loại giao dịch (mua/bán)
        time: new Date().toLocaleTimeString(), // Thời gian giao dịch
      };

      // ✅ Cập nhật danh sách giao dịch, chỉ giữ tối đa 20 giao dịch gần nhất
      setTrades((prevTrades) => {
        const updatedTrades = [newTrade, ...prevTrades].slice(0, 20);
        localStorage.setItem("marketTrades", JSON.stringify(updatedTrades)); // Lưu vào localStorage
        return updatedTrades;
      });
    };

    generateTrade(); // ✅ Tạo giao dịch đầu tiên ngay khi component mount

    const interval = setInterval(generateTrade, 1000); // ✅ Cập nhật mỗi giây
    return () => clearInterval(interval); // ✅ Xóa interval khi component unmount
  }, []);

  return (
    <div className="market-trades">
      <h3>Market Trades</h3>
      <div className="trade-list">
        {trades.map((trade, index) => (
          <div key={index} className={`trade-item ${trade.type}`}>
            <span className="time">{trade.time}</span> {/* ✅ Thời gian giao dịch */}
            <span className="price">{trade.price} USDT</span> {/* ✅ Giá USDT */}
            <span className="price-vnd">{trade.priceVND}</span> {/* ✅ Giá VND */}
            <span className="amount">{trade.amount} USDT</span> {/* ✅ Khối lượng giao dịch */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTrades;
