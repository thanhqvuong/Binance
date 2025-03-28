import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./ProfileDetail.css";

const EXCHANGE_RATE = 25870;
const COLORS = { "Nạp": "#0088FE", "Rút": "#00C49F", "Mua": "#FFBB28", "Bán": "#FF8042" };

const ProfileDetail = ({ username }) => {
  const [depositWithdrawData, setDepositWithdrawData] = useState([]);
  const [buySellData, setBuySellData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      const allTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
      const userTransactions = allTransactions.filter(
        (tx) => tx.username.toLowerCase() === storedUser.username.toLowerCase()
      );

      const processTransactions = (transactions, types, convert = false) => {
        return transactions
          .filter((tx) => types.includes(tx.type))
          .reduce((acc, tx) => {
            const value = convert ? tx.amount * EXCHANGE_RATE : tx.amount;
            const existing = acc.find((item) => item.name === tx.type);
            if (existing) {
              existing.value += value;
            } else {
              acc.push({ name: tx.type, value });
            }
            return acc;
          }, []);
      };

      const depositWithdraw = processTransactions(userTransactions, ["Nạp", "Rút"]);
      const buySell = processTransactions(userTransactions, ["Mua", "Bán"]);
      const total = [...depositWithdraw, ...buySell];

      const totalSum = total.reduce((sum, tx) => sum + tx.value, 0);
      const totalPercentageData = total.map((tx) => ({
        name: tx.name,
        value: totalSum > 0 ? (tx.value / totalSum) * 100 : 0,
      }));

      setDepositWithdrawData(depositWithdraw);
      setBuySellData(buySell);
      setTotalData(totalPercentageData);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsDarkMode(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getTooltipStyle = () => ({
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    border: "1px solid #777",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
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
              <Tooltip formatter={(value) => value.toLocaleString("vi-VN")} contentStyle={getTooltipStyle()} />
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
                formatter={(value) => (typeof value === "number" ? (value / 25870).toFixed(2) : value)}
                contentStyle={getTooltipStyle()}
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
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} contentStyle={getTooltipStyle()} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfileDetail;
