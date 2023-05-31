import React, { useState } from 'react'
import { logo } from '../../assets'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ButtonLight } from '../../components/Button'
import { useDonkStakingContract } from 'hooks/useContract'
import { useDonkTokenContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useWalletModalToggle } from 'state/application/hooks'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

const Input = styled.input`
  border: none;
  background: none;
  width: 100%;
  font-size: 17px;
  outline: none;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
  ::placeholder {
    color: #9ca3b4;
    font-size: 17px;
  }
`

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`

const Card = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
`

export default function StakeUnStake() {
  const { account, library } = useWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const stakingContract: any = useDonkStakingContract()
  const tokenContract: any = useDonkTokenContract()
  const [stakeUnStake, setStakeUnStake] = useState('Stake')
  const [stakeAmount, setStakeAmount] = useState('')
  const [stakeReward, setStakeReward] = useState('0')
  const [totalUserStaked, setTotalUserStaked] = useState('0')

  const stakeToken = async () => {
    if (stakeAmount == '') return toast.warning('You should have an amount to stake!')

    toast.info(`Starting the staking with ${stakeAmount} amount of tokens.`)
    //converting amount
    const amount = ethers.utils.parseUnits(stakeAmount, 18)

    // Aproving Token

    const currentAllowance = await tokenContract.allowance(account, stakingContract.address)

    if (currentAllowance < amount) {
      await tokenContract.approve(stakingContract.address, amount)
    }

    // Staking tokens

    const signer = library.getSigner(account)

    const stakingContractWithSigner = stakingContract.connect(signer)

    try {
      const staking = await stakingContractWithSigner.stake(amount)
      await staking.wait()

      toast.success(`Sucessfully staked ${stakeAmount} amount of tokens.`)
      return getStakedBalance()
    } catch (error) {
      console.log(error)
      return toast.error('Something went wrong.')
    }
  }

  const unstakeToken = async () => {
    if (totalUserStaked == '0') return toast.warning('You should have an amount to unstake!')

    toast.info(`Starting the unstake for ${totalUserStaked} amount of tokens and harvesting ${stakeReward} tokens.`)
    //unstaking tokens
    const signer = library.getSigner(account)

    const stakingContractWithSigner = stakingContract.connect(signer)

    try {
      const staking = await stakingContractWithSigner.unstake()
      await staking.wait()

      toast.success(`Successfully unstaked ${totalUserStaked} amount of tokens and harvested ${stakeReward} tokens.`)
      return getStakedBalance()
    } catch (error) {
      console.log(error)
      return toast.error('Something went wrong.')
    }
  }

  const harvestToken = async () => {
    if (stakeReward == '0') return toast.warning('You should have an reward amount to harvest!')

    toast.info(`Starting the harvesting for ${stakeReward} amount of tokens.`)
    //harvesting rewards
    const signer = library.getSigner(account)

    const stakingContractWithSigner = stakingContract.connect(signer)

    try {
      const staking = await stakingContractWithSigner.harvest()
      await staking.wait()

      toast.success(`Successfully harvested ${stakeReward} amount of tokens`)
      return getCurrentRewardAmount()
    } catch (error) {
      console.log(error)
      return toast.error('Something went wrong.')
    }
  }

  const getCurrentStakeTab = async () => {
    //verifing the tab
    if (stakeUnStake === 'Stake') {
      stakeToken()
    } else {
      unstakeToken()
    }
  }

  const getStakedBalance = async () => {
    if (!account) return
    // Check staking balance
    const userBalance = await stakingContract.connect(account).getPositions()

    const amount = ethers.utils.formatUnits(userBalance.amountStaked)

    setTotalUserStaked(parseFloat(amount).toFixed(0))
  }
  getStakedBalance()

  const getCurrentRewardAmount = async () => {
    if (!account || !library) return

    const wallet = library.getSigner(account)
    const stakingContractWithSigner = stakingContract.connect(wallet)

    const reward = await stakingContractWithSigner.getRewards()

    const amount = ethers.utils.formatUnits(reward)

    setStakeReward(parseFloat(amount).toFixed(0))
  }
  getCurrentRewardAmount()

  setInterval(() => {
    getCurrentRewardAmount()
  }, 10000)

  const restake = async () => {
    const signer = library.getSigner(account)
    const stakingContractWithSigner = stakingContract.connect(signer)

    //converting amount

    await getCurrentRewardAmount()

    const amount = ethers.utils.parseUnits(stakeReward, 18)

    const amountConverted = stakeReward
    toast.info(`Starting the restaking with ${stakeReward} amount of tokens.`)

    try {
      const harvest = await stakingContractWithSigner.harvest()
      await harvest.wait()
      getCurrentRewardAmount()

      toast.success(`Successfully harvested ${stakeReward} amount of tokens.`)
      await getCurrentRewardAmount()

      // Staking tokens
      const staking = await stakingContractWithSigner.stake(amount)

      await staking.wait()
      //TODO: WHEN IT'S HIGHER AMOUNT IT CRASH
      toast.success(`Successfully Staked ${amountConverted} amount of tokens.`)

      getCurrentRewardAmount()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong.')
    }

    getStakedBalance()
  }

  return (
    <section>
      <ControlButtons className="font-semibold border-gray-300 text-black">
        <Button
          type="button"
          className="text-center flex-1 pb-2.5"
          borderBottom={stakeUnStake == 'Stake' ? 'solid 2px black' : ''}
          onClick={() => setStakeUnStake('Stake')}
        >
          <Text>Stake</Text>
        </Button>
        <Button
          type="button"
          className="text-center flex-1 pb-2.5"
          borderBottom={stakeUnStake === 'Unstake' ? 'solid 2px black' : ''}
          onClick={() => setStakeUnStake('Unstake')}
        >
          <Text>Unstake</Text>
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

      <Card className="grid grid-cols-2 mt-12 py-10 bg-white text-black rounded-2xl text-left p-5">
        <div className="font-semibold col-span-2 ">
          <p className="mb-1">
            <Text>Staked Balance</Text>
          </p>
          <div className="gap-2 flex">
            <img src={logo} alt="bitcoin" width={60} />
            <p>
              <Text>{totalUserStaked} Donk</Text>
            </p>
          </div>
        </div>
        <div className="font-semibold col-span-2 ">
          <p className="mb-1">
            <Text>Pending Rewards</Text>
          </p>
          <div className="gap-2 flex">
            <img src={logo} alt="litecoin" width={60} />
            <p>
              <Text>{stakeReward} Donk</Text>
            </p>
          </div>
        </div>
      </Card>
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
      <ButtonContainer>
        {account ? (
          <ButtonLight onClick={() => restake()} disabled={stakeReward == '0' ? true : false}>
            Restake
          </ButtonLight>
        ) : (
          <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
        )}
      </ButtonContainer>
    </section>
  )
}
