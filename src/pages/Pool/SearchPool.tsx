import React from 'react'
import { useSearch } from 'react-use-search'
import { bitcoin, etherium, litecoin, solona, terra } from '../../assets'
import PoolTableRow from './PoolTableRow'
import { BiSearch } from 'react-icons/bi'
import styled from 'styled-components'
const predicate = (user: { name: string }, query: string) => user.name.toLowerCase().includes(query.toLowerCase())

export default function SearchPool() {
  const tradInfo = [
    {
      no: 1,
      icon: terra,
      name: 'Terra',
      liquidity: '$345,564,839',
      volume: '$67',
      FEES: '24.45%',
      APR: '7.90%'
    },
    {
      no: 2,
      icon: bitcoin,
      name: 'Bitcoin',
      liquidity: '$345,564,839',
      volume: '$23,050',
      FEES: '24.45%',
      APR: '7.90%'
    },
    {
      no: 3,
      icon: litecoin,
      name: 'Litecoin',
      liquidity: '$345,564,839',
      volume: '$67',
      FEES: '24.45%',
      APR: '7.90%'
    },
    {
      no: 4,
      icon: solona,
      name: 'Solana',
      liquidity: '$345,564,839',
      volume: '$67',
      FEES: '24.45%',
      APR: '7.90%'
    },
    {
      no: 5,
      icon: etherium,
      name: 'Etherium',
      liquidity: '$345,564,839',
      volume: '$67',
      FEES: '24.45%',
      APR: '7.90%'
    },
    {
      no: 6,
      icon: litecoin,
      name: 'Litecoin',
      liquidity: '$345,564,839',
      volume: '$67',
      FEES: '24.45%',
      APR: '7.90%'
    },
    {
      no: 7,
      icon: terra,
      name: 'Terra',
      liquidity: '$345,564,839',
      volume: '$67',
      FEES: '24.45%',
      APR: '7.90%'
    },
    {
      no: 8,
      icon: terra,
      name: 'Terra',
      liquidity: '$345,564,839',
      volume: '$67',
      FEES: '24.45%',
      APR: '7.90%'
    },
    {
      no: 9,
      icon: terra,
      name: 'Terra',
      liquidity: '$345,564,839',
      volume: '$67',
      FEES: '24.45%',
      APR: '7.90%'
    }
  ]

  const Label = styled.label`
    display: flex;
    flex: 1 1 0%;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.375rem;
    border: rgb(209 213 219) solid 1px;
    padding: 0.8rem;
  `

  const Input = styled.input`
    font-size: 100%;
    margin: 0px;
    padding: 0px;
    width: 100%;
    background-color: transparent;
    outline: transparent solid 2px;
    border: none;
  `

  const [filteredUsers, query, handleChange] = useSearch(tradInfo, predicate, {
    filter: true,
    debounce: 200
  })

  return (
    <>
      <div className="flex items-center gap-3 mt-3 mb-10 max-lg:flex-col-reverse">
        <Label>
          <BiSearch color="black" />
          <Input type="text" placeholder="Search by pool name" id="search" value={query} onChange={handleChange} />
        </Label>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto min-w-[800px] w-full">
          <thead>
            <tr>
              <th className="text-start px-5 pb-[10px] font-medium text-[rgb(150,150,150)]">POOL NAME</th>
              <th className="text-center px-5 pb-[10px] font-medium text-[rgb(150,150,150)]">↓ LIQUIDITY</th>
              <th className="text-center px-5 pb-[10px] font-medium text-[rgb(150,150,150)]">VOLUME (24H)</th>
              <th className="text-center px-5 pb-[10px] font-medium text-[rgb(150,150,150)]">FEES (24H)</th>
              <th className="text-center px-5 pb-[10px] font-medium text-[rgb(150,150,150)]">APR (24H)</th>
            </tr>
          </thead>
          {filteredUsers.length !== 0 ? (
            filteredUsers.map((data: any, index: React.Key | null | undefined) => (
              <tbody key={index}>
                <PoolTableRow data={data} />
              </tbody>
            ))
          ) : (
            <div className="text-sm text-center pt-8">No matching pool found</div>
          )}
        </table>
      </div>
    </>
  )
}
