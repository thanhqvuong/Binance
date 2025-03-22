import React from 'react'
import Header from '../components/Header/Header'
import P2PExchange from '../components/P2PExchange/P2PExchange'
import Footer from '../components/Footer/Footer'
import P2PGuide from '../components/Introduct/P2PGuide'
import P2PAdvantages from '../components/P2PAdvantages/P2PAdvantages'
import BlogP2P from '../components/BlogP2P/BlogP2P'
import PaymentMethods from '../components/Payments/PaymentMethods'
import P2PFaqTabs from '../components/P2PFAQ/P2PFAQ'

const Trading = () => {
  return (
    <>
    <header>
        <Header />
    </header>
    <main>
        <P2PExchange />
        <P2PGuide />
        <P2PAdvantages />
        <BlogP2P />
        <PaymentMethods />
        <P2PFaqTabs />
    </main>
    <footer>
        <Footer />
    </footer>
    </>
  )
}

export default Trading