import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "./DepositForm.css";

const DepositForm = () => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState("");

  // Lấy thông tin user từ localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username || "";

  // Xử lý nhập số tiền, tự động thêm dấu ","
  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/[^\d,]/g, ""); // Chỉ giữ số và dấu ","
    value = value.replace(/,/g, ""); // Xóa dấu ","
    
    if (!value) {
      setAmount("");
      return;
    }
  
    let formattedValue = Number(value).toLocaleString("vi-VN"); // Format lại số
    setAmount(formattedValue);
  };
  

  // Xử lý khi nhấn nút nạp tiền
  const handleDeposit = () => {
    if (!username) {
      alert("Bạn cần đăng nhập trước khi nạp tiền!");
      return;
    }
  
    const parsedAmount = Number(amount.replace(/,/g, "")); // Chuyển "5,000,000" → 5000000
  
    if (!parsedAmount || parsedAmount < 50000 || !Number.isInteger(parsedAmount)) {
      alert("Vui lòng nhập số tiền hợp lệ (số nguyên dương, tối thiểu 50,000 VND)!");
      return;
    }
  
    const formattedTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  
    const newTransaction = {
      username,
      type: "Nạp",
      amount: parsedAmount,
      currency: "VND",
      time: formattedTime,
    };
  
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  
    alert(`✅ Bạn đã nạp ${parsedAmount.toLocaleString("vi-VN")} VND thành công!`);
    setShowInput(false);
    setAmount("");
  };
  
  return (
    <div className="deposit-container">
      <h2>Nạp</h2>

      <label>Loại tiền tệ</label>
      <select>
        <option value="VND">VND Đồng Việt Nam</option>
        <option value="USD">USD Đô la Mỹ</option>
        <option value="EUR">EUR Euro</option>
        <option value="BTC">BTC Bitcoin</option>
      </select>

      <label>Thanh toán bằng</label>
      <div className="payment-box">Giao dịch nhanh P2P</div>

      {!showInput ? (
        <button className="continue-button" onClick={() => setShowInput(true)}>
          Nạp
        </button>
      ) : (
        <div className="deposit-input">
          <input
            type="text"
            placeholder="Nhập số tiền nạp"
            value={amount}
            onChange={handleAmountChange}
          />
          <button className="confirm-button" onClick={handleDeposit}>
            Xác nhận nạp
          </button>
        </div>
      )}

      <button className="trading-button" onClick={() => navigate("/trading")}>
        Giao dịch P2P
      </button>
    </div>
  );
};

export default DepositForm;
