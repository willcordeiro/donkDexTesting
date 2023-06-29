import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
  border-bottom: 1px solid ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e4e7ee' : '#4c4e52')};
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
  :hover {
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e9e9f1' : '#474a66')};
  }
  z-index: 9999;

  header {
    display: flex;
  }
  @media (max-width: 768px) {
    header {
      display: block;
    }
  }
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

  function addDotsToAddress(address: string) {
    if (address.length <= 8) {
      return address // Endereço curto, não precisa de pontos intermediários
    }

    const startChunk = address.substring(0, 4)
    const endChunk = address.substring(address.length - 4)
    return `${startChunk}...${endChunk}`
  }

  return (
    <Container className="bg-white rounded-md w-full" onClick={handleClick}>
      <header className="items-center  justify-between " id={id}>
        <div className="flex items-center ">
          <img src={icon} alt="terra" className="w-8" />
          <img src={icon2} alt="Ethereum" className="w-8" />
          <span className="font-semibold text-black">
            <Text>{name}</Text>
          </span>
        </div>
        <div className="text-xs px-2 py-1 bg-[#cdcdcd6a] font-medium text-black">
          <Text>{addDotsToAddress(address)}</Text>
        </div>
      </header>
    </Container>
  )
}
