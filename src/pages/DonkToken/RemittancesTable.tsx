import React from 'react'

export default function RemittancesTable() {
  /*
  {tradInfo.map(({ no, timestamp, value, price }) => (
    <tr key={no} className="rounded-lg text-[13px] text-black">
      <td className="py-[10px] align-middle text-start">{timestamp}</td>
      <td className="py-[10px] align-middle text-start">{value}</td>
      <td className="py-[10px] align-middle text-end">{price}</td>
    </tr>
  ))}
*/
  return (
    <div className="text-black pb-12 pt-8">
      <h3 className="font-semibold mb-5 text-black text-xl">Remittances</h3>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-[450px] w-full remittance-table">
          <thead>
            <tr className="font-medium text-sm text-[rgb(150,150,150)]">
              <th className="text-start pb-[10px]">TIMESTAMP</th>
              <th className="text-start pb-[10px]">Amount</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  )
}
