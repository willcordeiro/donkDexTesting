import React from 'react'
import { c } from '../../assets'
import FarmBtnList from './FarmBtnList'
import Filter from './Filter'

export default function Farm() {
  return (
    <div className="bg-pink100  min-h-[80vh]">
      <section className="max-w-6xl w-[90%] mx-auto">
        <header>
          <div className="flex items-center gap-2 mb-8">
            <img src={c} alt="c" width="80" />
            <h2 className="font-semibold sm:text-4xl text-3xl text-black">Farm</h2>
          </div>
          <FarmBtnList />
        </header>
        <section>
          <Filter />
        </section>
      </section>
    </div>
  )
}
