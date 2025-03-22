import React, { useState } from "react"; // Import React và useState
import "./OrderPlacementForm.css"; // Import file CSS để tạo kiểu

const MIN_USDT = 1; // Số USDT tối thiểu để mua
const EXCHANGE_RATE = 25870; // 1 USDT = 25,870 VND

const OrderPlacementForm = () => {
  // State quản lý loại lệnh (Market, Limit, Stop-Limit)
  const [orderType, setOrderType] = useState("market"); 

  // State quản lý số lượng USDT đặt lệnh
  const [amount, setAmount] = useState(""); 

  // State quản lý mức đòn bẩy (leverage)
  const [leverage, setLeverage] = useState(1); 

  // Xử lý khi người dùng đặt lệnh
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    
    // Xử lý giá trị USDT, tối thiểu là MIN_USDT
    const usdtAmount = Math.max(MIN_USDT, parseFloat(amount) || 0);
    
    // Quy đổi sang VND
    const vndAmount = usdtAmount * EXCHANGE_RATE;
    
    // Hiển thị thông báo đặt lệnh
    alert(`Đặt lệnh ${orderType.toUpperCase()} với số lượng ${usdtAmount} USDT (~${vndAmount.toLocaleString("vi-VN")} VND)`);
  };

  return (
    <div className="order-placement-form">
      <h3>Đặt Lệnh</h3>
      <form onSubmit={handleSubmit}>
        
        {/* Chọn loại lệnh */}
        <label>Loại lệnh:</label>
        <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
          <option value="market">Market</option>
          <option value="limit">Limit</option>
          <option value="stop-limit">Stop-Limit</option>
        </select>

        {/* Nhập số lượng USDT */}
        <label>Số lượng USDT:</label>
        <input
          type="number"
          min={MIN_USDT}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Nhập đòn bẩy */}
        <label>Đòn bẩy:</label>
        <input
          type="number"
          min="1"
          max="125"
          value={leverage}
          onChange={(e) => setLeverage(e.target.value)}
        />

        {/* Nút đặt lệnh */}
        <button type="submit">Đặt Lệnh</button>
      </form>
    </div>
  );
};

export default OrderPlacementForm;
