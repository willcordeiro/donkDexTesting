import React, { useEffect, useState } from 'react'
import { c } from '../../assets'
import Harvest from './Harvest'
import ManageStakeUnstake from './ManageStakeUnstake'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useFarmStakingContract } from 'hooks/useContract'
import { Contract, ethers } from 'ethers'
import { toast } from 'react-toastify'
import { ERC20_ABI } from 'constants/abis/erc20'
import { getContract } from 'utils'

const ContainerHeader = styled.button`
  padding: 1rem;
  background-color: #f5d273;
  border: none;
  gap: 0.25rem;
  border-radius: 1.5rem;
  max-height: 78px;
`

const Button = styled.button`
  outline: none;
  background: none;
  border: none;
  margin-top: 17px;
  cursor: pointer;
`

const Container = styled.div`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#f1ece9' : '#191924')};
`

export default function ManageFarm() {
  const { id }: any = useParams()
  const { account, library } = useWeb3React()
  const farmContract: any = useFarmStakingContract()
  const signer = library.getSigner(account)
  const farmContractWithSigner = farmContract.connect(signer)
  const [data, setData] = useState<any>()
  const allFarmData: any[] = []
  const mappedData: any[] = []
  const [stakeUnStake, setStakeUnStake] = useState('Stake')
  const [farm, setFarm] = useState({
    LpTokenAmount: ''
  })

  const CheckFields = () => {
    if (farm.LpTokenAmount !== undefined && farm.LpTokenAmount !== '') {
      if (stakeUnStake === 'Stake') {
        stakeFarm()
      } else {
        unstakeFarm()
      }
    } else {
      toast.error('Something went wrong! Please add an amount to start a farm')
    }
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  function contract(address: string, ABI: any, withSignerIfPossible = true): Contract | null {
    return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
  }

  const stakeFarm = async () => {
    const lpTokenAmount = ethers.utils.parseUnits(farm.LpTokenAmount.toString(), 18).toString()

    const TokenContract: any = contract(data.farmTokenAddress, ERC20_ABI)

    const currentTaxAllowance = await TokenContract.allowance(account, farmContract.address)

    if (currentTaxAllowance < lpTokenAmount) {
      try {
        await TokenContract.approve(farmContract.address, lpTokenAmount)
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong with token approval.')
        return
      }
    }

    try {
      const farmStart: any = await farmContractWithSigner.startFarm(id, lpTokenAmount)

      await farmStart.wait()
      toast.success('You have joined the farm successfully')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong with starting the farm.')
    }
  }

  const unstakeFarm = async () => {
    try {
      const farmUntake: any = await farmContractWithSigner.unstakeFarm(id)

      await farmUntake.wait()
      toast.success('You have left the farm successfully')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong.')
    }
  }

  async function getkeys() {
    const allFarmsID = await farmContractWithSigner.callStatic.getFarmKeys()

    for (let i = 0; i < allFarmsID.length; i++) {
      const farmID = allFarmsID[i]
      const allFarms = await farmContract.getFarmByID(farmID)

      const farmData: any = {
        farmID: allFarms[0],
        creator: allFarms[1],
        rewardTokenAddress: allFarms[2],
        farmTokenAddress: allFarms[3],
        rewardTokenName: allFarms[4],
        rewardTokenAmount: allFarms[5].toString(),
        initialDate: allFarms[6].toString(),
        endDate: allFarms[7].toString(),
        rewardPerDay: allFarms[8].toString(),
        isActive: allFarms[9],
        pair0: allFarms[10],
        pair1: allFarms[11]
      }

      const existingFarm = allFarmData.find(farm => farm.farmID === farmData.farmID)

      if (!existingFarm) {
        allFarmData.push(farmData)

        if (farmData.farmID === id) {
          mappedData.push(farmData)
        }
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      await getkeys()
      setData(mappedData[0])
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Container className="bg-pink100 pt-3 pb-14">
      <section className="max-w-5xl w-[90%] mx-auto">
        <div className="justify-between w-full">
          <ContainerHeader className="fic gap-1 relative rounded-3xl justify-between w-full">
            <div className="flex">
              <Link to="/Farm">
                <Button type="button" className="font-semibold p-2">
                  <AiOutlineArrowLeft fontSize="30px" />
                </Button>
              </Link>
              <p className="font-medium text-2xl text-black">Manage Farm</p>{' '}
            </div>
            <img src={c} alt="c" width={176} />
          </ContainerHeader>
        </div>

        <main className="flex max-lg:flex-col gap-5 mt-8">
          <Harvest data={data} />
          <ManageStakeUnstake
            data={data}
            farm={setFarm}
            startFarm={CheckFields}
            stakeUnStake={stakeUnStake}
            setStakeUnStake={setStakeUnStake}
          />
        </main>
      </section>
    </Container>
  )
}
