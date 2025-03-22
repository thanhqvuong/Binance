import React, { useState, useEffect } from "react"; // Import React và hooks cần thiết
import { coinData } from "../../store/CoinData"; // Import dữ liệu danh sách coin
import "./CoinList.css"; // Import CSS cho component

const CoinList = () => {
  const [coins, setCoins] = useState(coinData); // State để lưu danh sách coin

  useEffect(() => {
    // useEffect chạy sau khi component mount
    const interval = setInterval(() => {
      // Tạo interval để cập nhật giá coin mỗi giây
      setCoins((prevCoins) =>
        Object.fromEntries(
          Object.entries(prevCoins).map(([category, coinList]) => [
            category,
            coinList
              .map((coin) => {
                const changePercent = (Math.random() * 70 - 35).toFixed(2); // Sinh giá trị thay đổi ngẫu nhiên từ -35% đến +35%
                const newPrice = Math.max(
                  1,
                  (coin.price * (1 + changePercent / 100)).toFixed(2)
                ); // Tính giá mới, đảm bảo không nhỏ hơn 1

                return {
                  ...coin,
                  price: newPrice, // Cập nhật giá mới
                  change: parseFloat(changePercent), // Lưu phần trăm thay đổi
                };
              })
              .sort((a, b) => b.price - a.price), // Sắp xếp coin theo giá giảm dần
          ])
        )
      );
    }, 1000); // Cập nhật giá mỗi giây

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, []);

  return (
    <div className="coin-list"> {/* Container chứa danh sách coin */}
      {Object.entries(coins).map(([category, coinList]) => (
        <div key={category} className="coin-category"> {/* Chia coin theo danh mục */}
          <h2 className="category-title">{category}</h2> {/* Tiêu đề danh mục */}
          <table className="coin-table"> {/* Bảng hiển thị danh sách coin */}
            <thead>
              <tr>
                <th>Tên Coin</th>
                <th>Giá</th>
                <th>Thay đổi (%)</th>
              </tr>
            </thead>
            <tbody>
              {coinList.map((coin) => (
                <tr key={coin.name} className="coin-row"> {/* Hàng hiển thị thông tin từng coin */}
                  <td className="coin-name">{coin.name}</td> {/* Tên coin */}
                  <td className="coin-price">{coin.price.toLocaleString()}</td> {/* Giá coin */}
                  <td
                    className={`coin-change ${
                      coin.change > 0
                        ? "positive" // Màu xanh nếu tăng giá
                        : coin.change < 0
                        ? "negative" // Màu đỏ nếu giảm giá
                        : "neutral" // Màu trung tính nếu không đổi
                    }`}
                  >
                    {coin.change}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CoinList;