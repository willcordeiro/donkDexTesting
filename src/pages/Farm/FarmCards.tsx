import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled(Link)`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
`
const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

export default function FarmsCards({ data }: any) {
  const { id, icon, icon2, name, totalStaked, yourStake, FEES, APR } = data || {}

  return (
    <Container to={`/farm/manage/${id}`} className="bg-white p-5 rounded-md w-full">
      <header className="flex items-center gap-2 justify-between mb-5" id={id}>
        <div className="flex items-center gap-1">
          <img src={icon} alt="terra" className="w-8 sm:w-10" />
          <img src={icon2} alt="Ethereum" className="w-8 sm:w-10" />
          <span className="font-semibold text-black">
            <Text>{name}</Text>
          </span>
        </div>
        <div className="text-xs px-2 py-1 bg-[#cdcdcd6a] font-medium text-black">
          <Text>BOOST</Text>
        </div>
      </header>
      <div className="grid grid-cols-2  text-left">
        <div>
          <p className="text-xs text-pink900 mb-[2px] ">
            <Text>Total Stacked (USD)</Text>
          </p>
          <p className="font-semibold text-black">
            <Text>${totalStaked}</Text>
          </p>
        </div>
        <div>
          <p className="text-xs text-pink900 mb-[2px] text-black">
            <Text>Your Stake (USD)</Text>
          </p>
          <p className="font-semibold text-black">
            <Text>${yourStake}</Text>
          </p>
        </div>
        <div>
          <p className="text-xs text-pink900 mb-[2px] ">
            <Text>APR (30D)</Text>
          </p>
          <p className="font-semibold text-black">
            <Text>{APR}%</Text>
          </p>
        </div>
        <div>
          <p className="text-xs text-pink900 mb-[2px]">
            <Text>Deposit Fee</Text>
          </p>
          <p className="font-semibold text-black">
            <Text>{FEES}%</Text>
          </p>
        </div>
      </div>
    </Container>
  )
}
