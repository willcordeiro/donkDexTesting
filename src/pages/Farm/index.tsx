import React from 'react'
import { c } from '../../assets'
import FarmBtnList from './FarmBtnList'
import Filter from './Filter'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#f1ece9' : '#191924')};
`

const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

export default function Farm() {
  return (
    <Container className="bg-pink100  min-h-[80vh]">
      <section className="max-w-6xl w-[90%] mx-auto">
        <header>
          <div className="flex items-center gap-2 mb-8">
            <img src={c} alt="c" width="80" />
            <h2 className="font-semibold sm:text-4xl text-3xl text-black">
              <Text>Farm</Text>
            </h2>
          </div>
          <FarmBtnList />
        </header>
        <section>
          <Filter />
        </section>
      </section>
    </Container>
  )
}
