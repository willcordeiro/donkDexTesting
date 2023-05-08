import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../../assets'

export default function Card() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3 mb-10">
      <Link
        to="/stake/token"
        className="hover:bg-[#cdcdcd6a] dark:hover:bg-[#00000024] p-5 border border-gray-300 dark:border-dark900 rounded-md w-full"
      >
        <header className="flex items-center gap-2 justify-between mb-5">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" width="60" />
            <span className="font-semibold dark:text-darkText">Donk</span>
          </div>
          <div className="text-xs px-2 py-1 bg-[#cdcdcd6a] font-medium dark:text-darkText rounded-md">Earn Donk</div>
        </header>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-pink900 mb-[2px] dark:text-dark900">Total Stacked (USD)</p>
            <p className="font-semibold dark:text-darkText">$0</p>
          </div>
          <div>
            <p className="text-xs text-pink900 mb-[2px] dark:text-dark900">Your Stake (USD)</p>
            <p className="font-semibold dark:text-darkText">$0</p>
          </div>
          <div>
            <p className="text-xs text-pink900 mb-[2px] dark:text-dark900">APR (1YR)</p>
            <p className="font-semibold dark:text-darkText">2500%</p>
          </div>
          <div>
            <p className="text-xs text-pink900 mb-[2px] dark:text-dark900">Deposit Fee</p>
            <p className="font-semibold dark:text-darkText">0.1%</p>
          </div>
        </div>
      </Link>{' '}
    </div>
  )
}
