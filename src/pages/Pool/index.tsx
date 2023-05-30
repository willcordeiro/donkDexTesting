import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair, JSBI } from '@donkswap/sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'

import FullPositionCard from '../../components/PositionCard'
import { useUserHasLiquidityInAllTokens } from '../../data/V1'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { StyledInternalLink, ExternalLink, TYPE, HideSmall } from '../../theme'
import { Text } from 'rebass'
import Card from '../../components/Card'
import { RowBetween, RowFixed } from '../../components/Row'
import { ButtonPrimary, ButtonSecondary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import { Dots } from '../../components/swap/styleds'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/Staking/Pools/styled'
import { useDefaultStakingPools } from '../../state/stake/hooks'
import { BIG_INT_ZERO, ANALYTICS_URLS } from '../../constants'

import { Blockchain } from '@donkswap/sdk'
import useBlockchain from '../../hooks/useBlockchain'
import baseCurrencies from '../../utils/baseCurrencies'
import useExtendWithStakedAmount from '../../hooks/staking/pools/useExtendWithStakedAmount'
import GraphSection from './GraphSection'

import { useSearch } from 'react-use-search'

import { BiSearch } from 'react-icons/bi'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const VoteCard = styled(DataCard)`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, black 0%, black 100%);
  overflow: hidden;
`

const ButtonRow = styled(RowFixed)`
  gap: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
  `};
`

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  border-radius: 0.375rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

const ResponsiveButtonSecondary = styled(ButtonSecondary)`
  width: fit-content;
  border-radius: 0.375rem;
  border: solid rgb(209 213 219) 1px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

const EmptyProposals = styled.div`
  border: 1px solid ${({ theme }) => theme.text4};
  padding: 16px 12px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Label = styled.label`
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  border: rgb(209 213 219) solid 1px;
  padding: 0.8rem;
`

const Input = styled.input`
  font-size: 100%;
  margin: 0px;
  padding: 0px;
  width: 100%;
  background-color: transparent;
  outline: transparent solid 2px;
  border: none;
`

const Text2 = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account, chainId } = useActiveWeb3React()
  const blockchain = useBlockchain()

  const baseCurrency = baseCurrencies(chainId)[0]

  const addLiquidityUrl = `/add/${baseCurrency.symbol}`
  const createPoolUrl = `/create/${baseCurrency.symbol}`

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()

  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () => tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) => liquidityToken.address),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))

  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  // show liquidity even if its deposited in rewards contract
  let stakingInfo = useDefaultStakingPools(true)
  stakingInfo = useExtendWithStakedAmount(stakingInfo)
  const stakingInfosWithBalance = stakingInfo?.filter(
    pool => pool.stakedAmount && JSBI.greaterThan(pool.stakedAmount.raw, BIG_INT_ZERO)
  )
  const stakingPairs = usePairs(stakingInfosWithBalance?.map(stakingInfo => stakingInfo.tokens))

  // remove any pairs that also are included in pairs with stake in mining pool
  const v2PairsWithoutStakedAmount = allV2PairsWithLiquidity.filter(v2Pair => {
    return (
      stakingPairs
        ?.map(stakingPair => stakingPair[1])
        .filter(stakingPair => stakingPair?.liquidityToken.address === v2Pair.liquidityToken.address).length === 0
    )
  })

  const analyticsUrl = chainId && ANALYTICS_URLS[chainId]

  const pairInfo: any = []

  pairInfo.push(v2PairsWithoutStakedAmount)

  for (let i = 0; i < v2PairsWithoutStakedAmount.length; i++) {
    {
      if (pairInfo[0].length != 0) {
        const obj = []
        obj.push({
          pairName: pairInfo[0][i].tokenAmounts[0].token.symbol + ' ' + pairInfo[0][i].tokenAmounts[1].token.symbol
        })
        pairInfo[0][i].pairName = obj
      }
    }
  }

  const predicate: any = (v2Pair: any, query: any) => {
    return v2Pair.pairName[0].pairName.toLowerCase().includes(query.toLowerCase())
  }

  const [filteredUsers, query, handleChange] = useSearch(pairInfo[0], predicate, {
    filter: true,
    debounce: 200
  })

  return (
    <>
      <div className="min-h-[80vh]">
        <section className="max-w-6xl w-[90%] mx-auto">
          <header className="flex items-center justify-between  gap-1">
            <div>
              <h2 className="font-semibold sm:text-4xl text-3xl text-left text-black">
                <Text2>Pool</Text2>
              </h2>
              <p className="text-sm font-medium text-left	">
                <Text2>Provide liquidity and earn fees</Text2>
              </p>
            </div>
          </header>
          <div className="flex gap-10 max-md:flex-wrap">
            <GraphSection />
          </div>
          <div className="flex items-center gap-3 mt-3 mb-10 max-lg:flex-col-reverse">
            <Label>
              <BiSearch color="black" />
              <Input type="text" placeholder="Search by pool name" id="search" value={query} onChange={handleChange} />
            </Label>
            <ButtonRow>
              <ResponsiveButtonSecondary as={Link} padding="13px 8px" to={createPoolUrl}>
                <Text fontWeight={500} fontSize={13} color={'gray'}>
                  Create a New Pool
                </Text>
              </ResponsiveButtonSecondary>
              <ResponsiveButtonPrimary id="join-pool-button" as={Link} padding="13px 8px" to={addLiquidityUrl}>
                <Text fontWeight={500} fontSize={13}>
                  Add Liquidity
                </Text>
              </ResponsiveButtonPrimary>
            </ButtonRow>
          </div>

          <div className="overflow-x-auto">
            {filteredUsers.length !== 0 ? (
              filteredUsers.map((v2Pair: any, index) => <FullPositionCard key={index} pair={v2Pair} />)
            ) : (
              <EmptyProposals>
                <TYPE.body color={theme.text3} textAlign="center">
                  No liquidity found.
                </TYPE.body>
              </EmptyProposals>
            )}
          </div>

          <PageWrapper>
            <SwapPoolTabs active={'pool'} />
            <VoteCard>
              <CardBGImage />
              <CardNoise />
              <CardBGImage />
              <CardNoise />
            </VoteCard>

            <AutoColumn gap="lg" justify="center">
              <AutoColumn gap="lg" style={{ width: '100%' }}>
                {/* 
                <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
                  <HideSmall>
                    <TYPE.mediumHeader style={{ marginTop: '0.5rem', justifySelf: 'flex-start' }}>
                      Your liquidity
                    </TYPE.mediumHeader>
                  </HideSmall>
                  <ButtonRow>
                    <ResponsiveButtonSecondary as={Link} padding="6px 8px" to={createPoolUrl}>
                      Create a pair
                    </ResponsiveButtonSecondary>
                    <ResponsiveButtonPrimary
                      id="join-pool-button"
                      as={Link}
                      padding="6px 8px"
                      borderRadius="12px"
                      to={addLiquidityUrl}
                    >
                      <Text fontWeight={500} fontSize={16}>
                        Add Liquidity
                      </Text>
                    </ResponsiveButtonPrimary>
                  </ButtonRow>
                </TitleRow>
              */}
                {!account ? (
                  <Card padding="40px">
                    <TYPE.body color={theme.text3} textAlign="center">
                      Connect to a wallet to view your liquidity.
                    </TYPE.body>
                  </Card>
                ) : v2IsLoading ? (
                  <EmptyProposals>
                    <TYPE.body color={theme.text3} textAlign="center">
                      <Dots>Loading</Dots>
                    </TYPE.body>
                  </EmptyProposals>
                ) : allV2PairsWithLiquidity?.length > 0 || stakingPairs?.length > 0 ? (
                  <>
                    {analyticsUrl && analyticsUrl !== '' && (
                      <ButtonSecondary>
                        <RowBetween>
                          <ExternalLink href={`${analyticsUrl}/account/${account}`}>
                            Account analytics and accrued fees
                          </ExternalLink>
                          <span> ↗</span>
                        </RowBetween>
                      </ButtonSecondary>
                    )}
                    {/* 
                    {v2PairsWithoutStakedAmount.map(v2Pair => (
                      <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                    ))}
                    */}
                    {stakingPairs.map(
                      (stakingPair, i) =>
                        stakingPair[1] && ( // skip pairs that arent loaded
                          <FullPositionCard
                            key={stakingInfosWithBalance[i].pid}
                            pair={stakingPair[1]}
                            stakedBalance={stakingInfosWithBalance[i].stakedAmount}
                          />
                        )
                    )}
                  </>
                ) : (
                  ''
                )}

                <AutoColumn justify={'center'} gap="md">
                  <Text textAlign="center" fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }}>
                    {hasV1Liquidity ? 'Viperswap V1 liquidity found!' : "Don't see a pool you joined?"}{' '}
                    <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                      {hasV1Liquidity ? 'Migrate now.' : 'Import it.'}
                    </StyledInternalLink>
                  </Text>
                </AutoColumn>
              </AutoColumn>
            </AutoColumn>
          </PageWrapper>
        </section>
      </div>
    </>
  )
}
