import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 20px;
`

const Btn = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
  margin-bottom: 20px;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '' : '#2f3146')};
`

export default function FarmBtnList() {
  const [activePool, setActivePool] = useState('All')

  return (
    <Container className="flex md:gap-2">
      {['All', 'My farm'].map((btn, i) => (
        <Btn
          className={`py-2 px-3 rounded-lg text-sm font-medium ${
            activePool === btn ? 'bg-white opacity-100' : 'opacity-50 '
          }`}
          key={i}
          onClick={() => setActivePool(btn)}
        >
          {btn}
        </Btn>
      ))}
    </Container>
  )
}
