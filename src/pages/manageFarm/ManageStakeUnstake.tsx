import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  padding-bottom: 15px;
`

const Button = styled.button<any>`
  outline: none;
  background: none;
  border: none;
  color: black;
  font-weight: bold;
  font-size: 17px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e8eaed;
  border-bottom: ${({ borderBottom }) => borderBottom};
  cursor: pointer;
`

Button.propTypes = {
  borderBottom: PropTypes.string
}

const ButtonSubmit = styled.button`
  background-color: #ff8138;
  padding: 15px;
  font-size: 17px;
  border: none;
  outline: none;
  margin-top: 200px;
  cursor: pointer;
`

const Input = styled.input`
  padding: 10px;
  border-radius: 0.75rem;
  border: 1px solid #9ca3b0;

  ::placeholder {
    color: #9ca3b0;
    font-weight: 450;
    font-size: 15px;
  }
`

const ContainerSection = styled.section`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
`
const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

export default function ManageStakeUnstake() {
  const [stakeUnStake, setStakeUnStake] = useState('Stake')

  return (
    <ContainerSection className="rounded-2xl bg-white  flex-1">
      <Container className="fic font-semibold border-gray-300 ">
        <Button
          type="button"
          className={`${stakeUnStake === 'Stake' ? 'border-black  border-b-2' : ''} text-center flex-1 pb-3 pt-5`}
          onClick={() => setStakeUnStake('Stake')}
          borderBottom={stakeUnStake == 'Stake' ? 'solid 2px black' : ''}
        >
          <Text>Stake</Text>
        </Button>
        <Button
          type="button"
          className={`${stakeUnStake === 'Unstake' ? 'border-black  border-b-2' : ''} text-center flex-1 pb-3 pt-5`}
          onClick={() => setStakeUnStake('Unstake')}
          borderBottom={stakeUnStake == 'Unstake' ? 'solid 2px black' : ''}
        >
          <Text> Unstake</Text>
        </Button>
      </Container>
      <div className="px-6 py-4 flex justify-between flex-col h-[87%]">
        <div>
          <label htmlFor="minute" className="flex items-center gap-1 rounded-xl border  p-1 pl-4 border-gray-300 my-3">
            <Input
              type="number"
              className=" bg-transparent focus:bg-transparent outline-none flex-1 w-full"
              placeholder="Enter Amount of LP Tokens"
            />
          </label>
          <label htmlFor="minute" className="flex items-center gap-1 rounded-xl border  p-1 pl-4 border-gray-300 my-3">
            <Input
              type="number"
              className=" bg-transparent focus:bg-transparent outline-none flex-1 w-full"
              placeholder="Enter the APR"
            />
          </label>
          <div className="fic justify-between gap-3 px-1 my-1">
            <p className="text-sm font-medium text-black">
              <Text>LP Token Balance</Text>
            </p>
            <p className="text-black">
              <Text>0</Text>
            </p>
          </div>
          <div className="fic justify-between px-1 mt-5 relative ">
            <Link to="/pool/lp-token" className="font-medium  hover:underline text-black">
              <Text> Get LP Token</Text>
            </Link>
            {/*<Settings />*/}
          </div>
        </div>
        <div>
          {' '}
          <ButtonSubmit className="bg-orange500 text-white w-full py-[14px] rounded-2xl custom-shadow font-semibold mt-8 hover:bg-[#ff8138]">
            <Text>Connect Wallet</Text>
          </ButtonSubmit>
        </div>
      </div>
    </ContainerSection>
  )
}
