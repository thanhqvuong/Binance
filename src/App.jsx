import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./page/Homepage";
import Login from "./page/Login/Login";
import Register from "./page/Register";
import BuyCrypto from "./page/BuyCrypto";
import BuyPeriodically from "./page/BuyPeriodically";
import Recharge from "./page/Recharge";
import Withdraw from "./page/Withdraw";
import Market from "./page/Market";
import Trading from "./page/Trading";
import ForgotPassword from "./page/ForgotPassword";
import Future from "./page/Future";
import "./App.css";
import Earning from "./page/Earning";
import Profile from "./page/Profile";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ Lấy user từ sessionStorage
    }
  }, []);

  return (
    <div className="app-container">
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<h1>Giới thiệu</h1>} />
          <Route path="*" element={<h1>404 - Không tìm thấy trang</h1>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/market" element={<Market />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buycrypto" element={<BuyCrypto />} />
          <Route path="/buyperiodically" element={<BuyPeriodically />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/future" element={<Future />} />
          <Route path="/earning" element={<Earning />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
