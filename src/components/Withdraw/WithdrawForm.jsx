import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "./WithdrawForm.css";

const WithdrawForm = () => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const username = storedUser.username || "";

  useEffect(() => {
    calculateBalance();
  }, []);

  // 📌 Cập nhật số dư theo công thức mới: (Nạp + Bán) - (Mua + Rút)
  const calculateBalance = () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let totalVND = transactions.reduce((acc, tx) => {
      if (tx.username === username) {
        if (tx.type === "Nạp" || tx.type === "Bán") return acc + tx.amount;
        if (tx.type === "Mua" || tx.type === "Rút") return acc - tx.amount;
      }
      return acc;
    }, 0);

    setBalance(totalVND);
  };

  // 📌 Xử lý nhập số tiền có dấu `,` phân cách hàng nghìn
  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Chỉ giữ số
    if (!value) {
      setAmount("");
      return;
    }
    
    let formattedValue = parseInt(value, 10).toLocaleString("vi-VN"); // Định dạng số
    setAmount(formattedValue);
  };

  const handleWithdraw = () => {
    if (!username) {
      alert("Bạn cần đăng nhập trước khi rút tiền!");
      return;
    }

    const parsedAmount = Number(amount.replace(/,/g, "")); // Chuyển về số nguyên

    if (!amount || isNaN(parsedAmount) || parsedAmount < 50000 || !Number.isInteger(parsedAmount)) {
      alert("Vui lòng nhập số tiền hợp lệ (số nguyên dương, tối thiểu 50,000 VND)!");
      return;
    }

    if (parsedAmount > balance) {
      alert("❌ Số dư không đủ để rút!");
      return;
    }

    const formattedTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const newTransaction = {
      username,
      type: "Rút",
      amount: parsedAmount,
      currency: "VND",
      time: formattedTime,
    };

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    alert(`✅ Bạn đã rút ${parsedAmount.toLocaleString("vi-VN")} VND thành công!`);
    calculateBalance();
    setShowInput(false);
    setAmount("");
  };

  return (
    <div className="withdraw-container">
      <h2>Rút tiền</h2>

      <p><strong>Số dư hiện tại:</strong> {balance.toLocaleString("vi-VN")} VND</p>

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
            type="text"
            placeholder="Nhập số tiền rút"
            value={amount}
            onChange={handleAmountChange}
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
