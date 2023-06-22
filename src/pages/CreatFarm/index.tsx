import React from 'react'
import styled from 'styled-components'
import SelectPool from './SelectPool'
import RewardSection from './RewardSeciton'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Container = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#f1ece9' : '#191924')};
  text-align: left;
`

const MainText = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#46362f' : 'white')};
`

const InfoCard = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '' : 'white')};
`

const ButtonLink = styled.button`
  width: 100%;
  border-radius: 0.75rem;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: none;
`
const Text2 = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`
const msg = `Don't see a pool you joined?`

export default function CreateFarm() {
  return (
    <Container className="bg-pink100  min-h-[80vh]">
      <section className="max-w-6xl w-[90%] mx-auto">
        <Link to="/farm">
          <ButtonLink type="button" className="fic gap-1 font-semibold px-2 py-2 mb-4">
            <Text2>
              <AiOutlineArrowLeft fontSize="14px" />
            </Text2>
            <Text2>Back to Farms List</Text2>
          </ButtonLink>
        </Link>
        <header>
          <div className="flex items-center gap-2 mb-8">
            <h2 className="font-semibold sm:text-3xl text-3xl text-black">
              <MainText>Create a Farm</MainText>
            </h2>
          </div>
        </header>
        <Text2>{msg}</Text2>
        <ButtonLink type="button" className="fic gap-1 font-semibold px-2 py-2 mb-4">
          <Link to="/find">
            {' '}
            <span style={{ color: '#ff8e4c' }}>Import it.</span>{' '}
          </Link>
        </ButtonLink>
        <section>
          <SelectPool />
        </section>
        <section>
          <RewardSection />{' '}
        </section>
        <br />
        <br />
        <br />
        <br />
        <InfoCard>
          <span style={{ color: '#f84525' }}>Please note:</span> Rewards allocated to farms are final and unused rewards
          cannot be claimed. 60 USDT is collected as an Ecosystem farm creation fee. Token rewards should have a minimum
          duration period of at least 7 days and last no more than 90 days.
        </InfoCard>
      </section>
    </Container>
  )
}
