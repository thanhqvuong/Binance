import "./PaymentMethods.css";
import { useState, useEffect, useRef } from "react";

// Danh sách các phương thức thanh toán phổ biến
const methods = [
  { name: "Chuyển khoản ngân hàng", color: "#FFC107" },
  { name: "Chuyển khoản ngân hàng Việt Nam", color: "#FFC107" },
  { name: "MoMo", color: "#B00060" },
  { name: "Viettel Money", color: "#E10000" },
  { name: "ZaloPay", color: "#007BFF" },
  { name: "Chuyển khoản với ngân hàng cụ thể", color: "#8000FF" },
  { name: "Nạp tiền mặt vào ngân hàng", color: "#007BFF" },
  { name: "VNPAY", color: "#E10000" },
  { name: "CAKE", color: "#FF0080" }
];

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState(null); // State lưu phương thức thanh toán được chọn
  const canvasRef = useRef(null); // Tham chiếu đến thẻ <canvas> để vẽ QR code giả lập

  // useEffect chạy lại khi selectedMethod thay đổi, để cập nhật mã QR
  useEffect(() => {
    if (selectedMethod && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Xóa nội dung cũ trên canvas trước khi vẽ mới
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Giả lập tạo mã QR bằng cách vẽ các ô vuông đen ngẫu nhiên
      ctx.fillStyle = "black";
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (Math.random() > 0.5) { // Xác suất 50% để tạo ô vuông đen
            ctx.fillRect(i * 20, j * 20, 20, 20);
          }
        }
      }
    }
  }, [selectedMethod]);

  // Hàm xử lý khi chọn một phương thức thanh toán
  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div className="payment-container">
      <h1>Phương thức thanh toán hàng đầu</h1>
      
      {/* Hiển thị danh sách các phương thức thanh toán */}
      <div className="payment-grid">
        {methods.map((method, index) => (
          <div
            className="payment-card"
            key={index}
            onClick={() => handleSelect(method)} // Khi click, cập nhật phương thức được chọn
          >
            {/* Hiển thị màu đặc trưng của từng phương thức */}
            <span className="indicator" style={{ backgroundColor: method.color }}></span>
            {method.name}
          </div>
        ))}
      </div>

      {/* Hiển thị QR Code nếu có phương thức được chọn */}
      {selectedMethod && (
        <div className="qr-container">
          <h2>QR Code cho {selectedMethod.name}</h2>
          <canvas ref={canvasRef} width={200} height={200}></canvas>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
