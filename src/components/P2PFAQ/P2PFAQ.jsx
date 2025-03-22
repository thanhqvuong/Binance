import React, { useState } from "react";
import "./P2PFAQ.css";

const faqData = {
  "Người mới bắt đầu": [
    {
      question: "Sàn giao dịch P2P là gì?",
      answer:
        "P2P là viết tắt của peer-to-peer và sàn giao dịch P2P là nền tảng cho phép người dùng mua và bán tiền mã hóa để lấy tiền pháp định trực tiếp với những người dùng khác.",
    },
    {
      question: "Làm thế nào để bán Bitcoin trên Binance P2P?",
      answer:
        "Trước tiên, hãy duyệt xem Quảng cáo Mua tiền mã hóa cho loại tiền mã hóa bạn muốn bán, đồng thời tìm các mục chào giá tốt nhất có hỗ trợ phương thức thanh toán ưa thích của bạn. Bạn có thể đọc các nội dung đánh giá và kiểm tra yêu cầu của người mua. Nếu bạn thấy có thể chấp nhận các yêu cầu, hãy bắt đầu giao dịch và không mở khóa tiền mã hóa cho đến khi nhận được tiền bằng phương thức thanh toán bạn đã cung cấp.",
    },
    {
      question: "Những loại tiền mã hóa nào có sẵn trong P2P Express Zone?",
      answer:
        "Có nhiều loại tiền mã hóa bạn có thể sử dụng trong P2P Express Zone. Bạn có thể chọn trong các tài sản kỹ thuật số như Bitcoin, Ethereum và stablecoin.",
    },
    {
      question: "Làm thế nào để mua Bitcoin trên Binance P2P?",
      answer:
        "Sau khi hoàn tất quá trình xác minh danh tính và thêm phương thức thanh toán, bạn đã có thể mua tiền mã hóa trên nền tảng Binance P2P. Đầu tiên, hãy lựa chọn trong số tất cả những đề nghị giao dịch hiện có trên thị trường. Tiếp đó, hãy đặt một lệnh để mua tiền mã hóa và thanh toán cho người bán theo phương thức thanh toán ưa thích. Cuối cùng, nhận tiền mã hóa từ người bán sau khi bạn đã hoàn tất giao dịch tiền pháp định và xác nhận khoản thanh toán của mình trên Binance P2P.",
    },
  ],
  "Nâng cao": [
    {
      question: "Từ vựng về các thuật ngữ giao dịch P2P",
      answer:
        "Các thuật ngữ quan trọng bao gồm Maker, Taker, Lệnh giới hạn, Lệnh thị trường, v.v.",
    },
    {
      question: "Làm thế nào để thêm phương thức thanh toán mới trên Binance P2P?",
      answer:
        "Bạn có thể vào cài đặt tài khoản, chọn phương thức thanh toán và thêm phương thức mới phù hợp.",
    },
  ],
};

const P2PFaqTabs = () => {
  const [activeTab, setActiveTab] = useState("Người mới bắt đầu");

  return (
    <div className="faq-p2p-container">
      <div className="tabs">
        {Object.keys(faqData).map((category) => (
          <button
            key={category}
            className={`tab-button ${activeTab === category ? "active" : ""}`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="faq-list">
        {faqData[activeTab].map((item, index) => (
          <details key={index} className="faq-item">
            <summary className="faq-question">{item.question}</summary>
            <p className="faq-answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default P2PFaqTabs;