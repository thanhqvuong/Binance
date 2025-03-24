import React, { useState, useEffect } from "react"; // Import React và các hooks
import "./BuyForm.css"; // Import CSS cho giao diện

const BuyForm = () => {
  const [vnd, setVnd] = useState(150000); // Số tiền mặc định tối thiểu (VND)
  const [usdtAmount, setUsdtAmount] = useState((150000 / 25870).toFixed(6)); // Số lượng USDT tính theo tỷ giá
  const [error, setError] = useState(""); // Lưu trạng thái lỗi
  const [balance, setBalance] = useState(0); // Số dư tài khoản (VND)
  const [subscription, setSubscription] = useState(null); // Gói định kỳ hiện tại
  const [lastPurchase, setLastPurchase] = useState(null); // Lần mua cuối cùng
  const [showConfirm, setShowConfirm] = useState(false); // Hiển thị nút xác nhận
  const USDT_RATE = 25870; // Tỷ giá USDT

  // Tải dữ liệu người dùng từ localStorage khi component mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Hàm định dạng số tiền (VND) có dấu phẩy
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN").replace(/\./g, ",");
  };

  // Hàm tải dữ liệu từ localStorage
  const loadUserData = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage
    if (!storedUser) return;

    // Lấy danh sách giao dịch từ localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const userTransactions = transactions.filter(tx => tx.username === storedUser.username);

    // Tính toán số dư từ các giao dịch (cộng nạp, trừ rút)
    let totalVND = userTransactions.reduce((acc, tx) => {
      if (tx.type === "Nạp") return acc + tx.amount;
      if (tx.type === "Rút") return acc - tx.amount;
      return acc;
    }, 0);
    setBalance(totalVND); // Cập nhật số dư

    // Lấy thông tin gói định kỳ
    const storedSubscription = JSON.parse(localStorage.getItem("subscription"));
    if (storedSubscription?.username === storedUser.username) {
      setSubscription(storedSubscription.plan);
      setUsdtAmount(storedSubscription.vndAmount / USDT_RATE); // Cập nhật số USDT từ gói định kỳ
      setLastPurchase(storedSubscription.lastPurchase);
    }
  };

  // Khi chọn gói định kỳ
  const handleSubscriptionChange = (plan) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || balance < vnd) {
      setError("❌ Số dư không đủ!");
      return;
    }

    // Cập nhật thông tin gói vào localStorage
    const newSubscription = {
      username: storedUser.username,
      plan,
      vndAmount: vnd, // Số tiền VND theo gói
      lastPurchase: null, // Reset ngày mua
    };
    localStorage.setItem("subscription", JSON.stringify(newSubscription));
    setSubscription(plan); // Cập nhật UI
    setShowConfirm(true); // Hiển thị nút xác nhận
  };

  // Khi xác nhận gói định kỳ
  const confirmSubscription = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    const today = new Date().toISOString().split("T")[0]; // Lấy ngày hôm nay

    // Kiểm tra nếu hôm nay đã mua gói thì không cho mua lại
    if (lastPurchase === today) {
      setError("✔️ Hôm nay bạn đã mua gói này rồi!");
      return;
    }

    // Tạo giao dịch và lưu vào transactions
    const newTransaction = {
      username: storedUser.username,
      type: "Mua",
      amount: vnd,
      currency: "VND",
      time: new Date().toLocaleString("vi-VN"), // Lấy thời gian hiện tại
    };

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Cập nhật thông tin gói định kỳ (có thời gian mua)
    const updatedSubscription = {
      ...JSON.parse(localStorage.getItem("subscription")),
      lastPurchase: today,
    };
    localStorage.setItem("subscription", JSON.stringify(updatedSubscription));
    setLastPurchase(today); // Cập nhật ngày mua cuối

    setShowConfirm(false); // Ẩn nút xác nhận
    setError("✔️ Bạn đã chọn gói định kỳ thành công!"); // Hiển thị thông báo thành công
  };

  // Hủy gói định kỳ
  const cancelSubscription = () => {
    localStorage.removeItem("subscription");
    setSubscription(null);
    setShowConfirm(false);
  };

  // Tăng số lượng USDT muốn mua
  const increaseUSDT = () => {
    let newVnd = (usdtAmount + 1) * USDT_RATE;
    setVnd(newVnd);
    setUsdtAmount(usdtAmount + 1);
  };

  // Giảm số lượng USDT muốn mua
  const decreaseUSDT = () => {
    if (usdtAmount > 1) {
      let newVnd = (usdtAmount - 1) * USDT_RATE;
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
          {showConfirm && <button onClick={confirmSubscription}>✔️ Xác nhận</button>}
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

export default BuyForm;
