import React from 'react'
import Hero from '../components/hero'
import TopHotels from '../components/topHotels'
import Experience from '../components/experience'
import TopRooms from '../components/topRooms'
import Testimonials from '../components/testimonials'

const Home = () => {
  return (
    <div className='mt-16 md:mt-18 bg-slate-950/70'>
      <Hero/>
      <TopHotels/>
      <Experience />
      <TopRooms />
      <Testimonials/>
    </div>
  )
}

export default Home
