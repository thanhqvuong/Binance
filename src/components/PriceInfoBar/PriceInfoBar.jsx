import React, { useState, useEffect } from "react";
import "./PriceInfoBar.css";

const PriceInfoBar = () => {
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);
  const exchangeRate = 25870; // Tỷ giá USDT -> VNĐ

  useEffect(() => {
    // Giả lập dữ liệu giá BTC từ API
    const fetchPrice = () => {
      const newPrice = (30000 + Math.random() * 2000).toFixed(2);
      const newChange = ((Math.random() - 0.5) * 2).toFixed(2);
      setPrice(newPrice);
      setChange(newChange);
    };
    
    fetchPrice();
    const interval = setInterval(fetchPrice, 1000); // Cập nhật mỗi 1 giây
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="price-info-bar">
      <div>
        <strong>BTC/USDT</strong>
      </div>
      <div>
        <span className="price-usdt">${price}</span>
        <br />
        <span className="price-vnd">
          ≈ {(price * exchangeRate).toLocaleString("en-US").toLocaleString()} VNĐ
        </span>
      </div>
      <div className={change >= 0 ? "price-up" : "price-down"}>
        {change >= 0 ? "+" : ""}{change}%
      </div>
    </div>
  );
};

export default PriceInfoBar;
