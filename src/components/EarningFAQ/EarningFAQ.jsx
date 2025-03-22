import React, { useState } from "react";
import "./EarningFAQ.css";

const EarningFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    { question: "Binance Earn là gì?", answer: "Binance Earn là một nền tảng giúp bạn kiếm tiền từ tài sản tiền mã hóa của mình thông qua các sản phẩm tài chính khác nhau." },
    { question: "Binance Earn hoạt động như thế nào?", answer: "Bạn có thể gửi tiền mã hóa của mình vào các sản phẩm Earn như Simple Earn, Staking, hoặc Liquidity Farming để nhận lãi suất." },
    { question: "Những loại tiền mã hóa nào được hỗ trợ?", answer: "Binance Earn hỗ trợ nhiều loại tiền mã hóa khác nhau như USDT, BTC, ETH, BNB, và nhiều loại khác." },
    { question: "Tôi có đủ điều kiện sử dụng Binance Earn không?", answer: "Bạn cần có tài khoản Binance đã xác minh danh tính (KYC) và nạp tiền mã hóa vào ví của mình." },
    { question: "Làm cách nào để bắt đầu kiếm tiền?", answer: "Bạn có thể chọn một sản phẩm Earn phù hợp, gửi tiền mã hóa vào và bắt đầu nhận lợi nhuận." },
    { question: "Tại sao giá trị thu nhập của tôi lên xuống thất thường?", answer: "Lãi suất có thể thay đổi tùy vào điều kiện thị trường, loại sản phẩm và thời gian gửi tiền." },
    { question: "Làm cách nào để biết email về Binance Earn này là chính thống?", answer: "Bạn có thể kiểm tra email chính thức từ Binance, không bấm vào các liên kết đáng ngờ và xác minh thông tin qua trang web chính thức." },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="earning-faq-container">
      <h2>Các câu hỏi thường gặp</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span className="faq-number">{index + 1}</span>
              <span>{item.question}</span>
              <span className="faq-toggle">{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningFAQ;
