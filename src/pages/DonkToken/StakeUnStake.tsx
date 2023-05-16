import React, { useState } from 'react'
import { logo } from '../../assets'

export default function StakeUnStake() {
  // const [stakeUnStake, setStakeUnStake] = useState('Stake')

  return (
    <section>
      <div className="font-semibold border-gray-300 text-black">
        <button type="button" className="text-center flex-1 pb-2.5">
          Stake
        </button>
        <button type="button" className="text-center flex-1 pb-2.5">
          Unstake
        </button>
      </div>

      <div>
        <label className="flex">
          <input type="number" placeholder="Enter Amount" />

          <button type="submit" className="fic gap-2 bg-white py-2 px-3 rounded-lg ml-1 text-black">
            <img src={logo} alt="litecoin" width={40} />
            <p className="font-semibold text-sm">Donk</p>
          </button>
        </label>
        {/*<ConnectWalletBtn />*/}
      </div>
      <div className="grid grid-cols-2 mt-12 py-10 bg-white text-black rounded-2xl">
        <div className="font-semibold col-span-2">
          <p className="mb-1">Staked Balance</p>
          <div className="gap-2">
            <img src={logo} alt="bitcoin" width={60} />
            <p>0 Donk</p>
          </div>
        </div>
        <div className="font-semibold col-span-2 ">
          <p className="mb-1">Pending Rewards</p>
          <div className="gap-2">
            <img src={logo} alt="litecoin" width={60} />
            <p>0 Donk</p>
          </div>
        </div>
        <div className="col-span-2">{/*<ConnectWalletBtn />*/}</div>
      </div>
    </section>
  )
}
