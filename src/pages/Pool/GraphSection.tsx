import React, { useState } from 'react'
import RechartGraph from '../Swap/RechartGraph'

export default function GraphSection() {
  const [activeBtn, setActiveBtn] = useState('4H')

  return (
    <section className="basis-full">
      <header
        className="flex items-center justify-between gap-2 flex-wrap
            "
      >
        <div>
          <p className="font-semibold text-sm text-left	">TVL (Total Value Locked)</p>
          <p className="text-2xl font-semibold text-left	">$86,029,43</p>
        </div>
        <ul className="flex items-center gap-1 font-medium px-1 py-1 rounded-md border border-pink900 dark:border-dark900 text-pink900 dark:text-dark900 w-fit">
          {['5m', '15m', '1H', '4H'].map(duration => (
            <li key={duration}>
              <button
                type="button"
                className={`py-1 px-2  rounded-md ${
                  activeBtn === duration ? 'bg-pink900 dark:bg-darkHover text-white' : ''
                }`}
                onClick={() => setActiveBtn(duration)}
              >
                {duration}
              </button>
            </li>
          ))}
        </ul>
      </header>
      <div className="my-5 sm:h-[280px] h-[200px]">
        <RechartGraph />
      </div>
    </section>
  )
}
