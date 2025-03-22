// Import các thư viện cần thiết
import { useState } from "react"; // useState để quản lý state trong component
import dayjs from "dayjs"; // dayjs để xử lý thời gian
import "./CryptoTrade.css"; // Import file CSS để tạo style cho component

// Component chính của ứng dụng
const CryptoExchange = () => {
  // State để kiểm tra người dùng đang chọn mua hay bán
  const [isBuying, setIsBuying] = useState(true);
  // State lưu số tiền nhập vào ô input
  const [amount, setAmount] = useState("");

  // Tỉ giá USDT → VND
  const rate = 25870; // 1 USDT = 25,870 VND
  // Số tiền tối thiểu để mua và bán
  const minBuy = 150000; // Tối thiểu mua 150,000 VND
  const minSell = 1; // Tối thiểu bán 1 USDT

  // Hàm định dạng số tiền theo VND (thêm dấu phẩy ngăn cách hàng nghìn)
  const formatVND = (num) => num.toLocaleString("vi-VN").replace(/\./g, ",");

  // Hàm định dạng số tiền theo USDT (luôn có 3 chữ số thập phân)
  const formatUSDT = (num) => parseFloat(num).toFixed(3);

  // Hàm chuyển đổi giữa chế độ mua & bán
  const handleToggle = (buying) => {
    setIsBuying(buying); // Cập nhật trạng thái mua/bán
    setAmount(""); // Reset input khi chuyển đổi
  };

  // Xử lý khi người dùng nhập vào ô input
  const handleInputChange = (e) => {
    let value = e.target.value; // Lấy giá trị nhập vào

    if (isBuying) {
      value = value.replace(/\D/g, ""); // Chỉ cho phép nhập số khi mua
      setAmount(value ? formatVND(parseInt(value, 10)) : ""); // Định dạng lại số tiền theo VND
    } else {
      if (/^\d*\.?\d*$/.test(value)) { // Kiểm tra nhập số hợp lệ khi bán
        setAmount(value);
      }
    }
  };

  // Xử lý số tiền thực tế dựa vào giá trị nhập vào
  const rawAmount = isBuying
    ? Math.max(0, parseInt(amount.replace(/\D/g, ""), 10) || 0) // Nếu mua, lấy số nguyên từ VND
    : parseFloat(amount) || 0; // Nếu bán, lấy số thực từ USDT

  // Tính toán số tiền nhận được khi mua/bán
  const receivedAmount = isBuying
    ? formatUSDT(rawAmount / rate) // Nếu mua: chuyển đổi từ VND sang USDT
    : formatVND(Math.floor(rawAmount * rate)); // Nếu bán: chuyển đổi từ USDT sang VND

  // Xử lý giao dịch khi nhấn nút "Mua USDT" hoặc "Bán USDT"
  const handleTransaction = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}"); // Lấy thông tin user từ localStorage
    const username = storedUser.username; // Lấy username của user

    if (!username) { // Kiểm tra nếu user chưa đăng nhập
      alert("Vui lòng đăng nhập để thực hiện giao dịch."); // Hiển thị thông báo yêu cầu đăng nhập
      return;
    }

    if (rawAmount < (isBuying ? minBuy : minSell)) return; // Kiểm tra số tiền có đạt mức tối thiểu không

    // Tạo đối tượng giao dịch mới
    const newTransaction = {
      username,
      type: isBuying ? "Mua" : "Bán", // Loại giao dịch
      amount: isBuying
        ? rawAmount // Nếu mua: giữ nguyên VND
        : Math.round(rawAmount * rate), // Nếu bán: chuyển USDT → VND
      currency: "VND", // Đơn vị tiền tệ
      time: dayjs().format("YYYY-MM-DD HH:mm"), // Lưu thời gian giao dịch
    };

    // Lấy danh sách giao dịch cũ từ localStorage
    const storedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const updatedTransactions = [...storedTransactions, newTransaction]; // Cập nhật danh sách giao dịch mới

    // Lưu lại danh sách giao dịch vào localStorage
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    console.log("Giao dịch đã được lưu:", newTransaction); // Log giao dịch vào console

    setAmount(""); // Reset ô nhập liệu sau giao dịch
  };

  return (
    <div className="crypto-trade-container">
      {/* Phần thông tin thị trường */}
      <div className="crypto-trade-info">
        <h1>{isBuying ? "Mua tiền mã hóa" : "Bán tiền mã hóa"}</h1>
        <div className="crypto-list">
          <h2>Tiền mã hóa phổ biến</h2>
          <ul>
            <li>BNB <span className="negative">₫14,743,779 -3.78%</span></li>
            <li>BTC <span className="negative">₫2,159,072,573 -2.26%</span></li>
            <li>ETH <span className="negative">₫54,683,460 -2.19%</span></li>
            <li>ADA <span className="negative">₫19,845 -5.65%</span></li>
            <li>XRP <span className="negative">₫57,117 -5.55%</span></li>
          </ul>
        </div>
      </div>

      {/* Phần giao dịch mua/bán */}
      <div className="exchange-section">
        {/* Tabs chuyển đổi giữa Mua & Bán */}
        <div className="tabs">
          <button className={isBuying ? "active" : ""} onClick={() => handleToggle(true)}>Mua</button>
          <button className={!isBuying ? "active" : ""} onClick={() => handleToggle(false)}>Bán</button>
        </div>

        {/* Ô nhập tiền và hiển thị số tiền nhận được */}
        <div className="exchange-trade-box">
          <div className="input-trade-group">
            <span>Chi</span>
            <input type="text" value={amount} onChange={handleInputChange} placeholder="0" />
            <span>{isBuying ? "VND" : "USDT"}</span>
          </div>

          <div className="input-trade-group">
            <span>Nhận</span>
            <input type="text" value={rawAmount > 0 ? receivedAmount : "0"} readOnly />
            <span>{isBuying ? "USDT" : "VND"}</span>
          </div>

          {/* Hiển thị cảnh báo nếu số tiền dưới mức tối thiểu */}
          {rawAmount > 0 && rawAmount < (isBuying ? minBuy : minSell) && (
            <p className="error-message">
              {isBuying ? `Tối thiểu mua: ${formatVND(minBuy)} VND` : `Tối thiểu bán: ${minSell} USDT`}
            </p>
          )}

          {/* Nút thực hiện giao dịch */}
          <button 
            className={`submit-btn ${rawAmount >= (isBuying ? minBuy : minSell) ? "active" : ""}`} 
            disabled={rawAmount < (isBuying ? minBuy : minSell)}
            onClick={handleTransaction}
          >
            {isBuying ? "Mua USDT" : "Bán USDT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoExchange; // Xuất component để sử dụng ở nơi khác
