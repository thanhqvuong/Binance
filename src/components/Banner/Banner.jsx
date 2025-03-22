import React, { useState, useEffect } from "react";
import "./Banner.css";

const banners = [
  { id: 1, title: "YIELD ARENA", desc: "Your Yielding Hub - Over $1M Rewards Up For Grab" },
  { id: 2, title: "STAKING", desc: "Earn rewards by staking your crypto" },
  { id: 3, title: "LIQUID SWAP", desc: "Provide liquidity and earn rewards" },
  { id: 4, title: "SAVINGS", desc: "Flexible and fixed savings plans available" },
  { id: 5, title: "DUAL INVESTMENT", desc: "Maximize returns with dual investment options" },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      {/* BANNER LEFT */}
      <div className="banner-left">
        <h2>Binance Earn</h2>
        <p>Smart Earning bắt đầu tại đây – Hỗ trợ hơn 300 loại tài sản tiền mã hoá</p>
        <div className="earn-info">
          <p><strong>Tài sản của tôi</strong></p>
          <h3>≈ ₫0.00</h3>
          <p><strong>Tổng lợi nhuận</strong></p>
          <h3>≈ ₫0.00</h3>
          <p><strong>Lợi nhuận ngày hôm qua</strong></p>
          <h3>≈ ₫0.00</h3>
        </div>
      </div>

      {/* BANNER RIGHT */}
      <div className="banner-right">
        <div className="banner-slide">
          <h2>{banners[currentSlide].title}</h2>
          <p>{banners[currentSlide].desc}</p>
          <button className="explore-btn">Explore Now</button>
        </div>

        <div className="dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
