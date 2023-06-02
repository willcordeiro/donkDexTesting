import { Blockchain, Token } from '@donkswap/sdk'
import React, { useEffect, useState } from 'react'
//import React, { useMemo } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import getTokenLogo from '../../utils/getTokenLogo'
import { useActiveWeb3React } from '../../hooks'
//import { useMerkleDistributorContract} from '../../hooks/useContract'
//import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'
import { /* StyledInternalLink, */ TYPE, UniTokenAnimated } from '../../theme'
//import { computeUniCirculation } from '../../utils/computeUniCirculation'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../Staking/Pools/styled'
//import { MouseoverTooltip } from '../Tooltip'
import useBlockchain from '../../hooks/useBlockchain'
//import generateTooltips from '../../utils/generateTooltips'
import { useBlockNumber } from '../../state/application/hooks'
import { useGovernanceTokenDetailsData } from '../../hooks/tokens/useGovernanceTokenDetails'
import Loader from '../Loader'
import { dataPrice } from '../../hooks/useBUSDPrice'
import Big from 'big.js'
import axios from 'axios'
import { userBalance } from '../../hooks/tokens/useGovernanceTokenDetails'
const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(1.84% 0% at 1.84% 0%, ${({ theme }) => theme.tokenButtonGradientStart} 0%, #000 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function GovTokenBalanceContent({ setShowUniBalanceModal }: { setShowUniBalanceModal: any }) {
  const { chainId, account } = useActiveWeb3React()
  const latestBlockNumber = useBlockNumber()
  const blockchain = useBlockchain()
  // const tooltips = generateTooltips(blockchain)

  const govTokenDetails = useGovernanceTokenDetailsData()
  const [govToken, setGovToken] = useState<Token | undefined>(undefined)
  const [govTokenUserDetails, setGovTokenUserDetails] = useState<any>(undefined)
  const [tokenPricing, setTokenPricing] = useState<string>('...')
  const [marketCap, setMarketCap] = useState<string>('...')
  const [usdValue, setUsdValue] = useState<string>('...')
  const [userBalanceUsd, setUserBalanceUsd] = useState<string>('...')

  useEffect(() => {
    let mounted = true

    if (mounted) {
      setGovToken(govTokenDetails?.token)
      setGovTokenUserDetails(account ? govTokenDetails?.users?.[account] : undefined)
    }

    return () => {
      mounted = false
    }
  }, [chainId, latestBlockNumber])

  const zero: any = 0
  useEffect(() => {
    if (dataPrice[0][0] !== zero && tokenPricing === '...') {
      //setting by the pair contract
      const currency0 = Big(dataPrice[0][0])

      const currency1 = Big(dataPrice[0][1])

      const pricing = Big(currency0.div(currency1).toString())

      const rounded = pricing.toFixed(3)

      const marketCalc = Big('25000000')
        .times(rounded)
        .toString()

      setMarketCap(marketCalc)
      setTokenPricing(rounded)
      fetchFindoraValue(rounded)
    }
  }, [dataPrice])

  async function fetchFindoraValue(value: string) {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=findora&vs_currencies=usd'

    axios
      .get(apiUrl)
      .then(response => {
        const amount = new Big(value)
        const usdValue = new Big(response.data.findora.usd)
        const convertedAmount = new Big(amount.times(usdValue))
        const formattedAmount = convertedAmount.toFixed(3)

        const userBalancee: any = new Big(userBalance)

        const formattedUserAmount: any = new Big(userBalancee.times(formattedAmount)).toFixed(2)

        setUsdValue(formattedAmount.toString())
        setUserBalanceUsd(formattedUserAmount.toString())
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your {govToken?.symbol} Breakdown</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowUniBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <UniTokenAnimated width="48px" src={getTokenLogo()} />{' '}
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">Balance:</TYPE.white>
                  <TYPE.white color="white">
                    {govTokenUserDetails?.unlockedBalance?.toFixed(2, { groupSeparator: ',' })} OV / {userBalanceUsd}{' '}
                    USD
                  </TYPE.white>
                </RowBetween>
                {/* 
                <RowBetween>
                  <TYPE.white color="white">
                    <MouseoverTooltip text={tooltips.unlockedRewards}>
                      <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                        🔓
                      </span>
                      Pending Rewards:
                    </MouseoverTooltip>
                  </TYPE.white>
                  {govTokenUserDetails?.claimableUnlocked ? (
                    <TYPE.white color="white">
                      {govTokenUserDetails?.claimableUnlocked?.toFixed(2, { groupSeparator: ',' })}{' '}
                      {govTokenUserDetails?.claimableUnlocked &&
                        govTokenUserDetails?.claimableUnlocked.greaterThan('0') && (
                          <StyledInternalLink onClick={() => setShowUniBalanceModal(false)} to="/staking/pools">
                            (claim)
                          </StyledInternalLink>
                        )}
                    </TYPE.white>
                  ) : (
                    <Loader style={{ marginTop: '0.25rem' }} />
                  )}
                </RowBetween>
                <RowBetween>
                  <TYPE.white color="white">
                    <MouseoverTooltip text={tooltips.lockedRewards}>
                      <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                        🔒
                      </span>
                      Pending Rewards:
                    </MouseoverTooltip>
                  </TYPE.white>
                  {govTokenUserDetails?.claimableLocked ? (
                    <TYPE.white color="white">
                      {govTokenUserDetails?.claimableLocked?.toFixed(2, { groupSeparator: ',' })}{' '}
                      {govTokenUserDetails?.claimableLocked && govTokenUserDetails?.claimableLocked.greaterThan('0') && (
                        <StyledInternalLink onClick={() => setShowUniBalanceModal(false)} to="/staking/pools">
                          (claim)
                        </StyledInternalLink>
                      )}
                    </TYPE.white>
                  ) : (
                    <Loader style={{ marginTop: '0.25rem' }} />
                  )}
                </RowBetween>
                  */}
              </AutoColumn>
            </CardSection>
            <Break />
            {/* 
            <CardSection gap="sm">
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">
                    <MouseoverTooltip text={tooltips.lockedBalance}>Locked Balance:</MouseoverTooltip>
                  </TYPE.white>
                  <TYPE.white color="white">
                    {govTokenPrice && govTokenUserDetails?.lockedBalance ? (
                      <MouseoverTooltip
                        text={
                          govTokenPrice && govTokenUserDetails?.lockedBalance
                            ? `USD: $${govTokenUserDetails?.lockedBalance
                                .multiply(govTokenPrice?.raw)
                                .toSignificant(6, { groupSeparator: ',' })}`
                            : ''
                        }
                      >
                        {govTokenUserDetails?.lockedBalance?.toFixed(2, { groupSeparator: ',' })}
                      </MouseoverTooltip>
                    ) : (
                      <Loader style={{ marginTop: '0.25rem' }} />
                    )}
                  </TYPE.white>
                </RowBetween>

                <RowBetween>
                  <TYPE.white color="white">Total Balance:</TYPE.white>
                  <TYPE.white color="white">
                    {govTokenPrice && govTokenUserDetails?.totalBalance ? (
                      <MouseoverTooltip
                        text={
                          govTokenPrice &&
                          govTokenUserDetails?.totalBalance &&
                          govTokenUserDetails?.totalBalance.greaterThan('0')
                            ? `USD: $${govTokenUserDetails?.totalBalance
                                .multiply(govTokenPrice?.raw)
                                .toSignificant(6, { groupSeparator: ',' })}`
                            : ''
                        }
                      >
                        {govTokenUserDetails?.totalBalance?.toFixed(2, { groupSeparator: ',' })}
                      </MouseoverTooltip>
                    ) : (
                      <Loader style={{ marginTop: '0.25rem' }} />
                    )}
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            */}
            <Break />
          </>
        )}

        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">{govToken?.symbol} in circulation:</TYPE.white>
              {govTokenDetails?.totalCirculatingSupply ? (
                <TYPE.white color="white">
                  {govTokenDetails?.totalCirculatingSupply?.toFixed(0, { groupSeparator: ',' })}
                </TYPE.white>
              ) : (
                <Loader style={{ marginTop: '0.25rem' }} />
              )}
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">{govToken?.symbol} total supply:</TYPE.white>
              {govTokenDetails?.totalSupply ? (
                <TYPE.white color="white">
                  {govTokenDetails?.totalSupply?.toFixed(0, { groupSeparator: ',' })}
                </TYPE.white>
              ) : (
                <Loader style={{ marginTop: '0.25rem' }} />
              )}
            </RowBetween>
          </AutoColumn>
        </CardSection>

        {[Blockchain.ARBITRUM, Blockchain.SEPOLIA].includes(blockchain) && (
          <>
            <Break />
            <CardSection gap="sm">
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">{govToken?.symbol} price:</TYPE.white>
                  {tokenPricing ? (
                    <TYPE.white color="white">
                      {usdValue} USD / {tokenPricing} FRA
                    </TYPE.white>
                  ) : (
                    <Loader style={{ marginTop: '0.25rem' }} />
                  )}
                </RowBetween>

                <RowBetween>
                  <TYPE.white color="white">{govToken?.symbol} circ. market cap:</TYPE.white>
                  {marketCap ? (
                    <TYPE.white color="white">{marketCap} FRA</TYPE.white>
                  ) : (
                    <Loader style={{ marginTop: '0.25rem' }} />
                  )}
                </RowBetween>
              </AutoColumn>
            </CardSection>
          </>
        )}
      </ModalUpper>
    </ContentWrapper>
  )
}
