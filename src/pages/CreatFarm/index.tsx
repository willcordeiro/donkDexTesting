import React from 'react'
import styled from 'styled-components'
import SelectPool from './SelectPool'
import RewardSection from './RewardSeciton'
const Container = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#f1ece9' : '#191924')};
  text-align: left;
`

const MainText = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

export default function CreateFarm() {
  return (
    <Container className="bg-pink100  min-h-[80vh]">
      <section className="max-w-6xl w-[90%] mx-auto">
        <header>
          <div className="flex items-center gap-2 mb-8">
            <h2 className="font-semibold sm:text-3xl text-3xl text-black">
              <MainText>Create a Farm</MainText>
            </h2>
          </div>
        </header>
        <section>
          <SelectPool />
        </section>
        <section>
          <RewardSection />{' '}
        </section>
      </section>
    </Container>
  )
}
