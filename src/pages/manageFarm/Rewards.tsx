import React, { useEffect, useState } from 'react'
import { logo } from '../../assets'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useFarmStakingContract } from 'hooks/useContract'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'

const ContainerRewards = styled.div`
  background-color: #ff894596;

  .elips {
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Button = styled.button`
  background-color: #ff8138;
  padding: 15px;
  font-size: 17px;
  border: none;
  outline: none;
  cursor: pointer;
`

export default function Rewards() {
  const { id }: any = useParams()
  const { account, library } = useWeb3React()
  const farmContract: any = useFarmStakingContract()
  const signer = library.getSigner(account)
  const farmContractWithSigner = farmContract.connect(signer)
  const [reward, setReward] = useState<any>()
  function toggleWalletModal(event: any): void {
    throw new Error('Function not implemented.')
  }
  //TODO: contract must return the pair
  const harvestFarm = async () => {
    try {
      await farmContractWithSigner.harvestFarm(id)

      toast.success('You have harvest the reward successfully')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong.')
    }
  }

  const getUserRewards = async () => {
    try {
      const farmReward: any = await farmContractWithSigner.callStatic.getCompleteReward(id)

      const etherValue = ethers.utils.formatEther(farmReward)

      console.log(farmReward)
      setReward(etherValue)
    } catch (error) {
      setReward(0)
      console.log(error)
    }
  }
  getUserRewards()
  useEffect(() => {
    const interval = setInterval(async () => {
      await getUserRewards()
    }, 60000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <ContainerRewards className="basis-3/5 bg-[#ff894596] p-5 rounded-2xl text-left">
      <div>
        <p className="text-gray-600 font-medium mb-1 text-gray">Pending Rewards</p>
        <div className="font-medium mb-1 text-xl fic gap-1 text-white">
          <p className="elips">{reward}</p>
        </div>
      </div>
      <Button className="bg-orange500 text-white w-full py-[14px] rounded-2xl custom-shadow font-semibold mt-8 hover:bg-[#ff8138]">
        {account ? <span onClick={harvestFarm}>Harvest</span> : <span onClick={toggleWalletModal}>Connect Wallet</span>}
      </Button>
    </ContainerRewards>
  )
}
