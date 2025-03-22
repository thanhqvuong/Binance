import React, { useState, useEffect } from "react";
import { coinData } from "../../store/CoinData";
import "./CoinTab.css";

const CoinTabs = () => {
  // Tạo danh sách các tab, bao gồm "All" và các danh mục từ dữ liệu coinData
  const tabs = ["All", ...Object.keys(coinData)];
  
  // State để theo dõi tab đang được chọn
  const [activeTab, setActiveTab] = useState("All");
  
  // State để lưu danh sách coin theo tab đang chọn
  const [coins, setCoins] = useState([]);

  // useEffect chạy khi component được mount để cập nhật giá coin mỗi giây
  useEffect(() => {
    const updatePrices = () => {
      setCoins((prevCoins) => {
        return prevCoins.map((coin) => ({
          ...coin,
          priceChange: parseFloat((Math.random() * 4 - 2).toFixed(2)), // Giá thay đổi ngẫu nhiên từ -2% đến +2%
        })).sort((a, b) => b.priceChange - a.priceChange); // Sắp xếp theo mức thay đổi giá
      });
    };

    // Cập nhật giá mỗi 1 giây
    const interval = setInterval(updatePrices, 1000);
    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, []);

  // useEffect chạy khi tab được thay đổi để cập nhật danh sách coin tương ứng
  useEffect(() => {
    setCoins(
      activeTab === "All" 
        ? Object.values(coinData).flat() // Nếu chọn "All", lấy tất cả coin từ các danh mục
        : [...coinData[activeTab]] // Nếu chọn tab khác, lấy danh sách coin của tab đó
    );
  }, [activeTab]);

  return (
    <div className="coin-tab">
      {/* Danh sách tab */}
      <div className="tab-container">
        {tabs.map((tab) => (
          <button 
            key={tab} 
            className={tab === activeTab ? "active" : ""} 
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bảng hiển thị danh sách coin */}
      <div className="table-container">
        <h2>{activeTab}</h2>
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Giá</th>
              <th>24h Thay đổi</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr 
                key={index} 
                className={coin.priceChange < 0 ? "decrease" : "increase"} // Thêm class màu dựa vào thay đổi giá
              >
                <td>{coin.name}</td>
                <td>{coin.price.toLocaleString()}</td>
                <td className={coin.priceChange < 0 ? "red" : "green"}>
                  {coin.priceChange}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinTabs;