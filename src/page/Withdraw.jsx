import React from 'react'
import Header from '../components/Header/Header'
import SubHeader from '../components/SubHeader/SubHeader'
import WithdrawForm from '../components/Withdraw/WithdrawForm'
import Footer from '../components/Footer/Footer'

const Withdraw = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header>
        <Header />
        <SubHeader />
      </header>
      <main style={{ flex: 1 }}>
        <WithdrawForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Withdraw
