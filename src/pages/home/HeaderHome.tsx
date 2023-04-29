import React from 'react'
import { a, b, c } from '../../assets'

export default function HeaderHome() {
  return (
    <div className="bg-pink100 dark:bg-dark500 md:py-32 pb-16 pt-20">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 auto-rows-fr gap-5">
        <figure className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-transparent  dark:hover:border-white group transition-all duration-300 ">
          <img src={a} alt="coin" className=" group-hover:scale-110 duration-300 transition-all" />
        </figure>
        <figure className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-transparent dark:hover:border-white group transition-all duration-300 ">
          <img src={b} alt="coin" className=" group-hover:scale-110 duration-300 transition-all" />
        </figure>
        <figure className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-transparent dark:hover:border-white group transition-all duration-300 ">
          <img src={c} alt="coin" className=" group-hover:scale-110 duration-300 transition-all" />
        </figure>
      </div>
      <h1 className="text-2xl font-medium mb-10 dark:text-white textBlack">One-stop decentralized trading</h1>
    </div>
  )
}
