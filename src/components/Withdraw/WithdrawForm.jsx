import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"; // 📌 Import thư viện Day.js để lấy thời gian chuẩn
import "./WithdrawForm.css";

const WithdrawForm = () => {
  const navigate = useNavigate(); // 📌 Hook điều hướng trong React Router
  const [showInput, setShowInput] = useState(false); // 📌 Trạng thái hiển thị ô nhập số tiền
  const [amount, setAmount] = useState(""); // 📌 Lưu số tiền nhập vào
  const [balance, setBalance] = useState(0); // 📌 Lưu số dư tài khoản

  // 📌 Lấy thông tin user từ localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {}; 
  const username = storedUser.username || ""; // 📌 Nếu không có user, trả về chuỗi rỗng

  useEffect(() => {
    calculateBalance(); // 📌 Khi component mount, cập nhật số dư
  }, []);

  // 📌 Tính toán số dư dựa trên lịch sử giao dịch
  const calculateBalance = () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // 📌 Lọc giao dịch theo username và tính tổng số dư
    let totalVND = transactions.reduce((acc, tx) => {
      if (tx.username === username) {
        if (tx.type === "Nạp") return acc + tx.amount; // 📌 Cộng số tiền nạp
        if (tx.type === "Rút") return acc - tx.amount; // 📌 Trừ số tiền rút
      }
      return acc;
    }, 0);

    setBalance(totalVND); // 📌 Cập nhật số dư vào state
  };

  // 📌 Xử lý rút tiền
  const handleWithdraw = () => {
    if (!username) {
      alert("Bạn cần đăng nhập trước khi rút tiền!");
      return;
    }

    const parsedAmount = Number(amount);
    
    // 📌 Kiểm tra số tiền hợp lệ (phải là số nguyên dương, tối thiểu 50,000 VND)
    if (!amount || isNaN(parsedAmount) || parsedAmount < 50000 || !Number.isInteger(parsedAmount)) {
      alert("Vui lòng nhập số tiền hợp lệ (số nguyên dương, tối thiểu 50,000 VND)!");
      return;
    }

    if (parsedAmount > balance) {
      alert("❌ Số dư không đủ để rút!");
      return;
    }

    // 📌 Lấy thời gian hiện tại bằng dayjs
    const formattedTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

    // 📌 Tạo object giao dịch mới
    const newTransaction = {
      username, // 📌 Lưu kèm username để quản lý nhiều user
      type: "Rút", 
      amount: parsedAmount, 
      currency: "VND", 
      time: formattedTime, 
    };

    // 📌 Lấy danh sách giao dịch từ localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(newTransaction); // 📌 Thêm giao dịch mới

    // 📌 Lưu lại vào localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));

    alert(`✅ Bạn đã rút ${parsedAmount.toLocaleString("vi-VN")} VND thành công!`);
    calculateBalance(); // 📌 Cập nhật số dư
    setShowInput(false); // 📌 Ẩn input sau khi rút
    setAmount(""); // 📌 Reset ô nhập tiền
  };

  return (
    <div className="withdraw-container">
      <h2>Rút tiền</h2>

      {/* 📌 Hiển thị số dư với format VND */}
      <p><strong>Số dư hiện tại:</strong> {balance.toLocaleString("vi-VN")} VND</p>

      {/* 📌 Chỉ hiển thị đơn vị tiền tệ nếu có số dư */}
      {balance > 0 && (
        <>
          <label>Loại tiền tệ</label>
          <select>
            <option value="VND">VND Đồng Việt Nam</option>
            <option value="USD">USD Đô la Mỹ</option>
            <option value="EUR">EUR Euro</option>
            <option value="BTC">BTC Bitcoin</option>
          </select>
        </>
      )}

      <label>Phương thức nhận</label>
      <div className="payment-box">
        <button className="payment-button" onClick={() => navigate("/trading")}>
          Rút qua P2P
        </button>
      </div>

      {!showInput ? (
        <button className="continue-button" onClick={() => setShowInput(true)}>
          Rút
        </button>
      ) : (
        <div className="withdraw-input">
          <input
            type="number"
            placeholder="Nhập số tiền rút"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="50000" // 📌 Giới hạn rút tối thiểu 50,000 VND
          />
          <button className="confirm-button" onClick={handleWithdraw}>
            Xác nhận rút
          </button>
        </div>
      )}
    </div>
  );
};

export default WithdrawForm;
