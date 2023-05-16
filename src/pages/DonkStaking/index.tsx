import React, { useState } from 'react'
import Cards from './Card'
import GraphSection from './GraphSection'

export default function Stake() {
  const [activeBtn, setActiveBtn] = useState('DONK')

  return (
    <div className="bg-pink100 pt-5 pb-14 min-h-[80vh]">
      <section className="max-w-6xl w-[90%] mx-auto">
        <header className="flex items-center justify-between mb-5 gap-1">
          <div>
            <h2 className="font-semibold sm:text-4xl text-3xl mb-1 text-black">Stake</h2>
            <p className="text-sm font-medium text-">Stake your DONK tokens and earn more.</p>
          </div>
          <ul className="flex items-center gap-1 font-medium px-1 py-1 rounded-md border border-pink900 text-pink900 w-fit dark:border-dark900">
            {['DONK'].map(currency => (
              <li key={currency}>
                <button
                  type="button"
                  className={`py-1 px-2 hover:bg-pink900 dark:hover:bg-darkHover hover:text-white rounded-md ${
                    activeBtn === currency ? 'bg-pink900 dark:bg-darkHover text-white' : ''
                  }`}
                  onClick={() => setActiveBtn(currency)}
                >
                  {currency}
                </button>
              </li>
            ))}
          </ul>
        </header>
        <GraphSection />
        <Cards />
      </section>
    </div>
  )
}
