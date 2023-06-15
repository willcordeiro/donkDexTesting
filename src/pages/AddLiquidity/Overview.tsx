import React from 'react'
import GraphSection from '../Pool/GraphSection'
import styled from 'styled-components'

const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

const CardContainer = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
  text-align: left;
`

export default function Overview() {
  return (
    <section className="basis-3/5">
      <header className="mb-8 text-left">
        <Text className="font-semibold mb-2 text-xl ">Overview</Text>
        <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-2">
          <CardContainer className="py-4 px-5 bg-white rounded-xl">
            <p className="text-pink900 mb-[1px] text-[13px] ">
              <Text>Liquidity</Text>
            </p>
            <div className=" font-semibold text-[22px]">
              <Text>Coming soon</Text>
              <span className="font-normal text-green-500 text-sm ml-2">...</span>
            </div>
          </CardContainer>
          <CardContainer className="py-4 px-5 bg-white  rounded-xl">
            <p className="text-pink900 mb-[1px] text-[13px] ">
              <Text>Volume (24h)</Text>
            </p>
            <div className=" font-semibold text-[22px]">
              <Text>Coming soon</Text>
              <span className="font-normal text-green-500 text-sm ml-2">...</span>
            </div>
          </CardContainer>
          <CardContainer className="py-4 px-5 bg-white rounded-xl">
            <p className="text-pink900 mb-[1px] text-[13px]">
              <Text>Fees (24h)</Text>
            </p>
            <div className=" font-semibold text-[22px]">
              <Text>Coming soon</Text>
              <span className="font-normal text-red-500 text-sm ml-2">...</span>
            </div>
          </CardContainer>
          <CardContainer className="py-4 px-5 bg-white rounded-xl">
            <p className="text-pink900 mb-[1px] text-[13px] ">
              <Text>APR</Text>
            </p>
            <div className="font-semibold text-[22px]">
              <Text>Coming soon</Text>
              <span className="font-normal text-green-500 text-sm ml-2">...</span>
            </div>
          </CardContainer>
        </div>
      </header>

      <div className="border border-gray-300 px-3 py-6 rounded-lg mb-10">
        <GraphSection />
      </div>
    </section>
  )
}
