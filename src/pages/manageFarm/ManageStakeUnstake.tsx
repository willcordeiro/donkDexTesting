import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ManageStakeUnstake() {
  const [stakeUnStake, setStakeUnStake] = useState('Stake')

  return (
    <section className="rounded-2xl bg-white  flex-1">
      <div className="fic font-semibold border-b border-gray-300 ">
        <button
          type="button"
          className={`${stakeUnStake === 'Stake' ? 'border-black  border-b-2' : ''} text-center flex-1 pb-3 pt-5`}
          onClick={() => setStakeUnStake('Stake')}
        >
          Stake
        </button>
        <button
          type="button"
          className={`${stakeUnStake === 'Unstake' ? 'border-black  border-b-2' : ''} text-center flex-1 pb-3 pt-5`}
          onClick={() => setStakeUnStake('Unstake')}
        >
          Unstake
        </button>
      </div>
      <div className="px-6 py-4 flex justify-between flex-col h-[87%]">
        <div>
          <label htmlFor="minute" className="flex items-center gap-1 rounded-xl border  p-1 pl-4 border-gray-300 my-3">
            <input
              type="number"
              className=" bg-transparent focus:bg-transparent outline-none flex-1 w-full"
              placeholder="Enter Amount of LP Tokens"
            />

            <button type="submit" className="bg-white py-2 px-3 rounded-lg w-max "></button>
          </label>
          <label htmlFor="minute" className="flex items-center gap-1 rounded-xl border  p-1 pl-4 border-gray-300 my-3">
            <input
              type="number"
              className=" bg-transparent focus:bg-transparent outline-none flex-1 w-full"
              placeholder="Enter the APR"
            />

            <button type="submit" className="bg-white py-2 px-3 rounded-lg w-max "></button>
          </label>
          <div className="fic justify-between gap-3 px-1 my-1">
            <p className="text-sm font-medium ">LP Token Balance</p>
            <p className="">0</p>
          </div>
          <div className="fic justify-between px-1 mt-5 relative">
            <Link to="/pool/lp-token" className="font-medium  hover:underline">
              Get LP Token
            </Link>
            {/*<Settings />*/}
          </div>
        </div>
        <div className="mt-10">{/*<ConnectWalletBtn />*/}</div>
      </div>
    </section>
  )
}
