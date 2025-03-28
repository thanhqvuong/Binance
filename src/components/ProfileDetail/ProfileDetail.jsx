import React, { useEffect, useState } from "react"; // Import React và các hook cần thiết
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"; // Import thư viện vẽ biểu đồ
import "./ProfileDetail.css"; // Import file CSS để định dạng giao diện

const EXCHANGE_RATE = 25870; // Giả định tỷ giá 1 USDT = 25,870 VND
const COLORS = { "Nạp": "#0088FE", "Rút": "#00C49F", "Mua": "#FFBB28", "Bán": "#FF8042" }; // Màu sắc cho từng loại giao dịch

const ProfileDetail = ({ username }) => {
  // Khai báo state để lưu dữ liệu giao dịch
  const [depositWithdrawData, setDepositWithdrawData] = useState([]); // Dữ liệu Nạp & Rút
  const [buySellData, setBuySellData] = useState([]); // Dữ liệu Mua & Bán
  const [totalData, setTotalData] = useState([]); // Dữ liệu tổng giao dịch (tính theo %)

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      // Lấy toàn bộ danh sách giao dịch từ localStorage
      const allTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

      // Lọc danh sách giao dịch của user hiện tại
      const userTransactions = allTransactions.filter(
        (tx) => tx.username.toLowerCase() === storedUser.username.toLowerCase()
      );

      // Hàm xử lý giao dịch: Lọc theo loại (Nạp, Rút, Mua, Bán) và cộng dồn số tiền
      const processTransactions = (transactions, types, convert = false) => {
        return transactions
          .filter((tx) => types.includes(tx.type)) // Chỉ lấy giao dịch thuộc loại mong muốn
          .reduce((acc, tx) => {
            const value = convert ? tx.amount * EXCHANGE_RATE : tx.amount; // Nếu `convert = true`, chuyển sang VNĐ
            const existing = acc.find((item) => item.name === tx.type);
            if (existing) {
              existing.value += value; // Nếu loại giao dịch đã có, cộng dồn số tiền
            } else {
              acc.push({ name: tx.type, value }); // Nếu chưa có, thêm mới vào mảng
            }
            return acc;
          }, []);
      };

      // Xử lý dữ liệu cho từng loại giao dịch
      const depositWithdraw = processTransactions(userTransactions, ["Nạp", "Rút"]); // Lấy dữ liệu Nạp & Rút
      const buySell = processTransactions(userTransactions, ["Mua", "Bán"]); // Lấy dữ liệu Mua & Bán
      const total = [...depositWithdraw, ...buySell]; // Gộp cả hai loại vào tổng

      // Tính tổng giá trị của tất cả giao dịch
      const totalSum = total.reduce((sum, tx) => sum + tx.value, 0);

      // Chuyển tổng giao dịch thành phần trăm để vẽ biểu đồ
      const totalPercentageData = total.map(tx => ({
        name: tx.name,
        value: totalSum > 0 ? (tx.value / totalSum) * 100 : 0 // Tính % cho từng loại
      }));

      console.log("Total Data:", totalPercentageData); // Debug dữ liệu tổng

      // Cập nhật state với dữ liệu đã xử lý
      setDepositWithdrawData(depositWithdraw);
      setBuySellData(buySell);
      setTotalData(totalPercentageData);
    }
  }, []); // Chạy chỉ một lần khi component mount

  // Hàm thiết lập kiểu tooltip (phụ thuộc vào chế độ sáng/tối)
  const getTooltipStyle = () => ({
    backgroundColor: document.body.classList.contains("dark-mode") ? "#333" : "#fff",
    color: document.body.classList.contains("dark-mode") ? "#fff" : "#000",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px"
  });

  return (
    <div className="profile-container">
      <h2>Trang cá nhân</h2>

      {/* Biểu đồ Nạp & Rút tiền */}
      <div className="chart-row">
        <div className="chart-box">
          <h3>Nạp & Rút tiền</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={depositWithdrawData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {depositWithdrawData.map((tx) => (
                  <Cell key={tx.name} fill={COLORS[tx.name]} /> // Màu sắc theo loại giao dịch
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString("vi-VN")} contentStyle={getTooltipStyle()} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Mua & Bán Coin */}
        <div className="chart-box">
          <h3>Mua & Bán Coin</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={buySellData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {buySellData.map((tx) => (
                  <Cell key={tx.name} fill={COLORS[tx.name]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toFixed(2)} contentStyle={getTooltipStyle()} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ Tổng giao dịch (tính theo phần trăm) */}
      <div className="chart-center">
        <h3>Tổng giao dịch</h3>
        <ResponsiveContainer width="50%" height={300}>
          <PieChart>
            <Pie data={totalData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
              {totalData.map((tx) => (
                <Cell key={tx.name} fill={COLORS[tx.name]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} contentStyle={getTooltipStyle()} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfileDetail; // Xuất component để sử dụng trong ứng dụng
