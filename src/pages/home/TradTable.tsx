import React from 'react'
import { useSelector } from 'react-redux'
import TradTableRow from './TradTableRow'
import { terra, bitcoin, litecoin, solona, etherium } from '../../assets'

export default function TradTable() {
  const tradInfo = [
    {
      uuid: 1,
      icon: terra,
      name: 'Terra',
      volume: '000',
      price: '000',
      symbol: 'btc.b',
      _24H: '000',
      _7D: '000'
    },
    {
      uuid: 2,
      icon: bitcoin,
      name: 'Bitcoin',
      volume: '000',
      price: '$23,050',
      _24H: '000',
      _7D: '000'
    },
    {
      uuid: 3,
      icon: litecoin,
      name: 'Litecoin',
      volume: '000',
      price: '000',
      _24H: '000',
      _7D: '000'
    },
    {
      uuid: 4,
      icon: solona,
      name: 'Solana',
      volume: '000',
      price: '000',
      _24H: '000',
      _7D: '000'
    },
    {
      uuid: 5,
      icon: etherium,
      name: 'Etherium',
      volume: '000',
      price: '000',
      _24H: '000',
      _7D: '000'
    },
    {
      uuid: 6,
      icon: litecoin,
      name: 'Litecoin',
      volume: '000',
      price: '000',
      _24H: '000',
      _7D: '000'
    },
    {
      uuid: 7,
      icon: terra,
      name: 'Terra',
      volume: '000',
      price: '000',
      _24H: '000',
      _7D: '000'
    },
    {
      uuid: 8,
      icon: terra,
      name: 'Terra',
      volume: '000',
      price: '000',
      _24H: '000',
      _7D: '000'
    },
    {
      uuid: 9,
      icon: terra,
      name: 'Terra',
      volume: '000',
      price: '000',
      _24H: '000',
      _7D: '000'
    }
  ]

  const tokenState = useSelector((state: any) => state.token)

  if (tokenState === undefined) {
    return null
  }

  const { tokens }: any = tokenState

  return (
    <div className="bg-pink100 dark:bg-dark500 py-20">
      <section className="max-w-6xl w-[90%] mx-auto">
        <h3 className="text-2xl font-medium mb-10 dark:text-white">Top Traded</h3>
        <div className="overflow-x-auto">
          <table className="table-auto min-w-[800px] w-full">
            <thead>
              <tr>
                <th className="text-start px-5 pb-[10px] font-medium text-[rgb(150,150,150)]">#</th>
                <th className="text-start px-5 pb-[10px] font-medium text-[rgb(150,150,150)]">TOKEN</th>
                <th className="text-center px-5 pb-[10px] font-medium text-[rgb(150,150,150)]">↓ VOLUME (24H)</th>
                <th className="text-center px-5 pb-[10px] font-medium text-[rgb(150,150,150)]">PRICE</th>
                <th className="text-center px-5 pb-[10px] font-medium text-[rgb(150,150,150)]">CHANGE (24H)</th>
                <th className="text-center px-5 pb-[10px] font-medium text-[rgb(150,150,150)]">CHANGE (7D)</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((rowData: any) => (
                <TradTableRow rowData={rowData} key={rowData.uuid} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
