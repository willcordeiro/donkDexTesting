import React from 'react'
import styled from 'styled-components'

const Text2 = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`
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
      <h3 className="font-semibold mb-5 text-black text-xl">
        <Text2>Remittances</Text2>
      </h3>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-[450px] w-full remittance-table">
          <thead>
            <tr className="font-medium text-sm text-[rgb(150,150,150)]">
              <th className="text-start pb-[10px]">
                <Text2>TIMESTAMP</Text2>
              </th>
              <th className="text-start pb-[10px]">
                <Text2>Amount</Text2>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  )
}
