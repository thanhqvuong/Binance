import React from 'react'
import Header from '../components/Header/Header'
import ProfileForm from '../components/ProfileForm/ProfileForm'
import ProfileDetail from '../components/ProfileDetail/ProfileDetail'
import Footer from '../components/Footer/Footer'
const Profile = () => {
  return (
    <>
    <header>
        <Header />
    </header>
    <main>
        <ProfileForm />
        <ProfileDetail />
    </main>
    <footer>
        <Footer />
    </footer>
    </>
  )
}

export default Profile