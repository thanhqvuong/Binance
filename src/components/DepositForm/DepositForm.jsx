import React, { useState } from "react"; // Import React và useState để quản lý trạng thái
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng trang
import dayjs from "dayjs"; // Import dayjs để xử lý thời gian
import "./DepositForm.css"; // Import file CSS để tạo kiểu dáng

const DepositForm = () => {
  const navigate = useNavigate(); // Hook điều hướng trang
  const [showInput, setShowInput] = useState(false); // Trạng thái hiển thị ô nhập số tiền
  const [amount, setAmount] = useState(""); // Trạng thái lưu số tiền nhập vào
  
  // Lấy thông tin user từ localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")); // Lấy dữ liệu user từ localStorage và chuyển thành object
  const username = storedUser?.username || ""; // Lấy username nếu có, nếu không trả về chuỗi rỗng

  // Xử lý khi nhấn nút nạp tiền
  const handleDeposit = () => {
    if (!username) { // Kiểm tra nếu user chưa đăng nhập
      alert("Bạn cần đăng nhập trước khi nạp tiền!"); // Hiển thị cảnh báo
      return; // Dừng hàm
    }

    const parsedAmount = Number(amount); // Chuyển giá trị nhập vào thành số
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0 || !Number.isInteger(parsedAmount)) {
      alert("Vui lòng nhập số tiền hợp lệ (số nguyên dương)!"); // Kiểm tra giá trị hợp lệ
      return; // Dừng hàm
    }

    // Lấy thời gian hiện tại bằng dayjs
    const formattedTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

    // Tạo object giao dịch
    const newTransaction = {
      username, // Lưu kèm username để quản lý user
      type: "Nạp", // Loại giao dịch
      amount: parsedAmount, // Số tiền nạp
      currency: "VND", // Đơn vị tiền tệ
      time: formattedTime, // Thời gian giao dịch
    };

    // Lấy danh sách giao dịch từ localStorage (nếu chưa có thì tạo mảng rỗng)
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(newTransaction); // Thêm giao dịch mới vào danh sách

    // Lưu danh sách giao dịch vào localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));

    alert(`Bạn đã nạp ${parsedAmount.toLocaleString()} VND thành công!`); // Thông báo thành công
    setShowInput(false); // Ẩn ô nhập sau khi nạp
    setAmount(""); // Reset giá trị ô nhập
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

      {!showInput ? ( // Nếu chưa bấm nạp thì hiển thị nút "Nạp"
        <button className="continue-button" onClick={() => setShowInput(true)}>
          Nạp
        </button>
      ) : ( // Nếu đã bấm nạp thì hiển thị ô nhập số tiền và nút xác nhận
        <div className="deposit-input">
          <input
            type="number"
            placeholder="Nhập số tiền nạp"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
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