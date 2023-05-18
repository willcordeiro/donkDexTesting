import React from 'react'
import { logo } from '../../assets'
import styled from 'styled-components'

const ContainerRewards = styled.div`
  background-color: #ff894596;
`

const Button = styled.button`
  background-color: #ff8138;
  padding: 15px;
  font-size: 17px;
  border: none;
  outline: none;
`

export default function Rewards() {
  return (
    <ContainerRewards className="basis-3/5 bg-[#ff894596] p-5 rounded-2xl text-left">
      <div>
        <p className="text-gray-600 font-medium mb-1 text-gray">Pending Rewards</p>
        <div className="font-medium mb-1 text-xl fic gap-1 text-white">
          <img src={logo} alt="b" className="w-10 h-10 bg-white rounded-full" />
          <span>0</span>
          <span>DONK</span>
        </div>
        <p className="text-gray-600 ">$0.00</p>
      </div>
      <Button className="bg-orange500 text-white w-full py-[14px] rounded-2xl custom-shadow font-semibold mt-8 hover:bg-[#ff8138]">
        Harvast
      </Button>
    </ContainerRewards>
  )
}
