import React, { useState, useEffect, useMemo } from "react";
import { coinData } from "../../store/CoinData";
import "./MarketForm.css";

const MarketForm = () => {
  const categories = useMemo(() => [
    { title: "Coin nổi bật", key: "Nổi bật" },
    { title: "Niêm yết mới", key: "Niêm Yết Mới" },
    { title: "Top coin tăng giá", key: "Tăng giá" },
  ], []);

  const [topCoins, setTopCoins] = useState({});

  useEffect(() => {
    const updatePrices = () => {
      setTopCoins((prevTopCoins) => {
        const newTopCoins = {};

        categories.forEach(({ key }) => {
          let coins = [...(coinData[key] || [])].map((coin) => {
            const priceChange = parseFloat((Math.random() * 4 - 2).toFixed(2)); 
            const newPrice = parseFloat((coin.price * (1 + priceChange / 100)).toFixed(2));

            return {
              ...coin,
              priceChange,
              price: newPrice, // Cập nhật giá mới
            };
          });

          coins.sort((a, b) => b.priceChange - a.priceChange);
          newTopCoins[key] = coins.slice(0, 4);
        });

        return JSON.stringify(prevTopCoins) === JSON.stringify(newTopCoins) 
          ? prevTopCoins 
          : newTopCoins;
      });
    };

    updatePrices();
    const interval = setInterval(updatePrices, 1000);

    return () => clearInterval(interval);
  }, [categories]);

  return (
    <div className="market-form">
      {categories.map(({ title, key }) => (
        <div key={key} className="market-box">
          <div className="market-header">
            <h3>{title}</h3>
          </div>
          <table>
            <tbody>
              {topCoins[key]?.map((coin, index) => (
                <tr key={index} className={coin.priceChange < 0 ? "decrease" : "increase"}>
                  <td className="coin-name">{coin.name}</td>
                  <td>{coin.price.toLocaleString()}₫</td>
                  <td className={coin.priceChange < 0 ? "red" : "green"}>
                    {coin.priceChange}%
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

export default MarketForm;
