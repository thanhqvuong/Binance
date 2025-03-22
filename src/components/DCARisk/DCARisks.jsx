import React from "react";
import "./DCARisks.css";

const risks = [
  {
    title: "Bỏ lỡ cơ hội kiếm lợi nhuận lớn",
    description:
      "DCA không bao gồm khoản đầu tư một lần khi thị trường giảm giá, do đó bạn có thể bỏ lỡ một khoản lợi nhuận lớn hơn.",
  },
  {
    title: "Sự thật về tiền mã hóa",
    description:
      "Lợi nhuận lớn như vậy đòi hỏi nhà đầu tư phải xác định chính xác thời điểm vào/thoát thị trường, mà điều này gần như không thể. Đó là lý do tại sao DCA có thể giúp giảm bớt rắc rối của việc xác định thời điểm vào/thoát thị trường.",
  },
  {
    title: "Thiếu thông tin đầu tư chi tiết",
    description:
      "Chiến lược DCA không giúp bạn xác định khoản đầu tư hiệu quả. Do đó, bạn phải DYOR (tự nghiên cứu) trước khi sử dụng phương pháp DCA.",
  },
];

const DCARisks = () => {
  return (
    <section className="dca-risks">
      <h2>Rủi ro của DCA khi sử dụng tính năng Mua định kỳ</h2>
      <div className="risks-list">
        {risks.map((risk, index) => (
          <div className="risk-item" key={index}>
            <h3>{risk.title}</h3>
            <p>{risk.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DCARisks;
