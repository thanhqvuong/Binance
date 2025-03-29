// Import các thư viện cần thiết
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./CryptoTrade.css";

const CryptoExchange = () => {
  const [isBuying, setIsBuying] = useState(true);
  const [amount, setAmount] = useState("");
  const [balanceVND, setBalanceVND] = useState(0);
  const [balanceUSDT, setBalanceUSDT] = useState(0);

  const rate = 25870;
  const minBuy = 150000;
  const minSell = 1;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const username = storedUser.username;
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

    if (username) {
      const totalVND = transactions
        .filter(tx => tx.username === username)
        .reduce((sum, tx) => {
          if (tx.type === "Nạp" || tx.type === "Bán") return sum + tx.amount;
          if (tx.type === "Rút" || tx.type === "Mua") return sum - tx.amount;
          return sum;
        }, 0);

      const totalUSDT = transactions
        .filter(tx => tx.username === username)
        .reduce((sum, tx) => {
          if (tx.type === "Mua") return sum + tx.amount / rate;
          if (tx.type === "Bán") return sum - tx.amount / rate;
          return sum;
        }, 0);

      setBalanceVND(totalVND);
      setBalanceUSDT(parseFloat(totalUSDT.toFixed(3)));
    }
  }, []);

  const formatVND = (num) => num.toLocaleString("vi-VN").replace(/\./g, ",");
  const formatUSDT = (num) => parseFloat(num).toFixed(3);

  const handleToggle = (buying) => {
    setIsBuying(buying);
    setAmount("");
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (isBuying) {
      value = value.replace(/\D/g, "");
      setAmount(value ? formatVND(parseInt(value, 10)) : "");
    } else {
      if (/^\d*\.?\d*$/.test(value)) {
        setAmount(value);
      }
    }
  };

  const rawAmount = isBuying
    ? Math.max(0, parseInt(amount.replace(/\D/g, ""), 10) || 0)
    : parseFloat(amount) || 0;

  const receivedAmount = isBuying
    ? formatUSDT(rawAmount / rate)
    : formatVND(Math.floor(rawAmount * rate));

  const handleTransaction = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const username = storedUser.username;

    if (!username) {
      alert("Vui lòng đăng nhập để thực hiện giao dịch.");
      return;
    }

    if (rawAmount < (isBuying ? minBuy : minSell)) return;

    if (isBuying && rawAmount > balanceVND) {
      alert("Số dư VND không đủ, vui lòng nạp thêm.");
      return;
    }

    if (!isBuying && rawAmount > balanceUSDT) {
      alert("Số dư USDT không đủ, vui lòng nạp thêm.");
      return;
    }

    const newTransaction = {
      username,
      type: isBuying ? "Mua" : "Bán",
      amount: isBuying ? rawAmount : Math.round(rawAmount * rate),
      currency: "VND",
      time: dayjs().format("YYYY-MM-DD HH:mm"),
    };

    const storedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const updatedTransactions = [...storedTransactions, newTransaction];
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    console.log("Giao dịch đã được lưu:", newTransaction);

    setAmount("");
    setBalanceVND(prev => (isBuying ? prev - rawAmount : prev + Math.round(rawAmount * rate)));
    setBalanceUSDT(prev => (isBuying ? prev + rawAmount / rate : prev - rawAmount / rate));
  };

  return (
    <div className="crypto-trade-container">
      <div className="crypto-trade-info">
        <h1>{isBuying ? "Mua tiền mã hóa" : "Bán tiền mã hóa"}</h1>
        <h3>Số dư VND: {formatVND(balanceVND)} VND</h3>
        <h3>Số dư USDT: {formatUSDT(balanceUSDT)} USDT</h3>
      </div>

      <div className="exchange-section">
        <div className="tabs">
          <button className={isBuying ? "active" : ""} onClick={() => handleToggle(true)}>Mua</button>
          <button className={!isBuying ? "active" : ""} onClick={() => handleToggle(false)}>Bán</button>
        </div>

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

          {rawAmount > 0 && rawAmount < (isBuying ? minBuy : minSell) && (
            <p className="error-message">
              {isBuying ? `Tối thiểu mua: ${formatVND(minBuy)} VND` : `Tối thiểu bán: ${minSell} USDT`}
            </p>
          )}

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

export default CryptoExchange;
