import React from "react";
import "./ExchangeRates.css";

const exchangeData = [
  { currency: "USD", rate: "0.9997994", icon: "💲" },
  { currency: "TRY", rate: "36.48", icon: "₺" },
  { currency: "RUB", rate: "89.98", icon: "₽" },
  { currency: "EUR", rate: "0.9229149", icon: "💶" },
  { currency: "SAR", rate: "3.7492478", icon: "﷼" },
  { currency: "AUD", rate: "1.5896811", icon: "A$" },
  { currency: "BRL", rate: "5.8488266", icon: "R$" },
  { currency: "VND", rate: "25,479.79", icon: "₫" },
  { currency: "INR", rate: "87.13", icon: "₹" },
];

const ExchangeRates = () => {
  return (
    <div className="exchange-rates-container">
      {/* Tiêu đề */}
      <div className="exchange-rates-header">
        <h2>Chuyển đổi Tether USDt phổ biến</h2>
        <p>
          Một lựa chọn phổ biến khác để chuyển đổi Tether USDt sang nhiều loại
          tiền pháp định khác nhau.
        </p>
      </div>

      {/* Lưới tỷ giá 3x3 */}
      <div className="exchange-rates-wrapper">
        <div className="exchange-rates-grid">
          {exchangeData.map((item, index) => (
            <div className="exchange-rates-card" key={index}>
              <div className="exchange-rates-info">
                <h3>USDT đến {item.currency}</h3>
                <p>1 USDT = {item.rate} {item.currency}</p>
              </div>
              <div className="exchange-rates-icon">{item.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
