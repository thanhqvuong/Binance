import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./BuyForm.css";

const BuyForm = () => {
  const [vnd, setVnd] = useState(150000);
  const [usdtAmount, setUsdtAmount] = useState(1);
  const [balance, setBalance] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const USDT_RATE = 25870;

  useEffect(() => {
    loadUserData();
  }, []);

  const formatCurrency = (value) => value.toLocaleString("vi-VN").replace(/\./g, ",");

  const loadUserData = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const userTransactions = transactions.filter(tx => tx.username === storedUser.username);

    let totalVND = userTransactions.reduce((acc, tx) => {
      if (tx.type === "Nạp") return acc + tx.amount;
      if (tx.type === "Rút") return acc - tx.amount;
      return acc;
    }, 0);
    setBalance(totalVND);

    const storedSubscription = JSON.parse(localStorage.getItem("subscription"));
    if (storedSubscription?.username === storedUser.username) {
      setSubscription(storedSubscription.plan);
      setUsdtAmount(storedSubscription.vndAmount / USDT_RATE);
      setIsConfirmed(true);
    }
  };

  const handleSubscriptionChange = (plan) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || balance < vnd) return;

    const newSubscription = {
      username: storedUser.username,
      plan,
      vndAmount: vnd,
    };
    localStorage.setItem("subscription", JSON.stringify(newSubscription));
    setSubscription(plan);
    setIsConfirmed(false);
  };

  const confirmSubscription = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const newTransaction = {
      username: storedUser.username, // Lưu kèm username để quản lý user
      type: "Mua", // Loại giao dịch
      amount: vnd, // Số tiền giao dịch (VND)
      currency: "VND", // Đơn vị tiền tệ
      time: formattedTime, // Thời gian chính xác
    };
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    setIsConfirmed(true);
    alert(`✅ Bạn đã chọn gói ${subscription} với ${usdtAmount} USDT!`);
  };

  const cancelSubscription = () => {
    localStorage.removeItem("subscription");
    setSubscription(null);
    setIsConfirmed(false);
  };

  const increaseUSDT = () => {
    setVnd((usdtAmount + 1) * USDT_RATE);
    setUsdtAmount(usdtAmount + 1);
  };

  const decreaseUSDT = () => {
    if (usdtAmount > 1) {
      setVnd((usdtAmount - 1) * USDT_RATE);
      setUsdtAmount(usdtAmount - 1);
    }
  };

  return (
    <div className="buy-form">
      <h2>🔹 Giao Dịch USDT Định Kỳ 🔹</h2>
      <p><strong>Số dư:</strong> {formatCurrency(balance)} VND</p>
      {subscription ? (
        <div>
          <p>Gói hiện tại: {subscription} - {formatCurrency(vnd)} VND</p>
          {!isConfirmed ? (
            <>
              <button onClick={decreaseUSDT}>-</button>
              <span>{usdtAmount} USDT</span>
              <button onClick={increaseUSDT}>+</button>
              <button onClick={confirmSubscription}>✅ Xác nhận</button>
            </>
          ) : (
            <>
              <button onClick={cancelSubscription}>❌ Hủy gói</button>
              <button onClick={() => setIsConfirmed(false)}>🔄 Đổi gói</button>
            </>
          )}
        </div>
      ) : (
        <div>
          <button onClick={() => handleSubscriptionChange("daily")}>Mỗi ngày</button>
          <button onClick={() => handleSubscriptionChange("every2days")}>2 ngày/lần</button>
          <button onClick={() => handleSubscriptionChange("monthly")}>Mỗi tháng</button>
        </div>
      )}
    </div>
  );
};

export default BuyForm;
