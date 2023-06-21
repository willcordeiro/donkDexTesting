import { BiSearch } from 'react-icons/bi'
import { AiFillCloseCircle } from 'react-icons/ai'
import React, { useState, useEffect, useRef } from 'react'
import { useSearch } from 'react-use-search'
import PoolCard from './PoolCard'
import { Ethereum, terra, solona, bitcoin, logo } from '../../assets'
import styled from 'styled-components'
const predicate = (user: { name: string }, query: string) => user.name.toLowerCase().includes(query.toLowerCase())

const Label = styled.label`
  border: 1px solid #9ca6b9;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
`

const Input = styled.input`
  background: none;
  outline: none;
  border: none;
  font-size: 15px;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
  ::placeholder {
    font-size: 15px;
    font-weight: 500;
    color: #9ca6b9;
  }
`
const Text = styled.span`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

const Container = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
  height: 100%;
  max-height: 100px;
  padding: 20px;
  border-radius: 1.25rem;
  margin-top: 10px;
`

const PoolCardsContainer = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
  padding: 20px;
  border-radius: 0.5rem;
  height: 100%;
  max-height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  z-index: 2;
  position: relative;
`

const SelectedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RemovePoolBTN = styled.div`
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`

export default function SelectPool() {
  const [sort, setSort] = useState('Liquidity')
  const [pool, setPool] = useState(0)
  const [isClicked, setIsClicked] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    setIsClicked(true)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsClicked(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const data = [
    {
      id: 1,
      icon: logo,
      icon2: Ethereum,
      name: 'DONK-ETH',
      totalStaked: '345,564,839',
      yourStake: '67',
      FEES: '0.2',
      APR: '7.90',
      address: '13uCPybN...MVgKy6UJ'
    },
    {
      id: 2,
      icon: logo,
      icon2: Ethereum,
      name: 'USDC-ETH',
      totalStaked: '345,564,839',
      yourStake: '67',
      FEES: '0.2',
      APR: '7.90',
      address: '13uCPybN...MVgKy6UJ'
    },
    {
      id: 3,
      icon: logo,
      icon2: Ethereum,
      name: 'USDT-ETH',
      totalStaked: '345,564,839',
      yourStake: '67',
      FEES: '0.2',
      APR: '7.90',
      address: '13uCPybN...MVgKy6UJ'
    },
    {
      id: 4,
      icon: logo,
      icon2: Ethereum,
      name: 'BITCOIN-ETH',
      totalStaked: '345,564,839',
      yourStake: '67',
      FEES: '0.2',
      APR: '7.90',
      address: '13uCPybN...MVgKy6UJ'
    },
    {
      id: 5,
      icon: logo,
      icon2: Ethereum,
      name: 'DONKy-ETH',
      totalStaked: '345,564,839',
      yourStake: '67',
      FEES: '0.2',
      APR: '7.90',
      address: '13uCPybN...MVgKy6UJ'
    },
    {
      id: 6,
      icon: logo,
      icon2: Ethereum,
      name: 'WETH-ETH',
      totalStaked: '345,564,839',
      yourStake: '67',
      FEES: '0.2',
      APR: '7.90',
      address: '13uCPybN...MVgKy6UJ'
    },
    {
      id: 7,
      icon: logo,
      icon2: Ethereum,
      name: 'WBUSD-ETH',
      totalStaked: '345,564,839',
      yourStake: '67',
      FEES: '0.2',
      APR: '7.90',
      address: '13uCPybN...MVgKy6UJ'
    }
  ]

  const filteredData = data.filter(item => item.id === pool)

  const [filteredUsers, query, handleChange] = useSearch(data, predicate, {
    filter: true,
    debounce: 200
  })

  return (
    <>
      <Text>Select a pool</Text>
      <Container>
        {pool == 0 ? (
          <div className="flex justify-between">
            <Label
              htmlFor="cardsearch"
              className="flex flex-1 items-center gap-2 p-2 border border-gray-300 rounded-md"
            >
              <BiSearch color="black" size={20} />
              <Input
                type="text"
                id="search"
                value={query}
                onChange={handleChange}
                onClick={handleClick}
                ref={inputRef}
                placeholder="Search for a Pool"
                className="w-full text-sm"
              />
            </Label>
          </div>
        ) : (
          <SelectedContainer>
            <PoolCard data={filteredData[0]} clicked={setIsClicked} isClicked={isClicked} />

            <RemovePoolBTN onClick={() => setPool(0)}>
              <AiFillCloseCircle size={30} />
            </RemovePoolBTN>
          </SelectedContainer>
        )}

        {isClicked ? (
          <PoolCardsContainer className="grid grid-cols-1 gap-5">
            {filteredUsers.length !== 0 ? (
              filteredUsers.map((data, index) => (
                <PoolCard key={index} data={data} func={setPool} clicked={setIsClicked} isClicked={isClicked} />
              ))
            ) : (
              <div className="text-sm text-center pt-8">There is no pool matched, please try again!</div>
            )}
          </PoolCardsContainer>
        ) : (
          ''
        )}
      </Container>
    </>
  )
}
