import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CoinTabs from '../components/CoinTab/CoinTab'
import MarketForm from '../components/Market/MarketForm'

const Market = () => {
  return (
    <>
    <header>
        <Header />
    </header>
    <main>
        <MarketForm />      
        <CoinTabs />
    </main>
    <footer>
        <Footer />
    </footer>
    </>
  )
}

export default Market