import React, { useState } from "react";
import "./FAQ.css"; // Đảm bảo có file CSS kèm theo

const faqs = [
  {
    question: "Sàn giao dịch tiền mã hóa là gì?",
    answer:
      "Sàn giao dịch tiền mã hóa là thị trường kỹ thuật số cho phép người dùng mua và bán các loại tiền mã hóa như Bitcoin, Ethereum và Tether. Sàn giao dịch Binance là sàn giao dịch tiền mã hóa lớn nhất tính theo khối lượng giao dịch.",
  },
  {
    question: "Binance cung cấp những sản phẩm gì?",
    answer:
      "Binance cung cấp nhiều sản phẩm bao gồm giao dịch giao ngay, hợp đồng tương lai, staking, và các dịch vụ tài chính khác liên quan đến tiền mã hóa.",
  },
  {
    question: "Cách mua Bitcoin và các loại tiền mã hóa khác trên Binance",
    answer:
      "Bạn có thể mua Bitcoin và các loại tiền mã hóa khác trên Binance thông qua giao dịch P2P, thẻ tín dụng hoặc chuyển khoản ngân hàng.",
  },
  {
    question: "Cách theo dõi giá tiền mã hóa",
    answer:
      "Bạn có thể theo dõi giá tiền mã hóa trên Binance thông qua biểu đồ giá trực tuyến, ứng dụng di động hoặc các trang web tổng hợp dữ liệu thị trường.",
  },
  {
    question: "Cách giao dịch tiền mã hóa trên Binance",
    answer:
      "Để giao dịch trên Binance, bạn cần tạo tài khoản, nạp tiền, chọn cặp giao dịch phù hợp và thực hiện lệnh mua/bán.",
  },
  {
    question: "Cách sinh lời từ tiền mã hóa trên Binance",
    answer:
      "Bạn có thể sinh lời từ tiền mã hóa trên Binance bằng cách staking, farming, giao dịch ký quỹ hoặc tham gia các chương trình đầu tư của Binance.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Các câu hỏi thường gặp</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-header" onClick={() => toggleFAQ(index)}>
              <span className="faq-number">{index + 1}</span>
              <span className="faq-question">{faq.question}</span>
              <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <p className="faq-answer">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
