import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./P2PExchange.css";

const P2PExchange = () => {
  const [tab, setTab] = useState("buy"); // State để xác định đang ở tab Mua hay Bán
  const [amountVND, setAmountVND] = useState(""); // Số tiền nhập vào (VND)
  const [amountUSDT, setAmountUSDT] = useState(""); // Số tiền nhập vào (USDT)
  const [balanceVND, setBalanceVND] = useState(0); // Số dư VND
  const [balanceUSDT, setBalanceUSDT] = useState(0); // Số dư USDT
  const rate = 25870; // Tỉ giá USDT/VND

  // Lấy thông tin user từ localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username || "";

  // Load số dư khi component được mount
  useEffect(() => {
    loadBalances();
  }, []);

  // Hàm load số dư từ localStorage dựa vào lịch sử giao dịch
  const loadBalances = () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let totalVND = 0;
    let totalUSDT = 0;

    transactions.forEach((t) => {
      if (t.username === username) {
        if (t.currency === "VND") {
          if (t.type === "Nạp" || t.type === "Bán") totalVND += t.amount;
          if (t.type === "Mua" || t.type === "Rút") totalVND -= t.amount;
        } else if (t.currency === "USDT") {
          if (t.type === "Mua") totalUSDT += t.amount;
          if (t.type === "Bán") totalUSDT -= t.amount;
        }
      }
    });

    setBalanceVND(Math.max(0, totalVND)); // Số dư VND không được nhỏ hơn 0
    setBalanceUSDT(Math.max(0, totalUSDT)); // Số dư USDT không được nhỏ hơn 0
  };

  // Hàm định dạng số có dấu phẩy phân cách hàng nghìn (VD: 1,000,000)
  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Xử lý nhập số tiền VND (chỉ cho phép nhập số)
  const handleVNDPurchase = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Xóa ký tự không phải số
    if (!value) {
      setAmountVND("");
      setAmountUSDT("");
      return;
    }
    let vndValue = parseInt(value, 10);
    setAmountVND(formatNumber(vndValue)); // Định dạng lại số VND
    setAmountUSDT((vndValue / rate).toFixed(3)); // Quy đổi sang USDT
  };

  // Xử lý nhập số USDT (chỉ cho phép nhập số và dấu chấm)
  const handleUSDTInput = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, ""); // Xóa ký tự không hợp lệ
    if (!value) {
      setAmountUSDT("");
      setAmountVND("");
      return;
    }
    let usdtValue = parseFloat(value);
    setAmountUSDT(usdtValue);
    setAmountVND(formatNumber((usdtValue * rate).toFixed(0))); // Quy đổi sang VND
  };

  // Kiểm tra điều kiện để nút "Mua/Bán" có thể bấm được
  const canSubmit =
    (tab === "buy" && Number(amountVND.replace(/,/g, "")) >= 150000) || // Mua tối thiểu 150,000 VND
    (tab === "sell" && parseFloat(amountUSDT) >= 1); // Bán tối thiểu 1 USDT

  // Hàm xử lý khi nhấn nút "Mua USDT" hoặc "Bán USDT"
  const handleSubmit = () => {
    if (!username) {
      alert("Bạn cần đăng nhập để thực hiện giao dịch!");
      return;
    }

    let vndAmount = Number(amountVND.replace(/,/g, ""));
    let usdtAmount = parseFloat(amountUSDT);
    let now = dayjs().format("YYYY-MM-DD HH:mm:ss"); // Lấy thời gian hiện tại

    if (tab === "buy") {
      if (vndAmount > balanceVND) {
        alert("❌ Số dư VND không đủ!");
        return;
      }
      saveTransaction("Mua", vndAmount, "VND", now);
      saveTransaction("Mua", usdtAmount, "USDT", now);
      setBalanceVND(balanceVND - vndAmount);
      setBalanceUSDT(balanceUSDT + usdtAmount);
      alert(`✅ Bạn đã mua ${usdtAmount} USDT thành công!`);
    } else {
      if (usdtAmount > balanceUSDT) {
        alert("❌ Số dư USDT không đủ!");
        return;
      }
      saveTransaction("Bán", vndAmount, "VND", now);
      saveTransaction("Bán", usdtAmount, "USDT", now);
      setBalanceVND(balanceVND + vndAmount);
      setBalanceUSDT(balanceUSDT - usdtAmount);
      alert(`✅ Bạn đã bán ${usdtAmount} USDT thành công!`);
    }

    setAmountVND("");
    setAmountUSDT("");
  };

  // Hàm lưu giao dịch vào localStorage
  const saveTransaction = (type, amount, currency, time) => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({ username, type, amount, currency, time });
    localStorage.setItem("transactions", JSON.stringify(transactions));
  };

  return (
    <div className="p2p-container">
      <div className="p2p-left">
        <h1>Giao dịch nhanh P2P</h1>
        <h2>{tab === "buy" ? "Mua USDT bằng VND" : "Bán USDT lấy VND"}</h2>
        <p>Mua và bán USDT trên Binance P2P với nhiều phương thức thanh toán khác nhau</p>
        <p><strong>Số dư VND:</strong> {formatNumber(balanceVND)} VND</p>
        <p><strong>Số dư USDT:</strong> {balanceUSDT.toFixed(3)} USDT</p>
      </div>
      <div className="p2p-right">
        <div className="tab">
          <button className={tab === "buy" ? "active" : ""} onClick={() => setTab("buy")}>
            Mua
          </button>
          <button className={tab === "sell" ? "active" : ""} onClick={() => setTab("sell")}>
            Bán
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={tab === "buy" ? amountVND : amountUSDT}
            onChange={tab === "buy" ? handleVNDPurchase : handleUSDTInput}
            placeholder={tab === "buy" ? "Nhập số VND" : "Nhập số USDT"}
            className="input"
          />
        </div>
        <div className="result">
          {tab === "buy"
            ? `Bạn nhận được: ${amountUSDT} USDT`
            : `Bạn nhận được: ${amountVND} VND`}
        </div>
        <button onClick={handleSubmit} className={canSubmit ? "button active" : "button disabled"} disabled={!canSubmit}>
          {tab === "buy" ? "Mua USDT" : "Bán USDT"}
        </button>
      </div>
    </div>
  );
};

export default P2PExchange;
