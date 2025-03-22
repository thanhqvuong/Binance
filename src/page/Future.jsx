import React from 'react';
import Header from '../components/Header/Header';
import PriceInfoBar from '../components/PriceInfoBar/PriceInfoBar';
import TradingChart from '../components/TradingChart/TradingChart';
import OrderBook from '../components/OrderBook/OrderBook';
import MarketTrades from '../components/TradeMarket/TradeMarket';
import OrderPlacementForm from '../components/OrderPlacementForm/OrderPlacementForm';
import PositionOpenOrders from '../components/PositionOpenOrder/PositionOpenOrder';
import TradeHistory from '../components/TradingHistory/TradeHistory';
import Footer from '../components/Footer/Footer';

const Future = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <PriceInfoBar />
        <TradingChart />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, marginRight: '10px' }}>
            <OrderBook />
          </div>
          <div style={{ flex: 1, marginLeft: '10px' }}>
            <TradeHistory />
          </div>
        </div>
        <MarketTrades />
        <OrderPlacementForm />
        <PositionOpenOrders />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Future;
