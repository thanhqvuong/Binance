import React from 'react'
import Header from '../components/Header/Header'
import Banner from '../components/Banner/Banner'
import EarningsCalculator from '../components/EarningCalculator/EarningCalculator'
import EarningFAQ from '../components/EarningFAQ/EarningFAQ'
import Footer from '../components/Footer/Footer'    
const Earning = () => {
  return (
    <>
        <header>
            <Header />
        </header>
        <main>
            <Banner />
            <EarningsCalculator />
            <EarningFAQ />
        </main>
        <footer>
            <Footer />
        </footer>
    </>
  )
}

export default Earning