import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  margin-bottom: 20px;
  justify-content: space-between;
`

const Btn = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
  margin-left: 1px;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '' : '#2f3146')};
`

const CreateContainerBtn = styled.div``

const CreateBtn = styled(Link)`
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  width: fit-content;
  max-width: 140px;
  font-weight: 500;
  color: white;
  text-decoration: none;
  text-decoration: inherit;
  flex-basis: 100%;
  border-radius: 0.375rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 7px;
  padding-bottom: 7px;
  background-color: #ff8e4c;
  :hover {
    opacity: 0.5;
  }
`

export default function FarmBtnList() {
  const [activePool, setActivePool] = useState('All')

  return (
    <Container className="flex md:gap-2">
      <CreateContainerBtn>
        {['All', 'My farm'].map((btn, i) => (
          <Btn
            className={`py-1 px-3 rounded-lg text-sm font-medium ${
              activePool === btn ? 'bg-white opacity-100' : 'opacity-50 '
            }`}
            key={i}
            onClick={() => setActivePool(btn)}
          >
            {btn}
          </Btn>
        ))}
      </CreateContainerBtn>
      <CreateContainerBtn>
        <CreateBtn to={'farm/create'}>Create Farm</CreateBtn>
      </CreateContainerBtn>
    </Container>
  )
}
