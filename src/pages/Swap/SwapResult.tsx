import React, { useState } from 'react'
import RechartGraph from './RechartGraph'
import ETHlogo from '../../assets/images/ethereum-logo.png'
import styled from 'styled-components'

export default function SwipResult({ FieldOne, FieldTwo }: any) {
  const swip: any = {
    selected: {
      icon: FieldOne?.tokenInfo?.logoURI ?? ETHlogo,
      name: FieldOne?.symbol
    }
  }

  const to: any = {
    selected: {
      icon: FieldTwo?.tokenInfo?.logoURI ?? ETHlogo,
      name: FieldTwo?.symbol
    }
  }

  const [activeBtn, setActiveBtn] = useState('1W')

  const flipBtn = true

  const Text = styled.span`
    color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
  `

  const ChartBtn = styled.div`
    background: none;
    cursor: pointer;
    color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : '#9b9bb0')};
  `

  const ChartContainer = styled.div`
    border: 1px solid #9b9bb0;
    border-radius: 0.5rem;
  `

  return (
    <div className="basis-full">
      {FieldOne && FieldTwo ? (
        <>
          <header className="grid grid-cols-2 gap-3 mb-14 ">
            <div
              className={`flex items-center gap-3 max-xl:col-span-2 ${flipBtn ? 'flex-row-reverse justify-end' : ''}`}
            >
              <div className="flex items-center gap-2">
                <img src={`${swip.selected.icon}`} alt="no image" className="w-[40px] rounded-full" />
                <span className="font-semibold text-black uppercase">
                  <Text>{swip.selected.name}</Text>
                </span>
              </div>
              <span className="text-black">/</span>
              <div className="flex items-center gap-2">
                <img src={`${to.selected.icon}`} alt="no image" className="w-[40px] rounded-full" />
                <span className="font-semibold text-black uppercase">
                  {' '}
                  <Text>{to.selected.name}</Text>
                </span>
              </div>
            </div>
            <ChartContainer className="flex items-center gap-1 font-medium px-1 py-1 rounded-lg border text-pink900 w-fit xl:col-span-1 col-span-2 max-xl:row-start-3 max-xl:row-end-4">
              {['5m', '15m', '1H', '4H', '1D', '1W'].map(duration => (
                <div key={duration}>
                  <ChartBtn
                    className={`py-1 px-2 hover:bg-pink900  hover:text-white rounded-md ${
                      activeBtn === duration ? 'bg-pink900  text-white' : ''
                    }`}
                    onClick={() => setActiveBtn(duration)}
                  >
                    {duration}
                  </ChartBtn>
                </div>
              ))}
            </ChartContainer>
            <div className="font-bold text-xl max-xl:col-span-2 text-black text-left">
              <Text>Charts coming soon</Text>
            </div>
          </header>
          <div className="my-5 sm:h-[300px] h-[200px]">
            <RechartGraph />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full py-10">No currencies selected</div>
      )}
    </div>
  )
}
