import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../../assets'
import styled from 'styled-components'
import { useDonkStakingContract } from 'hooks/useContract'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'

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

const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

export default function Card() {
  const stakingContract: any = useDonkStakingContract()
  const { account, library } = useWeb3React()
  const [totalContractBalance, setTotalContractBalance] = useState('0')
  const [totalUserStaked, setTotalUserStaked] = useState('0')
  const [apr, setApr] = useState('0')
  const [fee, setFee] = useState('0')
  const checkContractBalance = async () => {
    //checking contract balance
    if (!account) return
    const stakingBalance = await stakingContract.getTotalStakedAmount()
    const amount = ethers.utils.formatUnits(stakingBalance)
    setTotalContractBalance(parseFloat(amount).toFixed(0))
  }

  const getStakedBalance = async () => {
    if (!account) return
    // Check staking balance
    const userBalance = await stakingContract.connect(account).getPositions()

    const amount = ethers.utils.formatUnits(userBalance.amountStaked)
    setTotalUserStaked(parseFloat(amount).toFixed(0))
  }

  const getAPR = async () => {
    if (!account) return
    // Check apr
    const apr = await stakingContract.connect(account).getAPR()

    const amount = ethers.utils.formatUnits(apr, 0)

    setApr(amount)
  }

  const getFee = async () => {
    if (!account) return
    // Check apr
    const fee = await stakingContract.connect(account).getStakingFee()

    const amount = `${fee / 100}`

    setFee(amount)
  }

  getAPR(), getStakedBalance(), checkContractBalance(), getFee()

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3 mb-10 border border-gray-300 ">
      <Container>
        <Link to="/stake/token">
          <Header>
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logo} alt="logo" width="50" />
                <span className="font-semibold text-black">
                  <Text>Donk</Text>
                </span>
              </div>
              <div className="text-xs px-2 py-1 bg-[#cdcdcd6a] font-medium text-black rounded-md">
                <Text>Earn Donk</Text>
              </div>
            </header>
          </Header>
          <div className="grid grid-cols-2 p-5">
            <div>
              <p className="text-xs text-pink900 mb-[2px]">
                <Text>Total Stacked </Text>
              </p>
              <p className="font-semibold text-black">
                <Text>{totalContractBalance}</Text>
              </p>
            </div>
            <div>
              <p className="text-xs text-pink900 mb-[2px] ">
                <Text>Your Stake </Text>
              </p>
              <p className="font-semibold text-black">
                <Text>{totalUserStaked}</Text>
              </p>
            </div>
            <div>
              <p className="text-xs text-pink900 mb-[2px] ">
                <Text>APR (1YR)</Text>
              </p>
              <p className="font-semibold text-black">
                <Text>{apr}%</Text>
              </p>
            </div>
            <div>
              <p className="text-xs text-pink900 mb-[2px] ">
                <Text>Unstake Fee</Text>
              </p>
              <p className="font-semibold text-black">
                <Text>{fee}%</Text>
              </p>
            </div>
          </div>
        </Link>
      </Container>
    </div>
  )
}
