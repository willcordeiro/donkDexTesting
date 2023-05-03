import React from 'react'
import Explore from './Explorer'
import HeaderHome from './HeaderHome'
import TradTable from './TradTable'
import styled from 'styled-components'

const ContainerHeader = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#f1ece9' : '#191924')};
`

const ContainerExplore = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#191924')};
`

export default function Home() {
  return (
    <>
      <ContainerHeader>
        <HeaderHome />
      </ContainerHeader>
      <ContainerExplore>
        <Explore />
      </ContainerExplore>
      <TradTable />
    </>
  )
}
