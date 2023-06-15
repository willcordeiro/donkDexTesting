import React, { useState } from 'react'
import RechartGraph from '../Swap/RechartGraph'
import styled from 'styled-components'

export default function GraphSection() {
  const [activeBtn, setActiveBtn] = useState('4H')

  const Text = styled.span`
    color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
  `

  const ChartBtn = styled.div`
    background: none;
    cursor: pointer;
    color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : '#9b9bb0')};

    :hover {
      background-color: grey;
    }
  `

  const ChartContainer = styled.div`
    border: 1px solid #9b9bb0;
    border-radius: 0.5rem;
  `

  return (
    <section className="basis-full">
      <header
        className="flex items-center justify-between flex-wrap
            "
      >
        <div>
          <p className="font-semibold text-sm text-left	">
            <Text>TVL (Total Value Locked)</Text>
          </p>
          <p className="text-2xl font-semibold text-left	text-black">
            <Text>Coming soon</Text>
          </p>
        </div>
        <ChartContainer className="flex items-center gap-1 font-medium px-1 py-1 rounded-md border border-pink900 dark:border-dark900 text-pink900 dark:text-dark900 w-fit">
          {['5m', '15m', '1H', '4H'].map(duration => (
            <div key={duration}>
              <ChartBtn
                className={`py-1 px-2  rounded-md ${
                  activeBtn === duration ? 'bg-pink900 dark:bg-darkHover text-white' : ''
                }`}
                onClick={() => setActiveBtn(duration)}
              >
                {duration}
              </ChartBtn>
            </div>
          ))}
        </ChartContainer>
      </header>
      <div className="my-5 sm:h-[280px] h-[200px]">
        <RechartGraph />
      </div>
    </section>
  )
}
