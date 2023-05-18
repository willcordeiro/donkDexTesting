import React from 'react'
import { c } from '../../assets'
import Harvest from './Harvest'
import ManageStakeUnstake from './ManageStakeUnstake'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function ManageFarm() {
  return (
    <div className="bg-pink100 pt-3 pb-14">
      <section className="max-w-5xl w-[90%] mx-auto">
        <header className="">
          <div className="fic gap-1 relative bg-[#f5d273] p-4 rounded-3xl">
            <Link to="/Farm">
              <button type="button" className="font-semibold p-2">
                <AiOutlineArrowLeft fontSize="14px" />
              </button>
            </Link>
            <p className="font-medium text-2xl">Manage Farm</p>{' '}
            <img src={c} alt="c" className="absolute right-1 top-1/2 -translate-y-1/2 w-44 max-sm:hidden" />
          </div>
        </header>

        <main className="flex max-lg:flex-col gap-5 mt-8">
          <Harvest />
          <ManageStakeUnstake />
        </main>
      </section>
    </div>
  )
}
