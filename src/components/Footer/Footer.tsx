import React from 'react'
import { discord, github, m, twitter } from '../../assets'

import styled from 'styled-components'

const Container = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#1f202e')};
`

const Span = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

const List = styled.li`
  list-style: none;
  color: black;

  a {
    color: black;
  }
`

export default function Footer() {
  return (
    <Container>
      <footer className="py-24 dark:text-dark900">
        <div className="max-w-6xl w-[90%] mx-auto flex items-start justify-between gap-8 flex-wrap">
          <ul>
            <List className="font-bold text-xl mb-4 dark:text-white">
              <Span>Need help? </Span>
            </List>
            {/* <List className="mb-4 text-sm font-medium">
                      Visit{' '}
                      <a href="/" className="text-orange500 hover:underListne">
                          our support centre
                      </a>{' '}
                      for troubleshooting
                  </List> */}
            <List className="mb-5 text-sm font-medium">
              Join{' '}
              <a
                target="_blank"
                href="https://discord.gg/c5SnGZWUF8"
                className="text-orange500 hover:underListne"
                rel="noreferrer"
              >
                our official Discord
              </a>{' '}
              for dedicated support
            </List>
            <List className="mb-5">
              <ul className="flex items-center gap-3 justify-between w-full">
                <List className="w-10 h-10 rounded-full bg-orange500 p-2">
                  <a target="_blank" href="https://discord.gg/c5SnGZWUF8" rel="noreferrer">
                    <img src={discord} alt="discord" width="24px" />
                  </a>
                </List>
                <List className="w-10 h-10 rounded-full bg-orange500 p-2">
                  <a target="_blank" href="https://twitter.com/donksol?s=21&t=H840g90JZa4v2LPWSf689Q" rel="noreferrer">
                    <img src={twitter} alt="twitter" width="24px" />
                  </a>
                </List>
                <List className="w-10 h-10 rounded-full bg-orange500">
                  <a href="/">
                    <img src={m} alt="m" width="42px" />
                  </a>
                </List>
                <List className="w-10 h-10 rounded-full bg-orange500 p-1">
                  <a href="/">
                    <img src={github} alt="github" width="32px" />
                  </a>
                </List>
              </ul>
            </List>
            {/* <List>
                      <ul className="flex items-center gap-2 text-orange500 font-medium text-sm flex-wrap">
                          <List>
                              <a href="/">Security</a>
                          </List>
                          <List>
                              <a href="/">Developers</a>
                          </List>
                          <List>
                              <a href="/">Privacy</a>
                          </List>
                          <List>
                              <a href="/">Terms of Service</a>
                          </List>
                      </ul>
                  </List> */}
          </ul>
          <div>
            <ul>
              <List className="font-semibold mb-2 dark:text-white">
                <Span>DONK COIN Token</Span>
              </List>
              <List className="hover:underListne mb-2 text-sm">
                <a href="/">Coingecko</a>
              </List>
              <List className="hover:underListne mb-2 text-sm">
                <a href="/">CoinMarketCap</a>
              </List>
            </ul>
            {/* <ul>
                      <List className="font-semibold mb-2 dark:text-white">Analytics</List>
                      <List className="hover:underListne mb-2 text-sm">
                          <a href="/">Token Terminal </a>
                      </List>
                      <List className="hover:underListne mb-2 text-sm">
                          <a href="/">Defi Llama</a>
                      </List>
                      <List className="hover:underListne mb-2 text-sm">
                          <a href="/">Gecko Terminal</a>
                      </List>
                  </ul> */}
          </div>
          {/* <ul>
                  <List className="font-semibold mb-2 dark:text-white">Exchanges</List>
                  <List className="hover:underListne mb-2 text-sm">
                      <a href="/">Binance</a>
                  </List>
                  <List className="hover:underListne mb-2 text-sm">
                      <a href="/">Crypto.com</a>
                  </List>
                  <List className="hover:underListne mb-2 text-sm">
                      <a href="/">Gate.io</a>
                  </List>
                  <List className="hover:underListne mb-2 text-sm">
                      <a href="/">MEXC</a>
                  </List>
                  <List className="hover:underListne mb-2 text-sm">
                      <a href="/">OKX</a>
                  </List>
              </ul> */}
          <ul>
            <List className="font-semibold mb-2 dark:text-white">
              <Span>Business</Span>
            </List>
            <List className="hover:underListne mb-2 text-sm">
              <a href="mailto:donkcoin.relations@gmail.com">Apply for Partnership</a>
            </List>
            <List className="hover:underListne mb-2 text-sm">
              <a href="mailto:donkcoin.relations@gmail.com">Token Liststing</a>
            </List>
            <List className="hover:underListne mb-2 text-sm">
              <a href="mailto:donkcoin.relations@gmail.com">NFT Liststing</a>
            </List>
            <List className="hover:underListne mb-2 text-sm">
              <a href="mailto:donkcoin.relations@gmail.com">Contact Us</a>
            </List>
          </ul>
        </div>
      </footer>
    </Container>
  )
}
