import React from 'react'
import Connect from './Connect'
import Typewriter from 'typewriter-effect';
import Style from '../styles/typed.module.css'
const index = () => {
  return (
    <div>
      <Connect/>
      <div className={Style.text}>
        <h2 className={Style.heading}>Hi</h2>
        <Typewriter
          options={{
          strings: ['We are Team', 'Web3 Frankensteins','Here is a simple solution to showcase verified products on Product Marketplace'],
          cursor:"|",
          deplay:50,
          autoStart: true,
          loop: true,
          duration:500
        }}
      />
      </div>
      
    </div>
  )
}

export default index