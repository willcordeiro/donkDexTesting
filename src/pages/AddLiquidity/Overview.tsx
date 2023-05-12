import React from 'react'
import GraphSection from '../Pool/GraphSection'

export default function Overview() {
  return (
    <section className="basis-3/5">
      <header className="mb-8">
        <p className="font-semibold mb-2 text-xl">Overview</p>
        <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="py-4 px-5 bg-white drounded-xl">
            <p className="text-pink900 mb-[1px] text-[13px] ">Liquidity</p>
            <div className=" font-semibold text-[22px]">
              <span>120,863,779</span>
              <span className="font-normal text-green-500 text-sm ml-2">5.38%</span>
            </div>
          </div>
          <div className="py-4 px-5 bg-white  rounded-xl">
            <p className="text-pink900 mb-[1px] text-[13px] ">Volume (24h)</p>
            <div className=" font-semibold text-[22px]">
              <span>120,863,779</span>
              <span className="font-normal text-green-500 text-sm ml-2">5.38%</span>
            </div>
          </div>
          <div className="py-4 px-5 bg-white rounded-xl">
            <p className="text-pink900 mb-[1px] text-[13px]">Fees (24h)</p>
            <div className=" font-semibold text-[22px]">
              <span>120,863,779</span>
              <span className="font-normal text-red-500 text-sm ml-2">5.38%</span>
            </div>
          </div>
          <div className="py-4 px-5 bg-white rounded-xl">
            <p className="text-pink900 mb-[1px] text-[13px] ">APR</p>
            <div className="font-semibold text-[22px]">
              <span>120,863,779</span>
              <span className="font-normal text-green-500 text-sm ml-2">5.38%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="border border-gray-300 px-3 py-6 rounded-lg mb-10">
        <GraphSection />
      </div>
    </section>
  )
}
