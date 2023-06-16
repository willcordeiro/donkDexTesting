import { BiSearch } from 'react-icons/bi'
import React, { useState } from 'react'
import { useSearch } from 'react-use-search'
import FarmsCardss from './FarmCards'
import { Ethereum, terra, solona, bitcoin, logo } from '../../assets'
import styled from 'styled-components'
const predicate = (user: { name: string }, query: string) => user.name.toLowerCase().includes(query.toLowerCase())

const Label = styled.label`
  border: 1px solid #9ca6b9;
  max-width: 24rem;
`

const Input = styled.input`
  background: none;
  outline: none;
  border: none;
  font-size: 15px;

  ::placeholder {
    font-size: 15px;
    font-weight: 500;
    color: #9ca6b9;
  }
`

const Btn = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
`

export default function Filter() {
  const [sort, setSort] = useState('Liquidity')

  const data = [
    {
      id: 1,
      icon: logo,
      icon2: Ethereum,
      name: 'Etherium',
      totalStaked: '345,564,839',
      yourStake: '67',
      FEES: '0.2',
      APR: '7.90'
    },
    {
      id: 2,
      icon: logo,
      icon2: solona,
      name: 'Solana',
      totalStaked: '345,564,839',
      yourStake: '67',
      FEES: '0.2',
      APR: '7.90'
    },
    {
      id: 3,
      icon: logo,
      icon2: bitcoin,
      name: 'Bitcoin',
      totalStaked: '345,564,839',
      yourStake: '67',
      FEES: '0.2',
      APR: '7.90'
    },
    {
      id: 4,
      icon: logo,
      icon2: terra,
      name: 'Terra',
      totalStaked: '345,564,839',
      yourStake: '67',
      FEES: '0.2',
      APR: '7.90'
    }
  ]

  const [filteredUsers, query, handleChange] = useSearch(data, predicate, {
    filter: true,
    debounce: 200
  })

  return (
    <>
      <div className="flex justify-between mb-10">
        <Label htmlFor="cardsearch" className="flex  flex-1 items-center gap-2 p-2 border border-gray-300 rounded-md ">
          <BiSearch color="black" size={20} />
          <Input
            type="text"
            id="search"
            value={query}
            onChange={handleChange}
            placeholder="Search by symbol or name"
            className="w-full text-sm "
          />
        </Label>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {filteredUsers.length !== 0 ? (
          filteredUsers.map((data, index) => <FarmsCardss key={index} data={data} />)
        ) : (
          <div className="text-sm text-center pt-8">No matching farm found</div>
        )}
      </div>
    </>
  )
}
