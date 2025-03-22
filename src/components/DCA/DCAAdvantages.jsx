import React from "react";
import "./DCAAdvantages.css";

const advantages = [
  {
    title: "Tăng trưởng danh mục đầu tư ổn định",
    description:
      "Đầu tư đều đặn một khoản tiền theo định kỳ sẽ giúp bạn tăng dần tài sản tiền mã hóa theo thời gian và kiếm lợi nhuận từ sự tăng trưởng của dự án đã đầu tư.",
  },
  {
    title: "Tiết kiệm có kỷ luật",
    description:
      "Tự động hóa quy trình mua tiền mã hóa và đảm bảo bạn đầu tư có kỷ luật bất kể điều kiện thị trường như thế nào.",
  },
  {
    title: "Giảm thiểu rủi ro",
    description:
      "Quản lý tác động của thị trường tiền mã hóa đầy biến động bằng cách chia nhỏ các khoản đầu tư và giảm bớt ảnh hưởng của biến động giá.",
  },
  {
    title: "Sự tiện lợi và tính linh hoạt",
    description:
      "Chọn trước tùy chọn mua hàng tuần, hai tuần một lần hoặc hàng tháng cũng như đồng tiền mã hóa bạn muốn mua.",
  },
  {
    title: "Dễ dàng truy cập hệ sinh thái Binance",
    description:
      "Hãy chuẩn bị sẵn tiền mã hóa để khám phá các sản phẩm khác của Binance như stake, giao dịch spot hay thậm chí mua NFT đầu tiên.",
  },
  {
    title: "Không bị cảm xúc chi phối",
    description:
      "Không còn căng thẳng xác định thời điểm vào/thoát thị trường và đưa ra quyết định bốc đồng dựa trên điều kiện thị trường.",
  },
];

const DCAAdvantages = () => {
  return (
    <section className="dca-advantages">
      <h2>Lợi ích của DCA khi sử dụng tính năng Mua định kỳ</h2>
      <div className="advantages-grid">
        {advantages.map((adv, index) => (
          <div className="advantage-card" key={index}>
            <h3>{adv.title}</h3>
            <p>{adv.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DCAAdvantages;
