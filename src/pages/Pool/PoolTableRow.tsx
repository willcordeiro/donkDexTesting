import React from 'react'

export default function PoolTableRow({ data }: any) {
  const { no, APR, icon, name, FEES, liquidity, volume } = data || {}

  return (
    <tr
      key={no}
      className="rounded-lg dark:hover:bg-dark700 hover:bg-[#e8e2de] dark:text-darkText text-sm font-semibold cursor-pointer"
    >
      <td className="flex items-center justify-start pl-6 gap-2 py-5">
        <img src={icon} alt="terra" width={27} />
        <img src={icon} alt="terra" width={27} />
        <span>{name}</span>
        <span className="px-2 py-[6px] text-xs bg-[#dbdbdb91] dark:bg-[#ececec1b]">2.08%</span>
      </td>
      <td className="py-5 align-middle text-center">{liquidity}</td>
      <td className="py-5 align-middle text-center">{volume}</td>
      <td className="py-5 align-middle text-center">{FEES}</td>
      <td className="py-5 align-middle text-center">{APR}</td>
    </tr>
  )
}
