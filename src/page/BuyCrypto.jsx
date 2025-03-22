import React from 'react'
import Header from '../components/Header/Header'
import SubHeader from '../components/SubHeader/SubHeader'
import CryptoTrade from '../components/Buy Crypto/CryptoTrade'
import CryptoPurchase from '../components/CryptoPurchase/CryptoPurchase'
import MarketSection from '../components/MarketSection/MarketSection'
import ExchangeTable from '../components/ExchangeTable/ExchangeTable'
import ExchangeRates from '../components/ExchangeRate/ExchangeRates'
import Footer from '../components/Footer/Footer'
const BuyCrypto = () => {
  return (
    <>
    <header>
        <Header />
        <SubHeader />
    </header>
    <main>
        <CryptoTrade />
        <CryptoPurchase />
        <MarketSection />
        <ExchangeTable />
        <ExchangeRates />
    </main>
    <footer>
      <Footer />
    </footer>
    </>
  )
}

export default BuyCrypto