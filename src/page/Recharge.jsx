import React from 'react'
import Header from '../components/Header/Header'
import SubHeader from '../components/SubHeader/SubHeader'
import DepositForm from '../components/DepositForm/DepositForm'
import WhyChooseBinance from '../components/WhyChoseBinance/WhyChoseBinance'
import Footer from '../components/Footer/Footer'
import HelpCenter from '../components/HelpCenter/HelpCenter'
const Recharge = () => {
  return (
    <>
    <header>
        <Header />
        <SubHeader />
    </header>
    <main>
      <DepositForm />
      <WhyChooseBinance />
      <HelpCenter />  
    </main>
    <footer>
        <Footer />
    </footer>
    </>
  )
}

export default Recharge