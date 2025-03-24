import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./BuyForm.css";

const BuyForm = () => {
  const [vnd, setVnd] = useState(150000);
  const [usdtAmount, setUsdtAmount] = useState(1);
  const [balance, setBalance] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);
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
      setSubscription(storedSubscription);
      setUsdtAmount(storedSubscription.vndAmount / USDT_RATE);
      setIsConfirmed(!!storedSubscription.lastPurchase);

      // Kiểm tra nếu đã mua trong ngày
      if (storedSubscription.lastPurchase && dayjs(storedSubscription.lastPurchase).isSame(dayjs(), "day")) {
        setAlreadyPurchased(true);
      }
    }
  };

  const handleSubscriptionChange = (plan) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || balance < vnd) return;

    const newSubscription = {
      username: storedUser.username,
      plan,
      vndAmount: vnd,
      lastPurchase: null,
    };
    localStorage.setItem("subscription", JSON.stringify(newSubscription));
    setSubscription(newSubscription);
    setIsConfirmed(false);
    setAlreadyPurchased(false);
  };

  const confirmSubscription = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !subscription) return;

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const newTransaction = {
      username: storedUser.username,
      type: "Mua",
      amount: subscription.vndAmount,
      currency: "VND",
      time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };

    const updatedTransactions = [...transactions, newTransaction];
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    const updatedSubscription = { ...subscription, lastPurchase: newTransaction.time };
    localStorage.setItem("subscription", JSON.stringify(updatedSubscription));
    setSubscription(updatedSubscription);
    setIsConfirmed(true);
    setAlreadyPurchased(true);

    alert(`✅ Bạn đã mua gói ${subscription.plan} với ${usdtAmount} USDT!`);
  };

  const cancelSubscription = () => {
    localStorage.removeItem("subscription");
    setSubscription(null);
    setIsConfirmed(false);
    setAlreadyPurchased(false);
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

      {alreadyPurchased && (
        <p style={{ color: "green", fontWeight: "bold" }}>✅ Bạn đã mua gói định kỳ hôm nay.</p>
      )}

      {subscription ? (
        <div>
          <p>Gói hiện tại: {subscription.plan} - {formatCurrency(subscription.vndAmount)} VND</p>
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
