import React from 'react'
import RechartGraph from '../DonkStaking/RechartGraph'
import RemittancesTable from './RemittancesTable'

export default function Overview() {
  return (
    <section>
      <header className="mb-8">
        <p className="font-semibold mb-2 text-black text-xl">Overview</p>
        <div className="mb-5 flex gap-2 flex-wrap">
          <div className="py-5 px-6 bg-white text-black rounded-2xl flex-1">
            <p className="font-semibold mb-[1px] text-[13px] text-black">Total Staked</p>
            <div className="text-black font-semibold text-xl">0</div>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2 text-black">Stake Information</p>
          <ol className="list-disc list-inside text-black">
            <li>Claim your share of protocol revenue generated.</li>
            <li>
              A % fee is deducted from every swap and used to buy a stablecoin which is distributed to all sJOE stakers.
            </li>
            <li>Rewards are distributed every few days, and you can Harvest at any time.</li>
            <li>
              The APR (YR) metric shows an annualized return that is forecasted, based on the revenue collected over the
              previous thirty days.
            </li>
          </ol>
        </div>
      </header>
      <div>
        <p className="font-semibold text-black text-xl">Total Staked</p>
        <div className="my-5 sm:h-[280px] h-[200px]">
          <RechartGraph />
        </div>
      </div>
      <RemittancesTable />
    </section>
  )
}
