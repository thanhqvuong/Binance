import React from "react";
import "./ExchangeTable.css";

const ExchangeTable = () => {
  const usdtToVnd = [
    { usdt: 0.5, vnd: "12,935 VND" },
    { usdt: 1, vnd: "25,870 VND" },
    { usdt: 5, vnd: "129,350 VND" },
    { usdt: 10, vnd: "258,700 VND" },
    { usdt: 50, vnd: "1,293,500 VND" },
    { usdt: 100, vnd: "2,587,000 VND" },
    { usdt: 500, vnd: "12,935,000 VND" },
    { usdt: 1000, vnd: "25,870,000 VND" },
  ];

  const vndToUsdt = [
    { vnd: 1, usdt: "0.000039 USDT" },
    { vnd: 5, usdt: "0.000193 USDT" },
    { vnd: 10, usdt: "0.000387 USDT" },
    { vnd: 50, usdt: "0.001933 USDT" },
    { vnd: 100, usdt: "0.003865 USDT" },
    { vnd: 500, usdt: "0.019327 USDT" },
    { vnd: 1000, usdt: "0.038655 USDT" },
  ];

  return (
    <div className="exchange-container">
      <div className="exchange-box">
        <h3>USDT đến VND</h3>
        <ul>
          {usdtToVnd.map((item, index) => (
            <li key={index}>
              <span>{item.usdt} USDT</span>
              <span>{item.vnd}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="exchange-box">
        <h3>VND đến USDT</h3>
        <ul>
          {vndToUsdt.map((item, index) => (
            <li key={index}>
              <span>{item.vnd} VND</span>
              <span>{item.usdt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExchangeTable;
