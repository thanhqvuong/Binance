import React from "react";
import "./P2PAdvantages.css";

const advantages = [
  {
    icon: "🌍",
    title: "Thị trường nội địa và toàn cầu",
    description:
      "Trong khi nhiều nền tảng P2P khác nhắm đến các thị trường cụ thể, thì Binance P2P đem lại cho người dùng trải nghiệm giao dịch mang tính toàn cầu khi hỗ trợ hơn 70 đồng nội tệ.",
  },
  {
    icon: "💳",
    title: "Phương thức thanh toán linh hoạt",
    description:
      "Được hàng triệu người dùng trên toàn thế giới tin cậy, Binance P2P cung cấp nền tảng giao dịch tiền mã hóa an toàn với hơn 800 phương thức thanh toán và hơn 100 loại tiền pháp định.",
  },
  {
    icon: "💰",
    title: "Giao dịch với mức giá bạn mong muốn",
    description:
      "Giao dịch tiền mã hóa với quyền tự do mua và bán ở mức giá bạn mong muốn. Mua hoặc bán từ các đề nghị hiện có hoặc tạo quảng cáo giao dịch để đặt mức giá của riêng bạn.",
  },
];

const P2PAdvantages = () => {
  return (
    <div className="p2p-advan-container">
      <h2 className="p2p-advan-title">Lợi thế của sàn giao dịch P2P</h2>
      {advantages.map((item, index) => (
        <div key={index} className="p2p-item">
          <span className="p2p-icon">{item.icon}</span>
          <div>
            <h3 className="p2p-item-title">{item.title}</h3>
            <p className="p2p-item-description">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default P2PAdvantages;
