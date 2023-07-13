import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SelectPool from './SelectPool'
import RewardSection from './RewardSeciton'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { useFarmStakingContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { Contract, ethers } from 'ethers'
import { getContract } from 'utils'
import { ERC20_ABI } from 'constants/abis/erc20'
import { DEFAULT_CURRENCIES } from '@donkswap/sdk'

const Container = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#f1ece9' : '#191924')};
  text-align: left;
`

const MainText = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#46362f' : 'white')};
`

const InfoCard = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '' : 'white')};
`

const ButtonLink = styled.button`
  width: 100%;
  border-radius: 0.75rem;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: none;
`
const Text2 = styled.p`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

const Text = styled.p`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
  margin-top: 10px;
`

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  min-width: 350px;

  overflow: scroll;

  @media (max-width: 768px) {
    max-height: 500px;
  }
`

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #ff8e4c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

const ButtonCreate = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #ff8e4c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 30px;
`

const ListReview = styled.p`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e9e9f1' : '#1f202e')};
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
  border: none;
  border-radius: 4px;
`

export default function CreateFarm() {
  const { account, library } = useWeb3React()
  const farmContract: any = useFarmStakingContract()
  const [isOpen, setIsOpen] = useState(false)
  const [msg, setMsg] = useState(false)
  const [farmPool, setFarmPool] = useState({
    pool: { address: '', name: '', pair1: '', pair2: '' }
  })

  const [farm, setFarm] = useState<any>({
    startDate: '',
    startDateNormal: '',
    endDate: '',
    endNormal: '',
    durationDays: '',
    tokenAmount: '',
    estimateReward: '',
    error: '',
    currency0: { address: '', symbol: '' }
  })

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const CheckFields = () => {
    if (
      farmPool.pool !== undefined &&
      farm.startDate !== undefined &&
      farm.startDateNormal !== undefined &&
      farm.endDate !== undefined &&
      farm.endNormal !== undefined &&
      farm.durationDays !== undefined &&
      farm.tokenAmount !== undefined &&
      farm.estimateReward !== undefined &&
      farm.error !== undefined &&
      farm.currency0 !== null &&
      msg === false
    ) {
      const tokenIsETH: any = farm.currency0 && DEFAULT_CURRENCIES.includes(farm.currency0)

      CreateFarm(tokenIsETH)
    } else {
      toast.error('Something went wrong! Please check the fields')
    }
  }

  function contract(address: string, ABI: any, withSignerIfPossible = true): Contract | null {
    return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
  }

  const CreateFarm = async (isETH: boolean) => {
    //converting amount
    const rewardTokenAmount = ethers.utils.parseUnits(farm.tokenAmount.toFixed(18).toString(), 18).toString()
    const estimateTokenAmount = ethers.utils.parseUnits(farm.estimateReward.toFixed(18).toString(), 18).toString()

    // Aproving Token

    //reward token
    if (!isETH) {
      const rewardTokenContract: any = contract(farm.currency0.address, ERC20_ABI)

      //TODO: reward token address allowance issue

      const rewardAllowance = await rewardTokenContract.allowance(account, farmContract.address)

      if (rewardAllowance < rewardTokenAmount) {
        await rewardTokenContract.approve(farmContract.address, rewardTokenAmount)
        await new Promise(resolve => {
          // Wait for approval confirmation
          const intervalId = setInterval(async () => {
            const updatedAllowance = await rewardTokenContract.allowance(account, farmContract.address)
            if (updatedAllowance >= rewardTokenAmount) {
              clearInterval(intervalId)
              resolve()
            }
          }, 1000)
        })
      }
    }

    //creating farm
    const signer = library.getSigner(account)

    const farmContractWithSigner = farmContract.connect(signer)

    try {
      if (isETH) {
        const data = { value: rewardTokenAmount }

        await farmContractWithSigner.createFarmETH(
          farmPool.pool.address,
          farm.currency0.symbol,
          farm.startDate,
          farm.endDate,
          estimateTokenAmount,
          farmPool.pool.pair1,
          farmPool.pool.pair2,
          data
        )

        toast.success('The farm has been created successfully')
      } else {
        await farmContractWithSigner.createFarm(
          farm.currency0.address,
          farmPool.pool.address,
          farm.currency0.symbol,
          rewardTokenAmount,
          farm.startDate,
          farm.endDate,
          estimateTokenAmount,
          farmPool.pool.pair1,
          farmPool.pool.pair2
        )
        toast.success('The farm has been created successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong with farm creation.')
    }
  }

  /*
  useEffect(() => {
    console.log(farm)
  }, [farm])
*/
  return (
    <Container className="bg-pink100  min-h-[80vh]">
      <section className="max-w-6xl w-[90%] mx-auto">
        <Link to="/farm">
          <ButtonLink type="button" className="fic gap-1 font-semibold px-2 py-2 mb-4">
            <Text2>
              <AiOutlineArrowLeft fontSize="14px" />
            </Text2>
            <Text2>Back to Farms List</Text2>
          </ButtonLink>
        </Link>
        <header>
          <div className="flex items-center gap-2 mb-8">
            <h2 className="font-semibold sm:text-3xl text-3xl text-black">
              <MainText>Create a Farm</MainText>
            </h2>
          </div>
        </header>
        <Text2> {` Don't see a pool you joined?`}</Text2>
        <ButtonLink type="button" className="fic gap-1 font-semibold px-2 py-2 mb-4">
          <Link to="/find">
            <span style={{ color: '#ff8e4c' }}>Import it.</span>{' '}
          </Link>
        </ButtonLink>
        <section>
          <SelectPool farm={setFarmPool} />
        </section>
        <section>
          <RewardSection farm={setFarm} msg={setMsg} />
        </section>

        <InfoCard>
          <span style={{ color: '#f84525' }}>Please note:</span> Rewards allocated to farms are final and unused rewards
          cannot be claimed. 60 USDT is collected as an Ecosystem farm creation fee. Token rewards should have a minimum
          duration period of at least 7 days and last no more than 90 days.
        </InfoCard>
      </section>
      <div className="text-center mt-8">
        <Button onClick={togglePopup} disabled={false}>
          Review Farm
        </Button>
        {isOpen && (
          <PopupContainer>
            <div className="text-left">
              <Button onClick={togglePopup}>Close</Button>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold sm:text-3xl text-3xl text-black">
                  <MainText>Review Farm</MainText>
                </h2>
              </div>
              <Text>Pool: </Text>
              <ListReview>{farmPool.pool?.name}</ListReview>
              <Text>Reward Token: </Text>
              <ListReview> {farm.currency0?.symbol}</ListReview>
              <Text>Reward Token Amount: </Text>
              <ListReview> {farm.tokenAmount} tokens</ListReview>
              <Text>Duration: </Text>
              <ListReview> {farm.durationDays} Days</ListReview>
              <Text>Farming Starts: </Text>
              <ListReview> {farm.startDateNormal?.toString()} </ListReview>
              <Text>Farming Ends: </Text>
              <ListReview> {farm.endNormal?.toString()} </ListReview>
              <Text>Estimated rewards / day: </Text>
              <ListReview> {farm.estimateReward} tokens</ListReview>
            </div>
            <ButtonCreate onClick={CheckFields}>Create Farm</ButtonCreate>
          </PopupContainer>
        )}
      </div>
    </Container>
  )
}
