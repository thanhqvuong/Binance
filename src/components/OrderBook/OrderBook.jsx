import React, { useState, useEffect } from "react"; // Import React và các hooks
import "./OrderBook.css"; // Import file CSS để tạo kiểu

const OrderBook = () => {
  // State lưu trữ danh sách lệnh, khởi tạo từ localStorage
  const [orders, setOrders] = useState(() => {
    // Lấy dữ liệu từ localStorage khi component mount
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : []; // Nếu có dữ liệu thì parse, nếu không thì dùng mảng rỗng
  });

  useEffect(() => {
    // Hàm tạo danh sách lệnh mới
    const generateOrders = () => {
      const newOrders = Array.from({ length: 10 }, () => {
        const isBuy = Math.random() > 0.5; // Xác định lệnh mua (buy) hoặc bán (sell)
        return {
          price: (30000 + Math.random() * 2000).toFixed(2), // Giá ngẫu nhiên từ 30,000 - 32,000
          amount: (Math.random() * 2).toFixed(4), // Khối lượng ngẫu nhiên từ 0 đến 2 USDT
          type: isBuy ? "buy" : "sell", // Loại lệnh
        };
      });

      // Lưu tối đa 20 lệnh gần nhất (FIFO: Lệnh mới nhất ở đầu danh sách)
      setOrders((prevOrders) => {
        const updatedOrders = [...newOrders, ...prevOrders].slice(0, 20); // Giữ tối đa 20 lệnh
        localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Lưu vào localStorage
        return updatedOrders;
      });
    };

    generateOrders(); // Gọi lần đầu tiên khi component mount
    const interval = setInterval(generateOrders, 1000); // Cập nhật danh sách lệnh mỗi giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <div className="order-book">
      <h3>Order Book</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className={`order-item ${order.type}`}> 
            {/* Hiển thị giá lệnh */}
            <span className="price">{order.price}</span>
            {/* Hiển thị khối lượng lệnh */}
            <span className="amount">{order.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
