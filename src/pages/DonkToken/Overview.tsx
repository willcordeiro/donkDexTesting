import React, { useState } from 'react'
import RechartGraph from '../DonkStaking/RechartGraph'
import RemittancesTable from './RemittancesTable'
import styled from 'styled-components'
import { useDonkStakingContract } from 'hooks/useContract'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'

const Container = styled.section`
  text-align: left;
`

const List = styled.li`
  list-style-type: disc;
  list-style-position: inside;
  color: black;
  font-weight: normal;
  margin-bottom: 5px;
`

export default function Overview() {
  const stakingContract: any = useDonkStakingContract()
  const [totalContractBalance, setTotalContractBalance] = useState('0')
  const { account, library } = useWeb3React()

  const checkContractBalance = async () => {
    if (!account) return
    const stakingBalance = await stakingContract.checkBalance(stakingContract.address)

    const amount = ethers.utils.formatUnits(stakingBalance, 0)
    setTotalContractBalance(amount)
  }
  checkContractBalance()
  return (
    <Container>
      <header className="mb-8">
        <p className="font-semibold mb-2 text-black text-xl">Overview</p>
        <div className="mb-5 flex gap-2 flex-wrap">
          <div className="py-5 px-6 bg-white rounded-2xl flex-1">
            <p className="font-semibold mb-[1px] text-[13px] ">Total Staked</p>
            <div className="text-black font-semibold text-xl text-black">{totalContractBalance}</div>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2 text-black text-xl">Stake Information</p>

          <List>Claim your share of protocol revenue generated.</List>
          <List>
            A % fee is deducted from every swap and used to buy a stablecoin which is distributed to all sJOE stakers.
          </List>
          <List>Rewards are distributed every few days, and you can Harvest at any time.</List>
          <List>
            The APR (YR) metric shows an annualized return that is forecasted, based on the revenue collected over the
            previous thirty days.
          </List>
        </div>
      </header>
      <div>
        <p className="font-semibold text-black text-xl">Total Staked</p>
        <div className="my-5 sm:h-[280px] h-[200px]">
          <RechartGraph />
        </div>
      </div>
      <RemittancesTable />
    </Container>
  )
}
