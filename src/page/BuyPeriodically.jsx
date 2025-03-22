import React from 'react'
import Header from '../components/Header/Header'
import SubHeader from '../components/SubHeader/SubHeader'
import BuyForm from '../components/BuyForm/BuyForm'
import PriceChart from '../components/PriceChart/PriceChart'
import DCAAdvantages from '../components/DCA/DCAAdvantages'
import DCARisks from '../components/DCARisk/DCARisks'
import GettingStarted from '../components/GettingStarted/GettingStarted'
import CryptoPairs from '../components/CryptoEXchangePair/CryptoExchangePair'
import FAQSection from '../components/FAQSection/FAQSection'
import Footer from '../components/Footer/Footer'
const BuyPeriodically = () => {
  return (
    <>
    <header>
        <Header />
        <SubHeader />
    </header>
    <main>
        <BuyForm />
        <PriceChart />
        <DCAAdvantages />
        <DCARisks />
        <GettingStarted />
        <CryptoPairs />
        <FAQSection />
    </main>
    <footer>
      <Footer />
    </footer>
    </>
  )
}

export default BuyPeriodically