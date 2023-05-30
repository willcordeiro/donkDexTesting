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

const Card = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
`

const List = styled.li`
  list-style-type: disc;
  list-style-position: inside;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
  font-weight: normal;
  margin-bottom: 5px;
`
const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

export default function Overview() {
  const stakingContract: any = useDonkStakingContract()
  const [totalContractBalance, setTotalContractBalance] = useState('0')
  const { account, library } = useWeb3React()

  const checkContractBalance = async () => {
    if (!account) return
    const stakingBalance = await stakingContract.getTotalStakedAmount()

    const amount = ethers.utils.formatUnits(stakingBalance)
    setTotalContractBalance(parseFloat(amount).toFixed(0))
  }
  setInterval(() => {
    checkContractBalance()
  }, 1000)

  return (
    <Container>
      <header className="mb-8">
        <p className="font-semibold mb-2 text-black text-xl">
          <Text>Overview</Text>
        </p>
        <div className="mb-5 flex gap-2 flex-wrap">
          <Card className="py-5 px-6 bg-white rounded-2xl flex-1">
            <p className="font-semibold mb-[1px] text-[13px] ">
              <Text>Total Staked</Text>
            </p>
            <div className="text-black font-semibold text-xl text-black">
              <Text>{totalContractBalance}</Text>
            </div>
          </Card>
        </div>
        <div>
          <p className="font-semibold mb-2 text-black text-xl">
            <Text>Stake Information</Text>
          </p>

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
        <p className="font-semibold text-black text-xl">
          <Text>Total Staked</Text>
        </p>
        <div className="my-5 sm:h-[280px] h-[200px]">
          <RechartGraph />
        </div>
      </div>
      <RemittancesTable />
    </Container>
  )
}
