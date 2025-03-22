import React, { useState, useEffect } from "react";
import "./BuyForm.css";

const BuyForm = () => {
  const [vnd, setVnd] = useState(""); // Số tiền nhập vào bằng VND
  const [usdt, setUsdt] = useState(0); // Số USDT tính được
  const [error, setError] = useState(""); // Thông báo lỗi nếu có
  const [canTrade, setCanTrade] = useState(false); // Kiểm tra giờ giao dịch
  const [balance, setBalance] = useState(0); // Số dư tài khoản
  const [subscription, setSubscription] = useState(null); // Lưu gói định kỳ
  const [usdtAmount, setUsdtAmount] = useState(1); // Số USDT muốn mua định kỳ
  const [lastPurchase, setLastPurchase] = useState(null); // Lần mua gần nhất

  const USDT_RATE = 25870; // Tỷ giá 1 USDT = 25,870 VND
  const MIN_VND = 150000; // Số tiền tối thiểu để mua

  useEffect(() => {
    loadUserData(); // Tải dữ liệu user khi mở trang
    checkTradingTime(); // Kiểm tra giờ giao dịch
    const interval = setInterval(checkTradingTime, 1000); // Cập nhật mỗi giây
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN").replace(/\./g, ",");
  };

  const loadUserData = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const userTransactions = transactions.filter(tx => tx.username === storedUser.username);

    // Tính số dư tài khoản
    let totalVND = userTransactions.reduce((acc, tx) => {
      if (tx.type === "Nạp") return acc + tx.amount;
      if (tx.type === "Rút") return acc - tx.amount;
      return acc;
    }, 0);
    setBalance(formatCurrency(totalVND));

    // Lấy thông tin gói định kỳ
    const storedSubscription = JSON.parse(localStorage.getItem("subscription"));
    if (storedSubscription?.username === storedUser.username) {
      setSubscription(storedSubscription.plan);
      setUsdtAmount(storedSubscription.usdt);
      setLastPurchase(storedSubscription.lastPurchase);
    }
  };

  const handleVndChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    let vndValue = Number(input);
    setVnd(formatCurrency(vndValue));
    setUsdt((vndValue / USDT_RATE).toFixed(6));

    if (vndValue < MIN_VND) {
      setError(`⚠ Số tiền tối thiểu là ${formatCurrency(MIN_VND)} VND`);
    } else if (vndValue > parseInt(balance.replace(/,/g, ""), 10)) {
      setError("❌ Số dư không đủ!");
    } else {
      setError("");
    }
  };

  const checkTradingTime = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    setCanTrade((day >= 1 && day <= 5 && hour >= 7 && hour < 20) || ((day === 0 || day === 6) && hour >= 7 && hour < 22));
  };

  const handleSubscriptionChange = (plan) => {
    if (!canTrade) return;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    const newSubscription = {
      username: storedUser.username,
      plan,
      usdt: usdtAmount,
      lastPurchase: null
    };
    localStorage.setItem("subscription", JSON.stringify(newSubscription));
    setSubscription(plan);
  };

  const cancelSubscription = () => {
    localStorage.removeItem("subscription");
    setSubscription(null);
  };

  const increaseUSDT = () => setUsdtAmount((prev) => prev + 1);
  const decreaseUSDT = () => setUsdtAmount((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    if (!subscription) return;
    const today = new Date().toISOString().split("T")[0];
    if (lastPurchase === today) return; // Hôm nay đã mua rồi

    if (subscription === "daily" || (subscription === "every2days" && checkDaysPassed(2)) || (subscription === "monthly" && checkDaysPassed(30))) {
      processSubscriptionPurchase();
    }
  }, [subscription]);

  const checkDaysPassed = (days) => {
    if (!lastPurchase) return true;
    const lastDate = new Date(lastPurchase);
    const today = new Date();
    return (today - lastDate) / (1000 * 60 * 60 * 24) >= days;
  };

  const processSubscriptionPurchase = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({
      username: storedUser.username,
      type: "Mua",
      amount: usdtAmount,
      currency: "USDT",
      time: new Date().toISOString(),
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    const updatedSubscription = { ...subscription, lastPurchase: new Date().toISOString().split("T")[0] };
    localStorage.setItem("subscription", JSON.stringify(updatedSubscription));
    setLastPurchase(updatedSubscription.lastPurchase);
  };

  return (
    <div className="buy-form">
      <h2>🔹 Giao Dịch USDT Định Kỳ 🔹</h2>
      <p><strong>Số dư:</strong> {balance} VND</p>
      {subscription ? (
        <div>
          <p>Gói hiện tại: {subscription} - {usdtAmount} USDT</p>
          <button onClick={decreaseUSDT}>-</button>
          <span>{usdtAmount} USDT</span>
          <button onClick={increaseUSDT}>+</button>
          <button onClick={cancelSubscription}>❌ Hủy gói</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleSubscriptionChange("daily")} disabled={!canTrade}>Mỗi ngày</button>
          <button onClick={() => handleSubscriptionChange("every2days")} disabled={!canTrade}>2 ngày/lần</button>
          <button onClick={() => handleSubscriptionChange("monthly")} disabled={!canTrade}>Mỗi tháng</button>
        </div>
      )}
    </div>
  );
};

export default BuyForm;
