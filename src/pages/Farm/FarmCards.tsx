import React from 'react'
import { Link } from 'react-router-dom'

export default function FarmsCards({ data }: any) {
  const { id, icon, icon2, name, totalStaked, yourStake, FEES, APR } = data || {}

  return (
    <Link to={`/farm/manage/${id}`} className="bg-white p-5 rounded-md w-full">
      <header className="flex items-center gap-2 justify-between mb-5" id={id}>
        <div className="flex items-center gap-1">
          <img src={icon} alt="terra" className="w-8 sm:w-10" />
          <img src={icon2} alt="etherium" className="w-8 sm:w-10" />
          <span className="font-semibold text-black">{name}</span>
        </div>
        <div className="text-xs px-2 py-1 bg-[#cdcdcd6a] font-medium text-black">BOOST</div>
      </header>
      <div className="grid grid-cols-2  text-left">
        <div>
          <p className="text-xs text-pink900 mb-[2px] ">Total Stacked (USD)</p>
          <p className="font-semibold text-black">${totalStaked}</p>
        </div>
        <div>
          <p className="text-xs text-pink900 mb-[2px] text-black">Your Stake (USD)</p>
          <p className="font-semibold text-black">${yourStake}</p>
        </div>
        <div>
          <p className="text-xs text-pink900 mb-[2px] ">APR (30D)</p>
          <p className="font-semibold text-black">{APR}%</p>
        </div>
        <div>
          <p className="text-xs text-pink900 mb-[2px]">Deposit Fee</p>
          <p className="font-semibold text-black">{FEES}%</p>
        </div>
      </div>
    </Link>
  )
}
