import React, { useState } from "react"; // Import React và useState để quản lý trạng thái
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng trang
import dayjs from "dayjs"; // Import dayjs để xử lý thời gian
import "./DepositForm.css"; // Import file CSS để tạo kiểu dáng

const DepositForm = () => {
  const navigate = useNavigate(); // Hook điều hướng trang
  const [showInput, setShowInput] = useState(false); // Trạng thái hiển thị ô nhập số tiền
  const [amount, setAmount] = useState(""); // Trạng thái lưu số tiền nhập vào

  // Lấy thông tin user từ localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username || "";

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

  // Xử lý khi nhấn nút nạp tiền
  const handleDeposit = () => {
    if (!username) { // Kiểm tra nếu user chưa đăng nhập
      alert("Bạn cần đăng nhập trước khi nạp tiền!");
      return;
    }

    const parsedAmount = Number(amount.replace(/,/g, "")); // Chuyển về số nguyên

    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0 || !Number.isInteger(parsedAmount)) {
      alert("Vui lòng nhập số tiền hợp lệ (số nguyên dương)!");
      return;
    }

    // Lấy thời gian hiện tại bằng dayjs
    const formattedTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

    // Tạo object giao dịch
    const newTransaction = {
      username,
      type: "Nạp",
      amount: parsedAmount,
      currency: "VND",
      time: formattedTime,
    };

    // Lấy danh sách giao dịch từ localStorage (nếu chưa có thì tạo mảng rỗng)
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(newTransaction);

    // Lưu danh sách giao dịch vào localStorage
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
