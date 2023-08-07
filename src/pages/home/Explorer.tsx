import React from 'react'
import { Link } from 'react-router-dom'
import { a, b, c, d, e } from '../../assets'
import styled from 'styled-components'
import anyLogo from '../../assets/AnyToAny_Icon_Logo.png'
const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

const Img = styled.img`
  transition: 0.3s cubic-bezier(0.6, 0.03, 0.28, 0.98);
  transform: scale(0.9);

  :hover {
    transform: scale(1);
    transition: 0.3s cubic-bezier(0.6, 0.03, 0.28, 0.98);
  }
`

const CardTrade = styled(Link)`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'hsl(120, 34%, 86%)' : '#638b65')};
  border-radius: 0.75rem;

  :hover {
    border: solid 1px ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#638b65' : 'white')};
  }
`

const CardLiquidity = styled(Link)`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'hsl(195, 75%, 89%)' : '#4392ab')};
  border-radius: 0.75rem;
  transition: all 300ms ease-in-out;
  :hover {
    border: solid 1px ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#4392ab' : 'white')};
  }
`

const CardFarm = styled(Link)`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'hsl(44, 77%, 88%)' : '#a58c4e')};
  border-radius: 0.75rem;
  transition: all 300ms ease-in-out;
  :hover {
    border: solid 1px ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#a58c4e' : 'white')};
  }
`

const CardStake = styled(Link)`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'hsl(345, 60%, 92%)' : '#74434f')};
  border-radius: 0.75rem;
  transition: all 300ms ease-in-out;
  :hover {
    border: solid 1px ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#74434f' : 'white')};
  }
`

const CardNFT = styled(Link)`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'hsl(240, 90%, 96%)' : '#2f3146')};
  border-radius: 0.75rem;
  transition: all 300ms ease-in-out;
  :hover {
    border: solid 1px ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
  }
`
const CardANY = styled.a`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'hsl(240, 90%, 96%)' : '#2f3146')};
  border-radius: 0.75rem;
  transition: all 300ms ease-in-out;
  :hover {
    border: solid 1px ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
  }
`

export default function Explore() {
  return (
    <section className="max-w-5xl mx-auto py-24 w-[90%]">
      <h2 className="text-2xl font-medium mb-10 text-black">
        <Text>Explore Donk Coin Finance</Text>
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 auto-rows-fr gap-5">
        <CardTrade
          to="/trade"
          className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-transparent    group transition-all duration-300"
        >
          <Img src={e} className="w-[140px] group-hover:scale-110 duration-300 transition-all" alt="a" />
          <p className="mt-5 font-semibold text-black">
            <Text>Trade</Text>
          </p>
        </CardTrade>

        <CardLiquidity
          to="/pool"
          className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-transparent   group transition-all duration-300 "
        >
          <Img src={b} className="w-[140px] group-hover:scale-110 duration-300 transition-all" alt="a" />
          <p className="mt-5 font-semibold text-black">
            <Text>Provide Liquidity</Text>
          </p>
        </CardLiquidity>

        <CardFarm
          to="/farm"
          className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-transparent   group transition-all duration-300 "
        >
          <Img src={c} className="w-[140px] group-hover:scale-110 duration-300 transition-all" alt="a" />
          <p className="mt-5 font-semibold text-black">
            <Text>Farm</Text>
          </p>
        </CardFarm>

        <CardStake
          to="/stake"
          className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-transparent   group transition-all duration-300 "
        >
          <Img src={d} className="w-[140px] group-hover:scale-110 duration-300 transition-all" alt="a" />
          <p className="mt-5 font-semibold text-black">
            <Text>Stake</Text>
          </p>
        </CardStake>
        <CardNFT
          to="/NFTs"
          className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-transparent   group transition-all duration-300 "
        >
          <Img src={a} className="w-[140px]  group-hover:scale-110 duration-300 transition-all" alt="a" />
          <p className="mt-5 font-semibold text-black">
            <Text>Trade NFTs</Text>
          </p>
          <Text>Launches December 25th</Text>
        </CardNFT>

        <CardANY
          href="https://anytoany.io/alpha?source=0x84f131F003fe4168473755022a9170e7aAB816FB"
          target="_blank"
          className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-transparent   group transition-all duration-300 "
        >
          <Img src={anyLogo} className="w-[140px]  group-hover:scale-110 duration-300 transition-all" alt="a" />
          <p className="mt-5 font-semibold text-black">
            <Text>Cross-Chain Swap</Text>
          </p>
        </CardANY>
        {/* <div
                  className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-transparent hover:border-[#8381b7]  group transition-all duration-300 "
                  style={{ backgroundColor: 'hsl(241, 85%, 89%)' }}
              >
                  <img
                      src={c}
                      className="w-[140px] group-hover:scale-110 duration-300 transition-all"
                      alt="a"
                  />
                  <p className="mt-5 font-semibold ">Tokens</p>
              </div> */}
      </div>
    </section>
  )
}
