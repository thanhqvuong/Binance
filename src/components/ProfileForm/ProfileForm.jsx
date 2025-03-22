import React, { useState, useEffect } from "react"; // Import React và các hook
import { Formik, Form, Field } from "formik"; // Import Formik để quản lý form
import dayjs from "dayjs"; // Import thư viện để xử lý ngày giờ
import "./ProfileForm.css"; // Import file CSS

const EXCHANGE_RATE = 25870; // Tỷ giá giả định: 1 USDT = 25,870 VND

const ProfileForm = () => {
  // State lưu trữ thông tin người dùng
  const [userInfo, setUserInfo] = useState({ username: "", email: "", phone: "" });

  // State lưu lịch sử đăng nhập
  const [loginHistory, setLoginHistory] = useState([]);

  // State lưu giao dịch gần đây (tối đa 5 giao dịch)
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserInfo(storedUser);

      // Lấy danh sách giao dịch từ localStorage
      const allTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

      // Lọc giao dịch của user hiện tại
      const userTransactions = allTransactions
        .filter(tx => tx.username === storedUser.username) // Chỉ lấy giao dịch của user hiện tại
        .map(tx => ({
          ...tx,
          amount: tx.type === "Mua" || tx.type === "Bán"
            ? (tx.amount / EXCHANGE_RATE).toFixed(3) // Chuyển VND → USDT nếu là giao dịch Mua/Bán
            : tx.amount.toLocaleString("vi-VN").replace(/\./g, ","), // Định dạng số tiền nếu là VND
          currency: tx.type === "Mua" || tx.type === "Bán" ? "USDT" : "VND" // Đơn vị tiền tệ
        }));

      setTransactions(userTransactions.slice(-5)); // Lấy 5 giao dịch gần nhất
    }

    // Lấy lịch sử đăng nhập từ localStorage
    const storedHistory = JSON.parse(localStorage.getItem("loginHistory")) || [];
    setLoginHistory(storedHistory.slice(-5)); // Lấy 5 lần đăng nhập gần nhất

    addLoginHistory(); // Ghi nhận lần đăng nhập mới
  }, []); // Chạy một lần khi component mount

  // Hàm thêm lần đăng nhập mới vào lịch sử
  const addLoginHistory = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;

    const newEntry = dayjs().format("YYYY-MM-DD HH:mm:ss"); // Lấy thời gian hiện tại
    const updatedHistory = [newEntry, ...loginHistory].slice(0, 5); // Giữ lại 5 lần gần nhất

    setLoginHistory(updatedHistory); // Cập nhật state
    localStorage.setItem("loginHistory", JSON.stringify(updatedHistory)); // Lưu vào localStorage
  };

  // Hàm cập nhật thông tin cá nhân
  const handleUpdateProfile = (values) => {
    setUserInfo(values); // Cập nhật state
    localStorage.setItem("user", JSON.stringify(values)); // Lưu vào localStorage
  };

  // Hàm xóa lịch sử đăng nhập
  const handleClearHistory = () => {
    localStorage.removeItem("loginHistory"); // Xóa khỏi localStorage
    setLoginHistory([]); // Cập nhật state
  };

  return (
    <div className="profileform-container">
      <h2>Thông tin cá nhân</h2>
      
      {/* Form chỉnh sửa thông tin cá nhân */}
      <Formik initialValues={userInfo} enableReinitialize onSubmit={handleUpdateProfile}>
        <Form className="profile-form">
          <label>Username:</label>
          <Field name="username" as="input" placeholder="Nhập username" />

          <label>Email:</label>
          <Field name="email" as="input" placeholder="Nhập email" />

          <label>Số điện thoại:</label>
          <Field name="phone" as="input" placeholder="Nhập số điện thoại" />

          <button type="submit" className="btn-primary">Cập nhật</button>
        </Form>
      </Formik>

      {/* Hiển thị lịch sử đăng nhập */}
      <h2>Lịch sử đăng nhập</h2>
      <ul className="login-history">
        {loginHistory.map((entry, index) => (
          <li key={index}>{dayjs(entry).format("DD/MM/YYYY HH:mm")}</li> // Định dạng ngày tháng
        ))}
      </ul>
      <button className="btn-danger" onClick={handleClearHistory}>Xóa lịch sử</button>

      {/* Bảng giao dịch gần đây */}
      <h2>Giao dịch gần đây</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Loại giao dịch</th>
            <th>Số tiền</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx.type}</td>
              <td>{tx.amount} {tx.currency}</td>
              <td>{dayjs(tx.time).format("DD/MM/YYYY HH:mm")}</td> {/* Định dạng thời gian */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileForm; // Xuất component để sử dụng
