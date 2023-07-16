import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import { logo } from '../../assets'
import { ethers } from 'ethers'
import { useFarmStakingContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { Pair, JSBI, Currency, Token } from '@donkswap/sdk'
import { usePairs } from 'data/Reserves'
import useExtendWithStakedAmount from 'hooks/staking/pools/useExtendWithStakedAmount'
import { useDefaultStakingPools } from 'state/stake/hooks'
import { useTrackedTokenPairs, toV2LiquidityToken } from 'state/user/hooks'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { unwrappedToken } from 'utils/wrappedCurrency'
import { BIG_INT_ZERO } from '../../constants/'
import { PulseLoader } from 'react-spinners'
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
  const [poolData, setPoolData] = useState<any>()
  const [poolInfo, setPoolInfo] = useState<any>()

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

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()

  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances] = useTokenBalancesWithLoadingIndicator(account ?? undefined, liquidityTokens)

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () => tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) => liquidityToken.address),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  // show liquidity even if its deposited in rewards contract
  let stakingInfo = useDefaultStakingPools(true)
  stakingInfo = useExtendWithStakedAmount(stakingInfo)
  const stakingInfosWithBalance = stakingInfo?.filter(
    pool => pool.stakedAmount && JSBI.greaterThan(pool.stakedAmount.raw, BIG_INT_ZERO)
  )
  const stakingPairs = usePairs(stakingInfosWithBalance?.map(stakingInfo => stakingInfo.tokens))

  // remove any pairs that also are included in pairs with stake in mining pool
  const v2PairsWithoutStakedAmount = allV2PairsWithLiquidity
    .map(v2Pair => {
      const currency0 = unwrappedToken(v2Pair.token0)
      const currency1 = unwrappedToken(v2Pair.token1)

      const updatedV2Pair = {
        ...v2Pair,
        token0: currency0,
        token1: currency1
      }

      return updatedV2Pair
    })
    .filter(updatedV2Pair => {
      return (
        stakingPairs
          ?.map(stakingPair => stakingPair[1])
          .filter(stakingPair => stakingPair?.liquidityToken.address === updatedV2Pair.liquidityToken.address)
          .length === 0
      )
    })

  const filteredResults: any = v2PairsWithoutStakedAmount.filter(
    item => item.liquidityToken.address === data.farmTokenAddress
  )

  return (
    <Container
      to={active || ended ? `/farm/manage/${farmID}/${rewardTokenName}` : '/farm'}
      className="bg-white p-5 rounded-md w-full"
    >
      <header className="items-center gap-2 justify-between mb-5 " id={farmID}>
        <div className="flex items-center gap-1 justify-between">
          <div>
            <img src={logo} alt="terra" className="w-8 sm:w-10" />
            <img src={EthereumLogo} alt="Ethereum" className="w-8 sm:w-10" />
          </div>

          <div>
            <span className="font-semibold text-black">
              <Text>
                {filteredResults.length !== 0 ? (
                  `${filteredResults[0]?.token0?.symbol}/${filteredResults[0]?.token1?.symbol}`
                ) : (
                  <PulseLoader color="#ff8e4c" />
                )}
              </Text>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-black">
            <Text>{rewardTokenName}</Text>
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
          <div className="font-semibold text-black">
            <Text>
              <p className="elips">{totalStaked}</p>
            </Text>
          </div>
        </div>
        <div>
          <p className="text-xs text-pink900 mb-[2px] text-black">
            <Text>Your Stake</Text>
          </p>
          <div className="font-semibold text-black">
            <Text>
              <p className="elips">{yourStake}</p>
            </Text>
          </div>
        </div>
        <div>
          <p className="text-xs text-pink900 mb-[2px] text-black">
            <Text>Estimate reward per day</Text>
          </p>

          <div className="font-semibold text-black">
            <Text>
              <p className="elips">{ethers.utils.formatEther(rewardPerDay)}</p>
            </Text>
          </div>
        </div>

        <div>
          <p className="text-xs text-pink900 mb-[2px] text-black">
            <Text>Amount of Rewards</Text>
          </p>
          <div className="font-semibold text-black">
            <Text>
              <p className="elips">{ethers.utils.formatEther(rewardTokenAmount)}</p>
            </Text>
          </div>
        </div>
      </div>
    </Container>
  )
}
