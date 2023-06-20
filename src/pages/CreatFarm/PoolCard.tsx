import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
  border-bottom: 1px solid ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e4e7ee' : '#4c4e52')};
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
  :hover {
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'rgb(232 226 222)' : '#474a66')};
  }
  z-index: 9999;
`
const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

export default function PoolCard({ data, func, clicked, isClicked }: any) {
  const { id, icon, icon2, name, address } = data || {}

  const handleClick = () => {
    if (func) {
      func(id)
    }

    if (isClicked) {
      clicked(false)
    } else {
      clicked(true)
    }
  }

  return (
    <Container className="bg-white rounded-md w-full" onClick={handleClick}>
      <header className="flex items-center  justify-between " id={id}>
        <div className="flex items-center ">
          <img src={icon} alt="terra" className="w-8" />
          <img src={icon2} alt="Ethereum" className="w-8" />
          <span className="font-semibold text-black">
            <Text>{name}</Text>
          </span>
        </div>
        <div className="text-xs px-2 py-1 bg-[#cdcdcd6a] font-medium text-black">
          <Text>{address}</Text>
        </div>
      </header>
    </Container>
  )
}
