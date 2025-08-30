import React from 'react'
import HeroSection from './hero-section';
import TrendingSection from './trending-section';
import Search from '@/features/search';

const Home = () => {
  return (
    <>
      <HeroSection/>
      <div className='relative -mt-8 z-[2]'>
        <Search/>
      </div>
      <TrendingSection/>
    </>
  );
};

export default Home



