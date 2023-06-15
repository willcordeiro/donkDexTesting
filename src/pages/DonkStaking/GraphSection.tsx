import React, { useState } from 'react'
import RechartGraph from './RechartGraph'
import styled from 'styled-components'

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

export default function GraphSection() {
  const [activeBtn, setActiveBtn] = useState('4H')

  return (
    <section>
      <header
        className="flex items-center justify-between  flex-wrap
    "
      >
        <div>
          <p className="font-semibold text-sm text-pink900 ">
            <Text>TVL (Total Value Locked)</Text>
          </p>
          <p className="text-2xl font-semibold  text-black text-left">
            <Text>Coming soon</Text>
          </p>
        </div>
        <ChartContainer className="flex items-center font-medium px-1 py-1 rounded-md border border-pink900 text-pink900 w-fit dark:text-dark900 dark:border-dark900">
          {['5m', '15m', '1H', '4H'].map(duration => (
            <div key={duration}>
              <ChartBtn
                className={`py-1 px-2 hover:bg-pink900 dark:hover:bg-darkHover hover:text-white rounded-md ${
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
      {/* <Graph /> */}
      <div className="my-5 sm:h-[300px] h-[200px]">
        <RechartGraph />
      </div>
    </section>
  )
}
