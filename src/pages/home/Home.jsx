import React from "react";
import Header from "../../components/header/Header";
import Container from "../../components/container/Container";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

function Home() {
  return (
    <div>
      <Navbar />
      <div>
        <Header />
        <Container />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
