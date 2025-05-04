import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ChooseUs from "./ChooseUs";
import Services from "./Services";
import Doctors from "./Doctors";

const Main = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Hero Banner */}
      <Hero />
      {/* Why choose us */}
      <ChooseUs />
      {/* Services */}
      <Services />
      {/* Doctors */}
      <Doctors />
    </>
  );
};

export default Main;
