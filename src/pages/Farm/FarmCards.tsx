import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import { logo } from '../../assets'
import { ethers } from 'ethers'
import { useFarmStakingContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'

const Container = styled(Link)`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
`
const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};

  .elips {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export default function FarmsCards({ data }: any) {
  const { account, library } = useWeb3React()
  const signer = library.getSigner(account)
  const farmContract: any = useFarmStakingContract()
  const farmContractWithSigner = farmContract.connect(signer)
  const { farmID, rewardTokenName, rewardPerDay, rewardTokenAmount, initialDate, endDate } = data || {}

  const [totalStaked, setTotalStaked] = useState<any>()
  const [yourStake, setYourStake] = useState<any>()
  const [active, setActive] = useState<any>()
  const [start, setStart] = useState<any>()
  const [end, setEnd] = useState<any>()
  const [ended, setEnded] = useState(false)

  async function getUserValues() {
    const totalStaked = await farmContractWithSigner.callStatic.stakedAmount(farmID)
    const yourStake = await farmContractWithSigner.callStatic.getPositionByUser(farmID, account)

    const [walletAddress, createdDate, amountStaked, rewardStaked, savedReward] = yourStake

    const stakeObject = {
      walletAddress: walletAddress,
      createdDate: createdDate,
      amountStaked: amountStaked,
      rewardStaked: rewardStaked,
      savedReward: savedReward
    }

    const bigNumber = ethers.BigNumber.from(totalStaked)
    const value = ethers.utils.formatUnits(bigNumber)

    const bigNumber2 = ethers.BigNumber.from(stakeObject.amountStaked)
    const value2 = ethers.utils.formatUnits(bigNumber2)

    setTotalStaked(value)
    setYourStake(value2)
  }

  async function getPoolActive() {
    const farmStart = await farmContractWithSigner.callStatic.farmStart(farmID)
    const farmEnd = await farmContractWithSigner.callStatic.farmEnd(farmID)

    //TODO: MAYBE THE VARIABLES WILL NOT COST to save the staked amount in the contract

    getStartTime()
    getEndTime()

    if (farmStart && farmEnd) {
      setActive(true)
    } else {
      setActive(false)
    }
  }

  async function getStartTime() {
    const bigNumber = ethers.BigNumber.from(initialDate)
    const value = bigNumber.toNumber()
    const timestamp = value
    const date = new Date(timestamp * 1000)

    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)

    const dateString = `${month}/${day}/${year} ${hours}:${minutes}`

    setStart(dateString)
  }

  async function getEndTime() {
    const now = Math.floor(Date.now() / 1000)
    const bigNumber = ethers.BigNumber.from(endDate)
    const endTime = bigNumber.toNumber()

    if (endTime < now) {
      setEnded(true)
    }

    const date = new Date(endTime * 1000)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)

    const dateString = `${month}/${day}/${year} ${hours}:${minutes}`

    setEnd(dateString)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      getUserValues()
      getPoolActive()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Container
      to={active ? `/farm/manage/${farmID}/${rewardTokenName}` : '/farm'}
      className="bg-white p-5 rounded-md w-full"
    >
      <header className="items-center gap-2 justify-between mb-5 " id={farmID}>
        <div className="flex items-center gap-1">
          <img src={logo} alt="terra" className="w-8 sm:w-10" />
          <img src={EthereumLogo} alt="Ethereum" className="w-8 sm:w-10" />
          <span className="font-semibold text-black">
            <Text>LP DONK/{rewardTokenName}</Text>
          </span>
        </div>
        <div className="text-xs px-2 py-1 bg-[#cdcdcd6a] font-medium text-black text-left mt-5">
          <Text>
            {active ? (
              <>
                <span
                  style={{
                    color: 'white  ',
                    background: '#ff8e4c',
                    borderRadius: '0.4rem',
                    paddingRight: 5,
                    paddingLeft: 5
                  }}
                >
                  active
                </span>
                <br />
                Ends in {end}
              </>
            ) : ended ? (
              <>
                <span
                  style={{
                    color: 'white  ',
                    background: '#ff8e4c',
                    borderRadius: '0.4rem',
                    paddingRight: 5,
                    paddingLeft: 5
                  }}
                >
                  ended
                </span>
                <br />
                Ended in {end}
              </>
            ) : (
              <>
                <span
                  style={{
                    color: 'white  ',
                    background: '#ff8e4c',
                    borderRadius: '0.4rem',
                    paddingRight: 5,
                    paddingLeft: 5
                  }}
                >
                  disabled
                </span>
                <br />
                Starts in {start}
              </>
            )}
          </Text>
        </div>
      </header>
      <div className="grid grid-cols-2  text-left">
        <div>
          <p className="text-xs text-pink900 mb-[2px] ">
            <Text>Total Staked</Text>
          </p>
          <p className="font-semibold text-black">
            <Text>
              <p className="elips">{totalStaked}</p>
            </Text>
          </p>
        </div>
        <div>
          <p className="text-xs text-pink900 mb-[2px] text-black">
            <Text>Your Stake</Text>
          </p>
          <p className="font-semibold text-black">
            <Text>
              <p className="elips">{yourStake}</p>
            </Text>
          </p>
        </div>
        <div>
          <p className="text-xs text-pink900 mb-[2px] text-black">
            <Text>Estimate reward per day</Text>
          </p>

          <p className="font-semibold text-black">
            <Text>
              <p className="elips">{ethers.utils.formatEther(rewardPerDay)}</p>
            </Text>
          </p>
        </div>

        <div>
          <p className="text-xs text-pink900 mb-[2px] text-black">
            <Text>Amount of Rewards</Text>
          </p>
          <p className="font-semibold text-black">
            <Text>
              <p className="elips">{ethers.utils.formatEther(rewardTokenAmount)}</p>
            </Text>
          </p>
        </div>
      </div>
    </Container>
  )
}
