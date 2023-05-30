import { JSBI, Pair, Percent, TokenAmount } from '@donkswap/sdk'
import { darken } from 'polished'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'
import styled from 'styled-components'
import { useTotalSupply } from '../../data/TotalSupply'

import { useActiveWeb3React } from '../../hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { TYPE } from '../../theme'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { ButtonPrimary } from '../Button'

import Card, { GreyCard, LightCard } from '../Card'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween, RowFixed, AutoRow } from '../Row'
import { Dots } from '../swap/styleds'
import { BIG_INT_ZERO } from '../../constants'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }
`
const StyledPositionCard = styled(LightCard)`
  border: none;
  background: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#f1ece9' : '#191924')};
  position: relative;
  overflow: hidden;
  min-width: 800px;
  :hover {
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'rgb(232 226 222)' : '#474a66')};
  }
`

const Text2 = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

interface PositionCardProps {
  pair: Pair
  showUnwrapped?: boolean
  border?: string
  stakedBalance?: TokenAmount // optional balance to indicate that liquidity is deposited in mining pool
}

export function MinimalPositionCard({ pair, showUnwrapped = false, border }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false)
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, JSBI.BigInt(0)) ? (
        <GreyCard border={border}>
          <AutoColumn gap="12px">
            <FixedHeightRow>
              <RowFixed>
                <Text fontWeight={500} fontSize={16}>
                  <Text2> Your position</Text2>
                </Text>
              </RowFixed>
            </FixedHeightRow>
            <FixedHeightRow onClick={() => setShowMore(!showMore)}>
              <RowFixed>
                <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin={true} size={20} />
                <Text fontWeight={500} fontSize={20}>
                  <Text2>
                    {currency0.symbol}/{currency1.symbol}
                  </Text2>
                </Text>
              </RowFixed>
              <RowFixed>
                <Text fontWeight={500} fontSize={20}>
                  <Text2> {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text2>
                </Text>
              </RowFixed>
            </FixedHeightRow>

            <FixedHeightRow>
              <Text fontSize={16} fontWeight={500}>
                <Text2> Your pool share:</Text2>
              </Text>
              <Text fontSize={16} fontWeight={500}>
                <Text2>{poolTokenPercentage ? poolTokenPercentage.toFixed(6) + '%' : '-'}</Text2>
              </Text>
            </FixedHeightRow>
            <FixedHeightRow>
              <Text fontSize={16} fontWeight={500}>
                <Text2>{currency0.symbol}:</Text2>
              </Text>
              {token0Deposited ? (
                <RowFixed>
                  <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                    <Text2> {token0Deposited?.toSignificant(6)}</Text2>
                  </Text>
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>
            <FixedHeightRow>
              <Text fontSize={16} fontWeight={500}>
                <Text2> {currency1.symbol}:</Text2>
              </Text>
              {token1Deposited ? (
                <RowFixed>
                  <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                    <Text2> {token1Deposited?.toSignificant(6)}</Text2>
                  </Text>
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>
          </AutoColumn>
        </GreyCard>
      ) : (
        <LightCard>
          <TYPE.subHeader style={{ textAlign: 'center' }}>
            <span role="img" aria-label="wizard-icon">
              ⭐️
            </span>{' '}
            By adding liquidity you&apos;ll earn 0.2% of all trades on this pair proportional to your share of the pool.
            Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.
          </TYPE.subHeader>
        </LightCard>
      )}
    </>
  )
}

export default function FullPositionCard({ pair, border, stakedBalance }: any) {
  const { account } = useActiveWeb3React()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userDefaultPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  // if staked balance balance provided, add to standard liquidity amount
  const userPoolBalance = stakedBalance ? userDefaultPoolBalance?.add(stakedBalance) : userDefaultPoolBalance

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false)
        ]
      : [undefined, undefined]

  // const backgroundColor = useColor(pair?.token0)

  return (
    <StyledPositionCard border={border}>
      <table className="w-full cursor-pointer" style={{ tableLayout: 'auto' }} onClick={() => setShowMore(!showMore)}>
        <thead>
          <tr>
            <th className="text-left font-medium text-[rgb(150,150,150)]">POOL NAME</th>
            <th className="text-center font-medium text-[rgb(150,150,150)]">LIQUIDITY</th>
            <th className="text-center font-medium text-[rgb(150,150,150)]">VOLUME (24H)</th>
            <th className="text-center font-medium text-[rgb(150,150,150)]">FEES (24H)</th>
            <th className="text-right font-medium text-[rgb(150,150,150)]">APR (24H)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left flex items-center gap-2">
              <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={27} />
              <Text fontWeight={600} fontSize={14} color={'black'}>
                <Text2>
                  {' '}
                  {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}
                </Text2>
              </Text>
              <span className="px-2 py-[6px] text-xs bg-[#dbdbdb91]">2.08%</span>
            </td>
            <td className="text-center">
              <Text fontWeight={600} fontSize={14} color={'black'}>
                <Text2>{!currency0 || !currency1 ? <Dots>Loading</Dots> : `$345,564,839`}</Text2>
              </Text>
            </td>
            <td className="text-center">
              <Text fontWeight={600} fontSize={14} color={'black'}>
                <Text2> {!currency0 || !currency1 ? <Dots>Loading</Dots> : `$67`}</Text2>
              </Text>
            </td>
            <td className="text-center">
              <Text fontWeight={600} fontSize={14} color={'black'}>
                <Text2> {!currency0 || !currency1 ? <Dots>Loading</Dots> : `24.45%`}</Text2>
              </Text>
            </td>
            <td className="text-center">
              <Text fontWeight={600} fontSize={14} color={'black'}>
                <Text2> {!currency0 || !currency1 ? <Dots>Loading</Dots> : `7.90%`}</Text2>
              </Text>
            </td>
          </tr>
        </tbody>
      </table>

      <AutoColumn>
        {showMore && (
          <AutoRow gap="8px">
            <FixedHeightRow>
              <Text fontSize={16} fontWeight={500}>
                <Text2> Your total pool tokens:</Text2>
              </Text>
              <Text fontSize={16} fontWeight={500}>
                <Text2> {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text2>
              </Text>
            </FixedHeightRow>
            {stakedBalance && (
              <FixedHeightRow>
                <Text fontSize={16} fontWeight={500}>
                  <Text2> Pool tokens in rewards pool:</Text2>
                </Text>
                <Text fontSize={16} fontWeight={500}>
                  <Text2> {stakedBalance.toSignificant(4)}</Text2>
                </Text>
              </FixedHeightRow>
            )}
            <FixedHeightRow>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  <Text2> Pooled {currency0.symbol}:</Text2>
                </Text>
              </RowFixed>
              {token0Deposited ? (
                <RowFixed>
                  <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                    <Text2> {token0Deposited?.toSignificant(6)}</Text2>
                  </Text>
                  <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={currency0} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>

            <FixedHeightRow>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  <Text2> Pooled {currency1.symbol}:</Text2>
                </Text>
              </RowFixed>
              {token1Deposited ? (
                <RowFixed>
                  <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                    <Text2> {token1Deposited?.toSignificant(6)}</Text2>
                  </Text>
                  <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={currency1} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>

            <FixedHeightRow>
              <Text fontSize={16} fontWeight={500}>
                <Text2> Your pool share:</Text2>
              </Text>
              <Text fontSize={16} fontWeight={500}>
                <Text2>
                  {' '}
                  {poolTokenPercentage
                    ? (poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)) + '%'
                    : '-'}
                </Text2>
              </Text>
            </FixedHeightRow>

            <RowBetween marginTop="10px">
              <ButtonPrimary
                padding="8px"
                borderRadius="8px"
                as={Link}
                to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                width="48%"
              >
                Add
              </ButtonPrimary>
              <ButtonPrimary
                padding="8px"
                borderRadius="8px"
                as={Link}
                width="48%"
                to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}
              >
                Remove
              </ButtonPrimary>
            </RowBetween>

            {stakedBalance && JSBI.greaterThan(stakedBalance.raw, BIG_INT_ZERO) && (
              <ButtonPrimary
                padding="8px"
                borderRadius="8px"
                as={Link}
                to={`/staking/pools/${currencyId(currency0)}/${currencyId(currency1)}`}
                width="100%"
              >
                Manage Liquidity in Rewards Pool
              </ButtonPrimary>
            )}
          </AutoRow>
        )}
      </AutoColumn>
    </StyledPositionCard>
  )
}
