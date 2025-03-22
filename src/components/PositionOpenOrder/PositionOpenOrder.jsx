import React, { useState } from "react";
import "./PositionOpenOrders.css";

const PositionOpenOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, type: "long", amount: 50, entryPrice: 31000, currentPrice: 31200 },
    { id: 2, type: "short", amount: 30, entryPrice: 31500, currentPrice: 31200 },
  ]);

  // Tính lợi nhuận hoặc lỗ dựa trên loại lệnh
  const calculatePnL = (order) => {
    const priceDiff = order.type === "long" ? order.currentPrice - order.entryPrice : order.entryPrice - order.currentPrice;
    return priceDiff * order.amount;
  };

  return (
    <div className="position-open-orders">
      <h3>Vị thế & Lệnh Chờ</h3>
      <table>
        <thead>
          <tr>
            <th>Loại</th>
            <th>Số lượng</th>
            <th>Giá vào</th>
            <th>Giá hiện tại</th>
            <th>Lợi nhuận/Lỗ</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className={calculatePnL(order) >= 0 ? "profit" : "loss"}>
              <td>{order.type.toUpperCase()}</td>
              <td>{order.amount} USDT</td>
              <td>{order.entryPrice}</td>
              <td>{order.currentPrice}</td>
              <td>{calculatePnL(order).toLocaleString("vi-VN")} VND</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionOpenOrders;
