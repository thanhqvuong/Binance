import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import DownloadSection from "../components/Download/Download";
import FAQ from "../components/FAQ/FAQ";
import CallToAction from "../components/CallToAction/CallToAction";
import Footer from "../components/Footer/Footer";

const Homepage = () => {

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <HeroSection /> 
        <DownloadSection />
        <FAQ />
        <CallToAction onOpenChat={() => setIsChatOpen(true)} />
      </main>
      <footer>
        <Footer />
      </footer>
      
    </>
  );
};

export default Homepage;
