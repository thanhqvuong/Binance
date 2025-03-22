import React from "react";
import "./GettingStarted.css";

const steps = [
    { title: "Chọn thẻ ghi nợ/thẻ tín dụng", 
      description: "Đăng nhập vào tài khoản Binance, rồi nhấn vào tùy chọn [Thẻ tín dụng/Thẻ ghi nợ] trên trang chủ ứng dụng hoặc tiêu đề trên cùng của trang web." },
    
    { title: "Chọn tiền mã hóa và bật Mua định kỳ", 
      description: "Tiếp theo, chọn đồng tiền mã hóa muốn mua và bật tính năng Mua định kỳ trên cùng một trang." },

    { title: "Chọn đồng tiền pháp định", 
      description: "Chọn từ hơn 40 đồng tiền pháp định và chọn đồng nội tệ ưa thích của bạn." },

    { title: "Thiết lập tần suất", 
      description: "Chọn khoảng thời gian hàng tuần, hai tuần một lần hoặc hàng tháng. Bạn cũng có thể chọn ngày và giờ Mua định kỳ." },

    { title: "Chọn phương thức thanh toán", 
      description: "Chúng tôi hiện chấp nhận thanh toán bằng thẻ Visa hoặc Mastercard. Bạn có thể chọn sử dụng một trong các thẻ hiện có hoặc thêm thẻ mới." },
];

const GettingStarted = () => {
    return (
        <section className="getting-started">
            <h2>Bắt đầu</h2>
            <div className="steps-container">
                {steps.map((step, index) => (
                    <div key={index} className="step-card">
                        <div className="step-number">{index + 1}</div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GettingStarted;
