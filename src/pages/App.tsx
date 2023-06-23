import React, { Suspense } from 'react'
import { Route, Switch, useLocation, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Blockchain } from '@donkswap/sdk'
//import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
//import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
//import Earn from './Staking/Pools'
//import EarnArchived from './Staking/Pools/Archived'
import Manage from './Staking/Pools/Manage'
//import SmartChefSingleEarn from './Staking/SmartChef/Single'
//import SmartChefSingleEarnArchived from './Staking/SmartChef/Single/Archived'
import SmartChefSingleManage from './Staking/SmartChef/Single/Manage'
//import SmartChefLPEarn from './Staking/SmartChef/LiquidityPools'
//import SmartChefLPEarnArchived from './Staking/SmartChef/LiquidityPools/Archived'
import SmartChefLPManage from './Staking/SmartChef/LiquidityPools/Manage'
//import Pit from './Staking/Pit'
//import Unlock from './Staking/Unlock'
import MigrateV1 from './MigrateV1'
import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange'
import RemoveV1Exchange from './MigrateV1/RemoveV1Exchange'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
//import Vote from './Vote'
import VotePage from './Vote/VotePage'
//import { PIT_SETTINGS } from '../constants'
//import { useActiveWeb3React } from '../hooks'
//import usePlatformName from '../hooks/usePlatformName'
import useBlockchain from '../hooks/useBlockchain'
import Home from './home/Home'
import Footer from 'components/Footer/Footer'
import DonkStaking from '../pages/DonkStaking/index'
import DonkToken from './DonkToken'
import Farm from './Farm'
import ManageFarm from './manageFarm'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import { useWeb3React } from '@web3-react/core'
import CreateFarm from './CreatFarm'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;

  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#f1ece9' : '#191924')};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
  padding-top: 100px;
  padding-bottom: 100px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};
  align-items: ${({ alignItems }) => alignItems};
  z-index: 1;
`

BodyWrapper.propTypes = {
  alignItems: PropTypes.string
}

const Marginer = styled.div`
  margin-top: 5rem;
`

const FindContainer = styled.div`
  align-items: center;
`
function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}

export default function App() {
  // const { chainId } = useActiveWeb3React()
  const blockchain = useBlockchain()
  // const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined
  /*const platformName = usePlatformName()

  useEffect(() => {
    document.title = platformName
  }, [platformName])*/
  //const { account, library } = useWeb3React()
  const location = useLocation()

  const adminVerification = () => {
    const user = true //Admin wallet

    return user
  }

  return (
    <Suspense fallback={null}>
      <ToastContainer />
      <Route />
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper alignItems={`${location.pathname == '/find' ? 'center' : ''}`}>
          <Popups />
          <Polling />
          <TopLevelModals />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/" component={Home} />
              <Route exact path="/swap" component={adminVerification() ? Swap : () => <Redirect to="/" />} />
              <Route
                exact
                strict
                path="/claim"
                component={adminVerification() ? OpenClaimAddressModalAndRedirectToSwap : () => <Redirect to="/" />}
              />
              <Route
                exact
                strict
                path="/swap/:outputCurrency"
                component={adminVerification() ? RedirectToSwap : () => <Redirect to="/" />}
              />
              <Route
                exact
                strict
                path="/send"
                component={adminVerification() ? RedirectPathToSwapOnly : () => <Redirect to="/" />}
              />
              <Route
                exact
                strict
                path="/find"
                component={adminVerification() ? PoolFinder : () => <Redirect to="/" />}
              />
              <Route exact strict path="/pool" component={adminVerification() ? Pool : () => <Redirect to="/" />} />
              <Route
                exact
                strict
                path="/stake"
                component={adminVerification() ? DonkStaking : () => <Redirect to="/" />}
              />
              <Route
                exact
                strict
                path="/stake/token"
                component={adminVerification() ? DonkToken : () => <Redirect to="/" />}
              />
              <Route exact strict path="/Farm" component={adminVerification() ? Farm : () => <Redirect to="/" />} />
              <Route path="/farm/manage/:id" component={adminVerification() ? ManageFarm : () => <Redirect to="/" />} />
              <Route path="/farm/create" component={adminVerification() ? CreateFarm : () => <Redirect to="/" />} />
              {/*  
              <Route exact strict path="/staking/pools" component={Earn} />
              <Route exact strict path="/staking/pools/archived" component={EarnArchived} />
               */}
              {/*  
              {[Blockchain.HARMONY, Blockchain.BINANCE_SMART_CHAIN].includes(blockchain) && (
                <Route exact strict path="/staking/single" component={SmartChefSingleEarn} />
              )}
              {[Blockchain.HARMONY, Blockchain.BINANCE_SMART_CHAIN].includes(blockchain) && (
                <Route exact strict path="/staking/single/archived" component={SmartChefSingleEarnArchived} />
              )}
              */}
              {/* 
              <Route exact strict path="/staking/bridge" render={props => <SmartChefLPEarn category={'bridge'} />} />

              <Route
                exact
                strict
                path="/staking/bridge/archived"
                render={props => <SmartChefLPEarnArchived category={'bridge'} />}
              />
      */}
              {/*  {blockchain === Blockchain.HARMONY && (
                <Route
                  exact
                  strict
                  path="/staking/community"
                  render={props => <SmartChefLPEarn category={'community'} />}
                />
              )}
              
              {blockchain === Blockchain.HARMONY && (
                <Route
                  exact
                  strict
                  path="/staking/community/archived"
                  render={props => <SmartChefLPEarnArchived category={'community'} />}
                />
              )}
              */}
              {/*
              <Route exact strict path={'/staking' + pitSettings?.path} component={Pit} />
              */}
              {/*
              <Route exact strict path="/staking/unlock" component={Unlock} />
              
              { /* blockchain === Blockchain.ETHEREUM && <Route exact strict path="/vote" component={Vote} />  */}
              <Route
                exact
                strict
                path="/create"
                component={adminVerification() ? RedirectToAddLiquidity : () => <Redirect to="/" />}
              />
              <Route exact path="/add" component={adminVerification() ? AddLiquidity : () => <Redirect to="/" />} />
              <Route
                exact
                path="/add/:currencyIdA"
                component={adminVerification() ? RedirectOldAddLiquidityPathStructure : () => <Redirect to="/" />}
              />
              <Route
                exact
                path="/add/:currencyIdA/:currencyIdB"
                component={adminVerification() ? RedirectDuplicateTokenIds : () => <Redirect to="/" />}
              />
              <Route
                exact
                strict
                path="/remove/v1/:address"
                component={adminVerification() ? RemoveV1Exchange : () => <Redirect to="/" />}
              />
              <Route
                exact
                strict
                path="/remove/:tokens"
                component={adminVerification() ? RedirectOldRemoveLiquidityPathStructure : () => <Redirect to="/" />}
              />
              <Route
                exact
                strict
                path="/remove/:currencyIdA/:currencyIdB"
                component={adminVerification() ? RemoveLiquidity : () => <Redirect to="/" />}
              />
              <Route
                exact
                strict
                path="/migrate/v1"
                component={adminVerification() ? MigrateV1 : () => <Redirect to="/" />}
              />
              <Route
                exact
                strict
                path="/migrate/v1/:address"
                component={adminVerification() ? MigrateV1Exchange : () => <Redirect to="/" />}
              />
              <Route
                exact
                strict
                path="/staking/pools/:currencyIdA/:currencyIdB"
                component={adminVerification() ? Manage : () => <Redirect to="/" />}
              />
              {[Blockchain.HARMONY].includes(blockchain) && (
                <Route
                  exact
                  strict
                  path="/staking/single/:address"
                  component={adminVerification() ? SmartChefSingleManage : () => <Redirect to="/" />}
                />
              )}
              {blockchain === Blockchain.HARMONY && (
                <Route
                  exact
                  strict
                  path="/staking/:category/:address"
                  component={adminVerification() ? SmartChefLPManage : () => <Redirect to="/" />}
                />
              )}
              {blockchain === Blockchain.ETHEREUM && (
                <Route
                  exact
                  strict
                  path="/vote/:id"
                  component={adminVerification() ? VotePage : () => <Redirect to="/" />}
                />
              )}
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
        </BodyWrapper>
      </AppWrapper>
      <Footer />
    </Suspense>
  )
}
