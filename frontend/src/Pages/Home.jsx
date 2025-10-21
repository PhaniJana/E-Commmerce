import React from 'react'
import { NavLink } from 'react-router-dom'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSeller from '../Components/BestSeller'
import Ourpolicy from '../Components/Ourpolicy'
import NewsLetter from '../Components/NewsLetter'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <Ourpolicy/>
      <NewsLetter/>
      
    </div>
  )
}

export default Home