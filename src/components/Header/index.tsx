import { ChainId } from '@donkswap/sdk'
import React, { useState } from 'react'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'

import { isMobile, isAndroid, isIOS } from 'react-device-detect'

import styled from 'styled-components'

import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalance } from '../../state/wallet/hooks'
import { CardNoise } from '../Staking/Pools/styled'
//import { CountUp } from 'use-count-up'
import { TYPE, ExternalLink } from '../../theme'

import { BlueCard } from '../Card'
import { Moon, Sun } from 'react-feather'
import StakingMenu from '../Staking/Menu'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import ClaimModal from '../claim/ClaimModal'
import { useToggleSelfClaimModal, useShowClaimPopup } from '../../state/application/hooks'
//import { useUserHasAvailableClaim } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { Dots } from '../swap/styleds'
import Modal from '../Modal'
import GovTokenBalanceContent from './GovTokenBalanceContent'
import usePrevious from '../../hooks/usePrevious'
import { BASE_CURRENCY, BLOCKCHAIN } from '../../connectors'
import useGovernanceToken from '../../hooks/tokens/useGovernanceToken'
import { useGovernanceTokenUserAggregatedBalance } from '../../hooks/tokens/useGovernanceTokenDetails'

import { ANALYTICS_URLS } from '../../constants'
import logoLight from '../../assets/images/logo/logo_-_discord_icon_1.png'
import logoDarkOne from '../../assets/images/logo/logo_-_white_bg.png'
import ChainDropDown from 'components/chainDropDown'
import whitepaper from '../../assets/files/DONK-Whitepaper.pdf'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#f1ece9' : '#191924')};
  padding: 1rem;

  padding-bottom: 100px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const Links = styled.a`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  width: fit-content;
  max-width: 170px;
  font-weight: 500;
  color: white;
  text-decoration: none;
  text-decoration: inherit;
  flex-basis: 100%;
  border-radius: 0.375rem;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  padding-top: 7px;
  padding-bottom: 7px;
  background-color: #ff8e4c;
  z-index: 9999;

  :hover {
    opacity: 0.5;
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 0.2rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 5px
    
  `};
`

const WrapperDiv = styled.div`
  display: flex;
  gap: 5px;

  @media (max-width: 1200px) {
    display: block;
    position: relative;
    margin-bottom: 40px;
  }
`

const ChainDropDownDiv = styled.div`
  max-height: 100%;
  @media (max-width: 960px) {
    margin-top: 5px;
  }
`
const WhitepaperDiv = styled.div`
  text-align: left;
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  @media (max-width: 414px) {
    width: 95%;
  }

  @media (max-width: 380px) {
    width: 104%;
  }
`

const HeaderLinks = styled(Row)`
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem 0 1rem 1rem;
    justify-content: flex-end;
`};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 1.5rem;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :hover {
    opacity: 0.8;
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: #614dc9;
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;

  @media (max-width: 436px) {
    position: absolute;
    margin-top: 20px;
  }

  :hover {
    transform: rotate(-5deg);
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#736666' : 'white')};
  text-decoration: none;
  text-decoration: inherit;
  flex-basis: 100%;
  border-radius: 0.375rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 7px;
  padding-bottom: 7px;
  &.${activeClassName} {
    border-radius: 5px;
    font-weight: 500;
    color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'theme.text1' : '#9b9bb0')};
  }

  :hover,
  :focus {
    background-color: rgba(205, 205, 205, 0.416);
    color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'theme.text1' : '#9b9bb0')};
  }

  @media (max-width: 1024px) {
    padding-left: 0rem;
    padding-right: 0rem;
  }
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'theme.text1' : '#9b9bb0')};
  font-size: 16px;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'theme.text1' : '#9b9bb0')};
  }

  :hover,
  :focus {
    color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'theme.text1' : '#9b9bb0')};
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      display: none;
`}
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: white;
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;

  :hover {
    cursor: pointer;
    outline: none;
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

export default function Header() {
  const { chainId, account } = useActiveWeb3React()
  const { t } = useTranslation()

  const mobile = isMobile || isAndroid || isIOS

  const govToken = useGovernanceToken()

  const analyticsUrl = chainId && ANALYTICS_URLS[chainId]

  let logoDark: string
  let logo: string

  switch (BLOCKCHAIN) {
    default:
      logoDark = logoDarkOne
      logo = logoLight
      break
  }

  const userEthBalance = useETHBalance()

  // const [isDark] = useDarkModeManager()
  const [darkMode, toggleDarkMode] = useDarkModeManager()

  const toggleClaimModal = useToggleSelfClaimModal()

  //const availableClaim: boolean = useUserHasAvailableClaim(account)
  const availableClaim = false

  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  const showClaimPopup = useShowClaimPopup()

  const aggregateBalance = useGovernanceTokenUserAggregatedBalance()
  const countUpValue = aggregateBalance?.toFixed(0) ?? '0'
  const countUpValuePrevious = usePrevious(countUpValue) ?? '0'

  function openWhitepaper() {
    window.open(whitepaper, '_blank')
  }

  return (
    <HeaderFrame>
      <ClaimModal />
      <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <GovTokenBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal>
      <HeaderRow>
        <NavLink id={`swap-nav-link`} to={'/'}>
          <UniIcon>
            <img width={'45x'} src={darkMode ? logoDark : logo} alt="logo" />
          </UniIcon>
        </NavLink>
        <HeaderLinks>
          <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
            {t('Trade')}
          </StyledNavLink>

          <StyledNavLink
            id={`pool-nav-link`}
            to={'/pool'}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/create') ||
              pathname.startsWith('/find')
            }
          >
            {t('pool')}
          </StyledNavLink>

          <StyledNavLink id={`swap-nav-link`} to={'/stake'}>
            {t('Stake')}
          </StyledNavLink>

          <StyledNavLink id={`swap-nav-link`} to={'/farm'}>
            {t('Farm')}
          </StyledNavLink>

          <StyledNavLink id={`mint-nav-link`} to={'/mint'}>
            {t('Mint')}
          </StyledNavLink>

          {account === '0x9cf363fF78B6B6Caf919886A28f47F1fA10a52e1' ? (
            <StyledNavLink id={`swap-nav-link`} to={'/adminPainel'}>
              {t('AP')}
            </StyledNavLink>
          ) : (
            ''
          )}

          <StakingMenu />
          {!mobile && analyticsUrl && analyticsUrl !== '' && (
            <StyledExternalLink id={`analytics-nav-link`} href={analyticsUrl}>
              Charts <span style={{ fontSize: '11px' }}>↗</span>
            </StyledExternalLink>
          )}
        </HeaderLinks>
      </HeaderRow>

      <HeaderControls>
        <WrapperDiv>
          <WhitepaperDiv>
            <Links
              onClick={() => {
                openWhitepaper()
              }}
            >
              WHITEPAPER
            </Links>
          </WhitepaperDiv>
          <ChainDropDownDiv>
            <ChainDropDown />
          </ChainDropDownDiv>{' '}
        </WrapperDiv>
        <HeaderElement>
          {availableClaim && !showClaimPopup && (
            <UNIWrapper onClick={toggleClaimModal}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                <TYPE.white padding="0 2px">
                  {claimTxn && !claimTxn?.receipt ? (
                    <Dots>Claiming {govToken?.symbol}</Dots>
                  ) : (
                    `Claim ${govToken?.symbol}`
                  )}
                </TYPE.white>
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}

          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(4)} {BASE_CURRENCY.symbol}
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          <StyledMenuButton onClick={() => toggleDarkMode()}>
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </StyledMenuButton>
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}
