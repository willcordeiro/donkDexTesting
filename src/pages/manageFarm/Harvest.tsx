import React from 'react'
import Rewards from './Rewards'
import { useParams } from 'react-router-dom'
import { etherium, solona, bitcoin, terra, logo } from '../../assets'
import styled from 'styled-components'

const ContainerHarvest = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`
export default function Harvest() {
  const { id }: any = useParams()

  const data = [
    {
      id2: 1,
      icon: logo,
      icon2: etherium,
      name: 'Etherium',
      totalStaked: '859,564,49',
      yourStake: '67',
      FEES: '24.45',
      APR: '800',
      share: '0.2',
      donkAPR: '2500'
    },
    {
      id2: 2,
      icon: logo,
      icon2: solona,
      name: 'Solana',
      totalStaked: '200,564,839',
      yourStake: '67',
      FEES: '24.45',
      APR: '7.95',
      share: '0.2',
      donkAPR: '2500'
    },
    {
      id2: 3,
      icon: logo,
      icon2: bitcoin,
      name: 'Bitcoin',
      totalStaked: '345,564,839',
      yourStake: '600',
      FEES: '24.45',
      APR: '71.5',
      share: '5',
      donkAPR: '2500'
    },
    {
      id2: 4,
      icon: logo,
      icon2: terra,
      name: 'Terra',
      totalStaked: '100,000,000',
      yourStake: '2',
      FEES: '24.45',
      APR: '767.0',
      share: '0.1',
      donkAPR: '2500'
    }
  ]

  const mappedData = data.filter(obj => obj.id2 === parseInt(id))

  const { icon, icon2, name, totalStaked, yourStake, APR, share, donkAPR } = mappedData[0] || {}

  return (
    <section className="rounded-2xl bg-white basis-3/5 py-4 sm:px-10 px-5">
      <header>
        <ContainerHarvest className="fic flex-wrap gap-[6px] font-semibold text-xl mb-5 ">
          <img src={icon} alt="bitcoin" width={40} />
          <p className="uppercase text-black">LP Token</p>
          <span>/</span>
          <img src={icon2} alt="litecoin" width={40} />
          <p className="uppercase text-black">{name}</p>
        </ContainerHarvest>
        <ContainerHarvest className="mb-4 flex justify-between py-4 gap-3 flex-wrap text-left">
          <div>
            <p className="font-medium text-pink900 mb-[1px] text-[15px] ">Liquidity</p>
            <div className=" font-medium text-[15px] text-black">${totalStaked}</div>
          </div>
          <div>
            <p className="font-medium text-pink900 mb-[1px] text-[15px] ">Pool APR</p>
            <div className=" font-medium text-[15px] text-black">{APR}%</div>
          </div>
          <div>
            <p className="font-medium text-pink900 mb-[1px] text-[15px] ">DONK APR</p>
            <div className=" font-medium text-[15px] text-black">{donkAPR}%</div>
          </div>
        </ContainerHarvest>
      </header>

      <section className="flex md:items-center gap-3 max-md:flex-col">
        <ContainerHarvest className="flex-1 text-left">
          <div className="mb-3 ">
            <p className="text-pink900 font-medium ">Staked</p>
            <p className="font-medium text-2xl text-black">${yourStake}</p>
            <p className="mb-1"></p>
          </div>
          <div>
            <p className="text-pink900 font-medium ">Your share</p>
            <p className="font-medium text-2xl text-black">{share}%</p>
          </div>
        </ContainerHarvest>
        <Rewards />
      </section>
    </section>
  )
}
