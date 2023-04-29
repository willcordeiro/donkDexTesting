import React from 'react'
import Explore from './Explorer'
import HeaderHome from './HeaderHome'

export default function Home() {
  return (
    <>
      <HeaderHome />

      <div className="backgroundWhite">
        <Explore />
      </div>
    </>
  )
}
