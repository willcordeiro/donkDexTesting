import React from 'react'
import { logo } from '../../assets/index'
import Overview from './Overview'
import StakeUnStake from './StakeUnStake'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.div`
  text-align: left;
`

const Button = styled.button`
  font-size: 15px;
  background: none;
  outline: none;
  border: none;
`

const Text = styled.span`
  font-size: 50px;
`
const TextLink = styled.span`
  color: black;
`

export default function DonkToken() {
  return (
    <section className="max-w-6xl  mx-auto">
      <Header>
        <header>
          <Link to="/stake">
            <Button type="button" className="gap-1 font-semibold px-2 py-2 text-black">
              <AiOutlineArrowLeft fontSize="14px" color={'black'} />
            </Button>
            <TextLink>Back</TextLink>
          </Link>
          <div className="flex min-w-[4rem]">
            <table>
              <tr>
                <td>
                  {' '}
                  <img src={logo} alt="logo" height={70} />
                </td>
                <td>
                  <p className="font-semibold text-black">
                    <Text>Donk</Text>
                  </p>
                </td>
              </tr>
            </table>
          </div>
          <p className="text-sm ">Rewards distributed very few days</p>
        </header>
      </Header>
      <main className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        <Overview />
        <StakeUnStake />
      </main>
    </section>
  )
}
