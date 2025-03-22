import React from "react";
import "./CryptoExchangePair.css";

const fiatCurrencies = ["USD", "EUR", "PHP", "AUD", "GBP", "RUB"];
const cryptoPairs = [
    "BTC to USD", "ETH to USD", "DOT to USD", "XRP to USD",
    "SHIB to USD", "USDT to USD", "BUSD to USD", "BNB to USD",
    "DOGE to USD", "ADA to USD"
];

const CryptoPairs = () => {
    return (
        <section className="crypto-section">
            <h2>Các cặp chuyển đổi tiền mã hóa hàng đầu</h2>
            
            {/* Thanh chọn tiền pháp định */}
            <div className="fiat-selection">
                {fiatCurrencies.map((currency, index) => (
                    <button key={index} className={`fiat-button ${index === 0 ? "active" : ""}`}>
                        Mua bằng {currency}
                    </button>
                ))}
            </div>

            {/* Danh sách các cặp tiền mã hóa */}
            <div className="crypto-pairs">
                {cryptoPairs.map((pair, index) => (
                    <span key={index} className="crypto-pair">
                        {pair}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default CryptoPairs;
