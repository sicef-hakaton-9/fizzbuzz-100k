import React, { useState } from "react";
import Banner from "../components/Homepage/Banner/Banner";
import Header from "../components/Homepage/Header/Header";

const Home: React.FC = () => {
  return (
    <>
      <main style={{ width: "85%" }}>
        <Header />
        <Banner />
      </main>
    </>
  );
};

export default Home;
