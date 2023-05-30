import React, { useState } from 'react'
import Cards from './Card'
import GraphSection from './GraphSection'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#f1ece9' : '#191924')};
`

const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

export default function Stake() {
  const [activeBtn, setActiveBtn] = useState('DONK')

  return (
    <Container className="bg-pink100  min-h-[80vh]">
      <section className="max-w-6xl w-[90%] mx-auto">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold sm:text-4xl text-3xl text-black text-left">
              <Text>Stake</Text>
            </h2>
            <p className="text-sm font-medium text-">
              <Text>Stake your DONK tokens and earn more.</Text>
            </p>
          </div>
          <ul className="flex items-center font-medium px-1 py-1 rounded-md border border-pink900 text-pink900 w-fit dark:border-dark900"></ul>
        </header>
        <GraphSection />
        <Cards />
      </section>
    </Container>
  )
}
