import React from 'react';
import Hero from './Hero';
import Features from './Features/Features';
import About from './About/About';
import HomeEvents from './Events/HomeEvents';
import HomeGallery from './Gallery/HomeGallery';
import Specials from './Specials';

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <About />
      <HomeEvents />
      <HomeGallery />
      <Specials />
    </main>
  );
};

export default Home;