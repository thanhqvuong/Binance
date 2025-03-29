import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./BuyForm.css";

const USDT_RATE = 25870; // Tỷ giá 1 USDT = 25,870 VND

const BuyForm = () => {
  const [vnd, setVnd] = useState(150000);
  const [usdtAmount, setUsdtAmount] = useState(1);
  const [balance, setBalance] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  // ✅ Format số tiền có dấu `,` phân cách hàng nghìn
  const formatCurrency = (value) => value.toLocaleString("vi-VN").replace(/\./g, ",");

  // ✅ Load dữ liệu user & tính số dư theo công thức mới: (Nạp + Bán) - (Mua + Rút)
  const loadUserData = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;
    
    setUsername(storedUser.username);
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const userTransactions = transactions.filter(tx => tx.username === storedUser.username);

    // 🔹 Tính số dư đúng công thức
    let totalVND = userTransactions.reduce((acc, tx) => {
      if (tx.type === "Nạp" || tx.type === "Bán") return acc + tx.amount;
      if (tx.type === "Mua" || tx.type === "Rút") return acc - tx.amount;
      return acc;
    }, 0);
    
    setBalance(totalVND);

    // 🔹 Kiểm tra gói định kỳ đã đăng ký
    const storedSubscription = JSON.parse(localStorage.getItem("subscription"));
    if (storedSubscription?.username === storedUser.username) {
      setSubscription(storedSubscription);
      setUsdtAmount(storedSubscription.vndAmount / USDT_RATE);
      setIsConfirmed(!!storedSubscription.lastPurchase);

      // Kiểm tra nếu hôm nay đã mua thì báo `đã mua`
      if (storedSubscription.lastPurchase && dayjs(storedSubscription.lastPurchase).isSame(dayjs(), "day")) {
        setAlreadyPurchased(true);
      }
    }
  };

  // ✅ Chọn gói định kỳ
  const handleSubscriptionChange = (plan) => {
    if (balance < vnd) {
      alert("❌ Số dư không đủ!");
      return;
    }

    const newSubscription = {
      username,
      plan,
      vndAmount: vnd,
      lastPurchase: null,
    };
    localStorage.setItem("subscription", JSON.stringify(newSubscription));
    setSubscription(newSubscription);
    setIsConfirmed(false);
    setAlreadyPurchased(false);
  };

  // ✅ Xác nhận mua USDT theo gói định kỳ
  const confirmSubscription = () => {
    if (!subscription) return;

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const newTransaction = {
      username,
      type: "Mua",
      amount: subscription.vndAmount,
      currency: "VND",
      time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };

    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    const updatedSubscription = { ...subscription, lastPurchase: newTransaction.time };
    localStorage.setItem("subscription", JSON.stringify(updatedSubscription));
    setSubscription(updatedSubscription);
    setIsConfirmed(true);
    setAlreadyPurchased(true);

    alert(`✅ Bạn đã mua gói ${subscription.plan} với ${usdtAmount.toFixed(3)} USDT!`);
    loadUserData(); // Cập nhật lại số dư sau giao dịch
  };

  // ✅ Hủy gói định kỳ
  const cancelSubscription = () => {
    localStorage.removeItem("subscription");
    setSubscription(null);
    setIsConfirmed(false);
    setAlreadyPurchased(false);
  };

  // ✅ Thay đổi số lượng USDT mua
  const changeUSDT = (amount) => {
    const newAmount = usdtAmount + amount;
    if (newAmount < 1) return;
    setVnd(newAmount * USDT_RATE);
    setUsdtAmount(newAmount);
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
              <button onClick={() => changeUSDT(-1)}>-</button>
              <span>{usdtAmount.toFixed(3)} USDT</span>
              <button onClick={() => changeUSDT(1)}>+</button>
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
