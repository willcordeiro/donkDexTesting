import React from 'react'
import { a, b, c } from '../../assets'
import styled from 'styled-components'

const Span = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

const Img = styled.img`
  transition: 0.3s cubic-bezier(0.6, 0.03, 0.28, 0.98);
  transform: scale(0.9);

  :hover {
    transform: scale(1);
    transition: 0.3s cubic-bezier(0.6, 0.03, 0.28, 0.98);
  }
`

export default function Header() {
  return (
    <header className="md:py-32 pb-10 pt-10">
      <div className="max-w-6xl w-[90%] mx-auto grid grid-cols-2 md:grid-cols-3 gap-10 justify-items-center mb-24">
        <figure>
          <Img src={c} alt="coin" className="max-w-[160px] hover:scale-110 duration-300 transition-all" />
        </figure>
        <figure className="md:col-auto col-span-2">
          <Img src={a} alt="coin" className="max-w-[160px] hover:scale-110 duration-300 transition-all" />
        </figure>
        <figure className="row-start-1 row-end-2">
          <Img src={b} alt="coin" className="max-w-[160px] hover:scale-110 duration-300 transition-all" />
        </figure>
      </div>
      <h1 className="text-center text-3xl font-semibold">
        <Span>One-stop decentralized trading</Span>
      </h1>
    </header>
  )
}
