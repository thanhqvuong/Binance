import React, { useState, useEffect } from "react"; // Import React và các hooks
import { coinData } from "../../store/CoinData"; // Import dữ liệu coin từ store
import "./MarketForm.css"; // Import file CSS

const MarketForm = () => {
  // Danh sách danh mục hiển thị trong bảng giá
  const categories = [
    { title: "Coin nổi bật", key: "Nổi bật" },
    { title: "Niêm yết mới", key: "Niêm Yết Mới" },
    { title: "Top coin tăng giá", key: "Tăng giá" },
  ];

  const [topCoins, setTopCoins] = useState({}); // State lưu danh sách top coin theo từng danh mục

  useEffect(() => {
    const updatePrices = () => {
      const newTopCoins = {}; // Object tạm thời để lưu danh sách coin cập nhật

      categories.forEach(({ key }) => {
        // Lấy danh sách coin tương ứng với từng danh mục
        let coins = [...(coinData[key] || [])].map((coin) => ({
          ...coin,
          priceChange: parseFloat((Math.random() * 4 - 2).toFixed(2)), // Random biến động giá từ -2% đến +2%
        }));

        // Sắp xếp coin theo biến động giá giảm dần
        coins.sort((a, b) => b.priceChange - a.priceChange);

        // Chỉ lấy top 4 coin có biến động giá cao nhất
        newTopCoins[key] = coins.slice(0, 4);
      });

      setTopCoins(newTopCoins); // Cập nhật state với danh sách coin mới
    };

    updatePrices(); // Gọi hàm cập nhật ngay khi component được render

    const interval = setInterval(updatePrices, 1000); // Cập nhật dữ liệu mỗi giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []); // Chạy effect 1 lần khi component mount

  return (
    <div className="market-form">
      {/* Lặp qua danh sách danh mục để hiển thị bảng giá */}
      {categories.map(({ title, key }) => (
        <div key={key} className="market-box">
          <div className="market-header">
            <h3>{title}</h3> {/* Tiêu đề danh mục */}
          </div>
          <table>
            <tbody>
              {/* Hiển thị danh sách coin trong từng danh mục */}
              {topCoins[key]?.map((coin, index) => (
                <tr key={index} className={coin.priceChange < 0 ? "decrease" : "increase"}>
                  <td className="coin-name">{coin.name}</td> {/* Tên coin */}
                  <td>{coin.price.toLocaleString()}₫</td> {/* Giá coin, format có dấu phẩy ngăn cách */}
                  {/* Hiển thị phần trăm thay đổi giá với màu xanh (tăng) hoặc đỏ (giảm) */}
                  <td className={coin.priceChange < 0 ? "red" : "green"}>{coin.priceChange}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default MarketForm;
