import React from 'react'
import { logo } from '../../assets/index'
import Overview from './Overview'
import StakeUnStake from './StakeUnStake'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
export default function DonkToken() {
  return (
    <div className="pt-3 pb-14">
      <section className="max-w-6xl  mx-auto">
        <header className="pb-14">
          <Link to="/stake">
            <button type="button" className="gap-1 font-semibold px-2 py-2 mb-4 text-black">
              <AiOutlineArrowLeft fontSize="14px" />
              Back
            </button>
          </Link>
          <div className="gap-2 h-16 w-16 min-w-[4rem]">
            <img src={logo} alt="bitcoin" width={70} />
            <p className="font-semibold text-5xl text-black">Donk</p>
          </div>
          <p className="text-sm mt-2 ml-1 text-black">Rewards distributed very few days</p>
        </header>

        <main className="grid lg:grid-cols-2 grid-cols-1 gap-10">
          <Overview />
          <StakeUnStake />
        </main>
      </section>
    </div>
  )
}
