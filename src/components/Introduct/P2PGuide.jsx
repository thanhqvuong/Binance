import React, { useState } from "react";
import "./P2PGuide.css";

const P2PGuide = () => {
  const [tab, setTab] = useState("buy");

  const buyContent = [
    {
      title: "Nhận các quảng cáo tốt nhất",
      description: "Chọn cặp VND và USDT, nhập số tiền muốn mua và tải các quảng cáo bán hàng đầu.",
    },
    {
      title: "Thanh toán bằng VND",
      description: "Chọn phương thức thanh toán bạn muốn và thanh toán cho người bán trong thời hạn quy định.",
    },
    {
      title: "Nhận USDT",
      description: "Sau khi người bán xác nhận thanh toán, bạn sẽ nhận được USDT trong tài khoản Funding.",
    },
  ];

  const sellContent = [
    {
      title: "Nhận các quảng cáo tốt nhất",
      description: "Chọn cặp VND và USDT, nhập số tiền muốn bán và tải các quảng cáo mua hàng đầu.",
    },
    {
      title: "Nhận VND",
      description: "Chọn phương thức thanh toán để nhận VND",
    },
    {
      title: "Mở khóa USDT",
      description: "Sau khi bạn nhận được VND của người mua trong tài khoản của mình, hãy mở khóa USDT cho người mua",
    },
  ];

  const content = tab === "buy" ? buyContent : sellContent;

  return (
    <div className="p2p-guide-container">
      <h1 className="title">Cách {tab === "buy" ? "mua" : "bán"} USDT qua P2P Express</h1>
      <div className="tab-container">
        <button className={tab === "buy" ? "active" : ""} onClick={() => setTab("buy")}>
          Mua USDT
        </button>
        <button className={tab === "sell" ? "active" : ""} onClick={() => setTab("sell")}>
          Bán USDT
        </button>
      </div>
      <div className="content-container">
        {content.map((item, index) => (
          <div className="step-card" key={index}>
            <div className="step-text">
              <h2>{index + 1}. {item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default P2PGuide;
