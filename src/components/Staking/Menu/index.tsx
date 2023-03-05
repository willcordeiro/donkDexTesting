import React, { useRef } from 'react'
//import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
//import { ChainId } from '@oneverseswap/sdk'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../../state/application/hooks'
import { PIT_SETTINGS /* NEST_SETTINGS, UNLOCKING_STARTS */ } from '../../../constants'
import { useActiveWeb3React } from '../../../hooks'
//import { useBlockNumber } from '../../../state/application/hooks'

//import { ExternalLink } from '../../theme'

/*const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`*/

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 38px;
  border: solid 1px ${({ theme }) => theme.text2};

  padding: 0.15rem 0.9rem 0.15rem 0.5rem;
  margin: 0 12px;
  border-radius: 5px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text2};
  font-weight: 600;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: #7dcfb6;
    color: #000;
    border: none;
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 8.75rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: -2rem;
  z-index: 100;
  font-weight: 500;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: 3rem;
    right: 0;
  `};
`

/*const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

const MenuItemLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  margin-right: 8px;
`*/

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
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0.5rem 0.5rem;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 5px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

export default function StakingMenu() {
  const { chainId } = useActiveWeb3React()
  const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined
  //const nestSettings = chainId ? NEST_SETTINGS[chainId] : undefined

  //const unlockingStarts = chainId ? UNLOCKING_STARTS[chainId] : undefined
  //const currentBlock = useBlockNumber()

  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.STAKING_MENU)
  const toggle = useToggleModal(ApplicationModal.STAKING_MENU)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.25rem' }}>
          🚀
        </span>
        Staking
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          {/*
          <StyledNavLink id={`stake-nav-link`} to={'/staking/pools'}>
            Pools
          </StyledNavLink>
          */}
          <StyledNavLink id={`stake-nav-link`} to={`/staking${pitSettings?.path}`}>
            {pitSettings?.name}
          </StyledNavLink>
          {/*
          {chainId &&
            [ChainId.HARMONY_TESTNET, ChainId.HARMONY_MAINNET, ChainId.BSC_MAINNET, ChainId.BSC_TESTNET].includes(
              chainId
            ) &&
            <StyledNavLink id={`stake-nav-link`} to={'/staking/single'}>
                {nestSettings?.name}
              </StyledNavLink>
            
           }
            */}
          {/*
          {chainId &&
            [ChainId.HARMONY_TESTNET, ChainId.HARMONY_MAINNET].includes(chainId) &&
            
            <StyledNavLink id={`stake-nav-link`} to={'/staking/community'}>
              Community
            </StyledNavLink>
             }
               */}
          {/* 
          {chainId && [ChainId.FINDORA, ChainId.GOERLI, ChainId.ANVILTESTNET].includes(chainId) && (
            <StyledNavLink id={`stake-nav-link`} to={'/staking/bridge'}>
              Bridge
            </StyledNavLink>
          )}
          */}
          {/*
          {chainId &&
            currentBlock &&
            unlockingStarts &&
            currentBlock >= unlockingStarts &&
          
            <StyledNavLink id={`stake-nav-link`} to={'/staking/unlock'}>
              Unlock
            </StyledNavLink>
            }
            */}
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
