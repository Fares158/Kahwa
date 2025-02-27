import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features/Features';
import About from '../components/About/About';
import HomeEvents from '../components/Events/HomeEvents';
import Gallery from '../components/Gallery/HomeGallery';
import Specials from '../components/Specials';

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <HomeEvents />
      <Gallery />
      <Specials />
    </main>
  );
};

export default Home;
