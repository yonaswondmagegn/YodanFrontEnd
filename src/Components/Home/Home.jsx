import React from 'react'
import Navigation from '../Navigation/Navigation'
import TodaysSelection from './TodaysSelection'
import Bossted from '../BoostedProduct/Bossted'
import Chategory from '../ByChategory/Chategory'
import './HomeCss/home.css'

const Home = () => {
  return (
    <>
      <Navigation />
      <div className="home__cont">
        
        <TodaysSelection />
        <Bossted />
        <Chategory />
    
        
      
      </div>
    </>
  )
}

export default Home