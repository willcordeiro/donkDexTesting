import React, { useState, useEffect } from 'react'
import { logo } from '../../assets'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ButtonLight } from '../../components/Button'
import { useDonkStakingContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useWalletModalToggle } from 'state/application/hooks'
const ControlButtons = styled.div`
  display: flex;
  border-bottom: solid 1px rgb(209 213 219);
  margin-bottom: 20px;
`

const Button = styled.button<any>`
  background: none;
  outline: none;
  border: none;
  font-size: 18px;
  font-weight: 600;
  border-bottom: ${({ borderBottom }) => borderBottom};
  cursor: pointer;
`
Button.propTypes = {
  borderBottom: PropTypes.string
}

const ContainerInput = styled.div`
  border: solid 1px rgb(209 213 219);
  border-radius: 0.75rem;
  padding: 0.25rem;
  padding-left: 1rem;
`

const Label = styled.label`
  display: flex;
  justify-content: space-between;
`

const Input = styled.input`
  border: none;
  background: none;
  width: 100%;
  font-size: 17px;
  outline: none;
  ::placeholder {
    color: #9ca3b4;
    font-size: 17px;
  }
`

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`

export default function StakeUnStake() {
  const { account } = useWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const stakingContract = useDonkStakingContract()
  const [stakeUnStake, setStakeUnStake] = useState('Stake')
  const [stakeAmount, setStakeAmount] = useState('')
  const [stakeReward, setStakeReward] = useState('')

  useEffect(() => {
    console.log(stakeAmount)
  }, [stakeAmount])

  const stakeToken = () => {
    if (stakeAmount === '') return

    console.log('staking...')
  }

  const unstakeToken = () => {
    console.log('unstaking...')
  }

  const harvestToken = () => {
    console.log('harvesting...')
  }

  const getCurrentStakeTab = () => {
    if (stakeUnStake === 'Stake') {
      stakeToken()
    } else {
      unstakeToken()
    }
  }

  /*


  

  const getStakedBalance = () => {}

  const getCurrentRewardAmount = () => {      
  }

  setInterval( getCurrentRewardAmount(), 60000);


*/
  return (
    <section>
      <ControlButtons className="font-semibold border-gray-300 text-black">
        <Button
          type="button"
          className="text-center flex-1 pb-2.5"
          borderBottom={stakeUnStake == 'Stake' ? 'solid 2px black' : ''}
          onClick={() => setStakeUnStake('Stake')}
        >
          Stake
        </Button>
        <Button
          type="button"
          className="text-center flex-1 pb-2.5"
          borderBottom={stakeUnStake === 'Unstake' ? 'solid 2px black' : ''}
          onClick={() => setStakeUnStake('Unstake')}
        >
          Unstake
        </Button>
      </ControlButtons>
      {stakeUnStake === 'Stake' ? (
        <ContainerInput>
          <Label>
            <Input type="number" placeholder="Enter Amount" onChange={(e: any) => setStakeAmount(e.target.value)} />

            <div className="fic gap-2 bg-white py-2 px-3 rounded-lg ml-1">
              <img src={logo} alt="logo" width={40} />
              <p className="font-semibold text-sm">Donk</p>
            </div>
          </Label>
        </ContainerInput>
      ) : (
        ''
      )}
      <ButtonContainer>
        {account ? (
          <ButtonLight onClick={() => getCurrentStakeTab()}>{stakeUnStake}</ButtonLight>
        ) : (
          <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
        )}
      </ButtonContainer>
      <div className="grid grid-cols-2 mt-12 py-10 bg-white text-black rounded-2xl text-left p-5">
        <div className="font-semibold col-span-2 ">
          <p className="mb-1">Staked Balance</p>
          <div className="gap-2 flex">
            <img src={logo} alt="bitcoin" width={60} />
            <p>0 Donk</p>
          </div>
        </div>
        <div className="font-semibold col-span-2 ">
          <p className="mb-1">Pending Rewards</p>
          <div className="gap-2 flex">
            <img src={logo} alt="litecoin" width={60} />
            <p>0 Donk</p>
          </div>
        </div>
      </div>
      <ButtonContainer>
        <div className="col-span-2 text-center">
          {' '}
          {account ? (
            <ButtonLight
              onClick={() => {
                harvestToken()
              }}
            >
              Harvest
            </ButtonLight>
          ) : (
            <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
          )}
        </div>
      </ButtonContainer>
    </section>
  )
}
