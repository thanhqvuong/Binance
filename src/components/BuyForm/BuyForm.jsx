import React, { useState, useEffect } from "react"; // Import React và hooks
import "./BuyForm.css"; // Import file CSS

const BuyForm = () => {
  const [vnd, setVnd] = useState(150000); // Số tiền mặc định tối thiểu
  const [usdt, setUsdt] = useState((150000 / 25870).toFixed(6)); // Tính USDT từ VND
  const [error, setError] = useState(""); // Lưu trạng thái lỗi
  const [balance, setBalance] = useState(0); // Số dư tài khoản
  const [subscription, setSubscription] = useState(null); // Gói định kỳ hiện tại
  const [usdtAmount, setUsdtAmount] = useState(1); // Số USDT muốn mua
  const [lastPurchase, setLastPurchase] = useState(null); // Lần mua cuối cùng
  const USDT_RATE = 25870; // Tỷ giá USDT
  
  useEffect(() => {
    loadUserData(); // Gọi hàm tải dữ liệu khi component mount
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN").replace(/\./g, ","); // Định dạng số tiền VND
  };

  const loadUserData = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage
    if (!storedUser) return;

    const transactions = JSON.parse(localStorage.getItem("transactions")) || []; // Lấy danh sách giao dịch
    const userTransactions = transactions.filter(tx => tx.username === storedUser.username); // Lọc giao dịch theo user

    let totalVND = userTransactions.reduce((acc, tx) => {
      if (tx.type === "Nạp") return acc + tx.amount; // Cộng số tiền nếu là nạp
      if (tx.type === "Rút") return acc - tx.amount; // Trừ số tiền nếu là rút
      return acc;
    }, 0);
    setBalance(totalVND); // Cập nhật số dư tài khoản

    const storedSubscription = JSON.parse(localStorage.getItem("subscription")); // Lấy thông tin gói định kỳ
    if (storedSubscription?.username === storedUser.username) {
      setSubscription(storedSubscription.plan); // Cập nhật gói định kỳ
      setUsdtAmount(storedSubscription.vndAmount / USDT_RATE); // Tính lại số USDT
      setLastPurchase(storedSubscription.lastPurchase); // Cập nhật ngày mua cuối
    }
  };

  const handleSubscriptionChange = (plan) => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Lấy user từ localStorage
    if (!storedUser || balance < vnd) {
      setError("❌ Số dư không đủ!"); // Báo lỗi nếu không đủ tiền
      return;
    }

    const newSubscription = {
      username: storedUser.username,
      plan, // Lưu loại gói định kỳ
      vndAmount: vnd, // Lưu số tiền VND
      lastPurchase: null, // Reset ngày mua
    };
    localStorage.setItem("subscription", JSON.stringify(newSubscription)); // Lưu vào localStorage
    setSubscription(plan); // Cập nhật UI
  };

  const cancelSubscription = () => {
    localStorage.removeItem("subscription"); // Xóa gói định kỳ khỏi localStorage
    setSubscription(null); // Cập nhật UI
  };

  const increaseUSDT = () => {
    let newVnd = (usdtAmount + 1) * USDT_RATE; // Tính số tiền mới khi tăng USDT
    setVnd(newVnd);
    setUsdtAmount(usdtAmount + 1);
  };

  const decreaseUSDT = () => {
    if (usdtAmount > 1) {
      let newVnd = (usdtAmount - 1) * USDT_RATE; // Tính số tiền mới khi giảm USDT
      setVnd(newVnd);
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
          <button onClick={decreaseUSDT}>-</button>
          <span>{usdtAmount} USDT</span>
          <button onClick={increaseUSDT}>+</button>
          <button onClick={cancelSubscription}>❌ Hủy gói</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleSubscriptionChange("daily")} disabled={balance < vnd}>Mỗi ngày</button>
          <button onClick={() => handleSubscriptionChange("every2days")} disabled={balance < vnd}>2 ngày/lần</button>
          <button onClick={() => handleSubscriptionChange("monthly")} disabled={balance < vnd}>Mỗi tháng</button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default BuyForm; // Xuất component
