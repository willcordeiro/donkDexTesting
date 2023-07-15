import { BiSearch } from 'react-icons/bi'
import { AiFillCloseCircle } from 'react-icons/ai'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useSearch } from 'react-use-search'
import PoolCard from './PoolCard'
import styled from 'styled-components'
import { Pair, JSBI } from '@donkswap/sdk'
import { usePairs } from 'data/Reserves'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import { useActiveWeb3React } from 'hooks'
import useExtendWithStakedAmount from 'hooks/staking/pools/useExtendWithStakedAmount'

import { useDefaultStakingPools } from 'state/stake/hooks'
import { useTrackedTokenPairs, toV2LiquidityToken } from 'state/user/hooks'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { BIG_INT_ZERO } from '../../constants/'
import { PulseLoader } from 'react-spinners'
import { unwrappedToken } from 'utils/wrappedCurrency'
const predicate = (user: { name: string }, query: string) => user.name.toLowerCase().includes(query.toLowerCase())

const Label = styled.label`
  border: 1px solid #9ca6b9;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e9e9f1' : '#1f202e')};
`

const Input = styled.input`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e9e9f1' : '#1f202e')};
  outline: none;
  border: none;
  font-size: 15px;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};

  ::placeholder {
    font-size: 15px;
    font-weight: 500;
    color: #9ca6b9;
  }
`
const Text = styled.span`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

const Container = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
  height: 100%;
  max-height: 100px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 1.25rem;
  margin-top: 10px;
  min-width: 320px;
`

const PoolCardsContainer = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
  padding: 20px;
  border-radius: 0.5rem;
  height: 100%;
  max-height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  z-index: 2;
  position: relative;
  border: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#d0d0d4' : 'white')} solid 1px;
`

const SelectedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RemovePoolBTN = styled.div`
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`

export default function SelectPool({ farm }: any) {
  const [pool, setPool] = useState('')
  const [isClicked, setIsClicked] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const { account } = useActiveWeb3React()

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

  const pairInfo: any = []

  pairInfo.push(v2PairsWithoutStakedAmount)

  const [data, setdata] = useState<any[]>([])

  const fetchPools = (
    pairInfo: {
      tokenAmounts: any
      pairName: { pairName: any }[]
      liquidityToken: { address: any }
    }[][]
  ) => {
    const newData: any = pairInfo[0].map(item => ({
      id: generateUniqueId(),
      icon: EthereumLogo,
      icon2: EthereumLogo,
      name: item.pairName[0].pairName,
      address: item.liquidityToken.address,
      pair1: item.tokenAmounts[0]?.currency.address,
      pair2: item.tokenAmounts[1]?.currency.address
    }))

    setdata(newData)
  }

  for (let i = 0; i < v2PairsWithoutStakedAmount.length; i++) {
    if (pairInfo[0].length != 0) {
      const obj = []
      obj.push({
        pairName: pairInfo[0][i].token0.symbol + '/' + pairInfo[0][i].token1.symbol
      })
      pairInfo[0][i].pairName = obj
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length === 0) {
        fetchPools(pairInfo)
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [pairInfo])

  const handleClick = () => {
    setIsClicked(true)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsClicked(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  function generateUniqueId() {
    const timestamp = Date.now().toString(36)
    const randomNum = Math.random()
      .toString(36)
      .substr(2, 5)

    return `${timestamp}-${randomNum}`
  }

  const filteredData = data.filter(item => item.id === pool)

  const [filteredUsers, query, handleChange] = useSearch(data, predicate, {
    filter: true,
    debounce: 200
  })

  useEffect(() => {
    farm({
      pool: filteredData[0]
    })
  }, [pool])

  return (
    <>
      <Text>Select a pool</Text>
      <Container>
        {pool == '' ? (
          <div className="flex justify-between">
            <Label
              htmlFor="cardsearch"
              className="flex flex-1 items-center gap-2 p-2 border border-gray-300 rounded-md"
            >
              <BiSearch color="black" size={20} />
              <Input
                type="text"
                id="search"
                value={query}
                onChange={handleChange}
                onClick={handleClick}
                ref={inputRef}
                placeholder="Search for a Pool"
                className="w-full text-sm"
              />
            </Label>
          </div>
        ) : (
          <SelectedContainer>
            <PoolCard data={filteredData[0]} clicked={setIsClicked} isClicked={isClicked} />

            <RemovePoolBTN onClick={() => setPool('')}>
              <AiFillCloseCircle size={30} />
            </RemovePoolBTN>
          </SelectedContainer>
        )}

        {isClicked && (
          <PoolCardsContainer className="grid grid-cols-1 gap-5">
            {data.length !== 0 ? (
              filteredUsers.length !== 0 ? (
                filteredUsers.map((data, index) => (
                  <PoolCard key={index} data={data} func={setPool} clicked={setIsClicked} isClicked={isClicked} />
                ))
              ) : (
                <Text className="text-sm text-center pt-8">There is no pool matched, please try again!</Text>
              )
            ) : (
              <Text className="text-sm text-center pt-8">
                {' '}
                <PulseLoader color="#ff8e4c" size={20} />
              </Text>
            )}
          </PoolCardsContainer>
        )}
      </Container>
    </>
  )
}
