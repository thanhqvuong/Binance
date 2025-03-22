import React, { useState } from "react";
import "./HelpCenter.css";

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      question: "Sàn giao dịch P2P là gì?",
      answer:
        "P2P là viết tắt của peer-to-peer (ngang hàng) và sàn giao dịch P2P là nền tảng cho phép người dùng mua và bán tiền mã hóa để lấy tiền pháp định trực tiếp với những người dùng khác.",
    },
    {
      question: "Làm thế nào để mua Bitcoin trên Binance P2P?",
      answer: "Sau khi hoàn tất quy trình xác minh danh tính và thêm phương thức thanh toán, bạn có thể bắt đầu mua tiền mã hoá trên nền tảng Binance P2P. Đầu tiên, hãy lựa chọn trong số tất cả những đề nghị giao dịch hiện có trên thị trường. Tiếp đó, hãy đặt một lệnh để mua tiền mã hóa và thanh toán cho người bán theo phương thức thanh toán ưa thích. Cuối cùng, nhận tiền mã hóa từ người bán sau khi bạn đã hoàn tất giao dịch tiền pháp định và xác nhận khoản thanh toán của mình trên Binance P2P.",
    },
  ];

  return (
    <div className="help-center">
      <h2 className="title">Câu hỏi thường gặp | Binance</h2>
      <div className="help-items">
        {items.map((item, index) => (
          <div
            key={index}
            className={`help-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleItem(index)}
          >
            <div className="help-header">
              <span className="help-number">{index + 1}</span>
              <span className="help-question">{item.question}</span>
              <span className="help-icon">{openIndex === index ? "➖" : "➕"}</span>
            </div>
            {openIndex === index && item.answer && (
              <div className="help-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
