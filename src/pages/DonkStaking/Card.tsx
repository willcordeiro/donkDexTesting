import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../../assets'
import styled from 'styled-components'

const Container = styled.div`
  border: solid 1px rgb(209 213 219);
  border-radius: 0.375rem;
  width: 100%;
  text-align: left;
  :hover {
    background: #cdcdcd6a;
  }
`
const Header = styled.div`
  padding: 20px;
`

export default function Card() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3 mb-10 border border-gray-300 ">
      <Container>
        <Link to="/stake/token">
          <Header>
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logo} alt="logo" width="60" />
                <span className="font-semibold text-black">Donk</span>
              </div>
              <div className="text-xs px-2 py-1 bg-[#cdcdcd6a] font-medium text-black rounded-md">Earn Donk</div>
            </header>
          </Header>
          <div className="grid grid-cols-2 p-5">
            <div>
              <p className="text-xs text-pink900 mb-[2px]">Total Stacked (USD)</p>
              <p className="font-semibold text-black">$0</p>
            </div>
            <div>
              <p className="text-xs text-pink900 mb-[2px] ">Your Stake (USD)</p>
              <p className="font-semibold text-black">$0</p>
            </div>
            <div>
              <p className="text-xs text-pink900 mb-[2px] ">APR (1YR)</p>
              <p className="font-semibold text-black">2500%</p>
            </div>
            <div>
              <p className="text-xs text-pink900 mb-[2px] ">Deposit Fee</p>
              <p className="font-semibold text-black">0.1%</p>
            </div>
          </div>
        </Link>
      </Container>
    </div>
  )
}
