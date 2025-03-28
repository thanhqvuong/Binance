import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./ProfileDetail.css";

const EXCHANGE_RATE = 25870;
const COLORS = { "Nạp": "#0088FE", "Rút": "#00C49F", "Mua": "#FFBB28", "Bán": "#FF8042" };

const ProfileDetail = ({ username }) => {
  const [depositWithdrawData, setDepositWithdrawData] = useState([]);
  const [buySellData, setBuySellData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const getTheme = () => localStorage.getItem("theme") === "dark";
  const [isDarkMode, setIsDarkMode] = useState(getTheme());


  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("theme") === "dark");
    };
  
    // Theo dõi thay đổi theme khi đổi trong tab khác
    window.addEventListener("storage", handleThemeChange);
  
    // Theo dõi thay đổi trực tiếp trong cùng tab (nếu theme được lưu vào class của body)
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  
    // Kiểm tra localStorage mỗi giây để cập nhật ngay lập tức
    const interval = setInterval(() => {
      handleThemeChange();
    }, 1000);
  
    return () => {
      window.removeEventListener("storage", handleThemeChange);
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const getTooltipStyle = () => ({
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    border: "1px solid #777",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  });

  return (
    <div className="profile-container">
      <h2>Trang cá nhân</h2>

      <div className="chart-row">
        <div className="chart-box">
          <h3>Nạp & Rút tiền</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={depositWithdrawData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {depositWithdrawData.map((tx) => (
                  <Cell key={tx.name} fill={COLORS[tx.name]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => value.toLocaleString("vi-VN")}
                contentStyle={getTooltipStyle()}
                itemStyle={{ color: isDarkMode ? "#fff" : "#000", fontWeight: "bold" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Mua & Bán Coin</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={buySellData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {buySellData.map((tx) => (
                  <Cell key={tx.name} fill={COLORS[tx.name]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => (typeof value === "number" ? (value / EXCHANGE_RATE).toFixed(2) : value)}
                contentStyle={getTooltipStyle()}
                itemStyle={{ color: isDarkMode ? "#fff" : "#000", fontWeight: "bold" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-center">
        <h3>Tổng giao dịch</h3>
        <ResponsiveContainer width="50%" height={300}>
          <PieChart>
            <Pie data={totalData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
              {totalData.map((tx) => (
                <Cell key={tx.name} fill={COLORS[tx.name]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value.toFixed(2)}%`}
              contentStyle={getTooltipStyle()}
              itemStyle={{ color: isDarkMode ? "#fff" : "#000", fontWeight: "bold" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfileDetail;
