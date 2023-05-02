import React, { useRef } from 'react'
//import { Blockchain } from '@oneverseswap/sdk'
//import { Send, Code, MessageSquare, BarChart2, Book, Twitter, Repeat } from 'react-feather'

import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import styled from 'styled-components'
//import CoinGeckoLogo from '../../assets/images/CoinGecko-32x32.png'

import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

import { ExternalLink } from '../../theme'
//import { ButtonPrimary } from '../Button'

//import useGovernanceToken from '../../hooks/tokens/useGovernanceToken'
//import useBlockchain from '../../hooks/useBlockchain'
//import { ANALYTICS_URLS, DOCS_URLS, BRIDGE_URLS } from '../../constants'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg2};

  padding: 0.15rem 0.5rem;
  border-radius: 9999px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 8.75rem;
  background-color: ${({ theme }) => theme.bg5};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;
  text-align: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -17.25rem;
  `};
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 1rem 1rem;
  color: ${({ theme }) => theme.text2};
  text-decoration: none;
  :hover {
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

export default function Menu() {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          <MenuItem id="link" href={'https://discord.com/invite/c5SnGZWUF8'}>
            Discord
          </MenuItem>

          <MenuItem id="link" href={'https://twitter.com/donksol?s=21&t=H840g90JZa4v2LPWSf689Q'}>
            Twitter
          </MenuItem>

          <MenuItem id="link" href={''}>
            Github
          </MenuItem>

          <MenuItem id="link" href={''}>
            Website
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
