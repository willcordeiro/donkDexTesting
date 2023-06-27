import React, { useEffect, useState } from 'react'
import Rewards from './Rewards'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { c, logo } from '../../assets'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import { PulseLoader } from 'react-spinners'
import { useWeb3React } from '@web3-react/core'
import { useFarmStakingContract } from 'hooks/useContract'
import { ethers } from 'ethers'
import { Console } from 'console'

const ContainerHarvest = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`
const Container = styled.section`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
`
const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

export default function Harvest({ data }: any) {
  const { account, library } = useWeb3React()
  const signer = library.getSigner(account)
  const farmContract: any = useFarmStakingContract()
  const farmContractWithSigner = farmContract.connect(signer)
  const [totalStaked, setTotalStaked] = useState<any>()
  const [yourStake, setYourStake] = useState<any>()
  const [yourShare, setYourShare] = useState<any>()
  const { id }: any = useParams()

  async function getUserValues() {
    const totalStaked = await farmContractWithSigner.callStatic.stakedAmount(id)
    const yourStake = await farmContractWithSigner.callStatic.getPositionByUser(id, account)

    const [walletAddress, createdDate, amountStaked, rewardStaked, savedReward] = yourStake

    const stakeObject = {
      walletAddress: walletAddress,
      createdDate: createdDate,
      amountStaked: amountStaked,
      rewardStaked: rewardStaked,
      savedReward: savedReward
    }

    const bigNumber = ethers.BigNumber.from(totalStaked)
    const value = ethers.utils.formatUnits(bigNumber)

    const bigNumber2 = ethers.BigNumber.from(stakeObject.amountStaked)
    const value2 = ethers.utils.formatUnits(bigNumber2)

    setTotalStaked(value)
    setYourStake(value2)

    const share: number = (parseFloat(value) / parseFloat(value2)) * 100
    setYourShare(share)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getUserValues()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Container className="rounded-2xl bg-white basis-3/5 py-4 sm:px-10 px-5">
      {data?.rewardTokenName ? (
        <>
          {' '}
          <header>
            <ContainerHarvest className="fic flex-wrap gap-[6px] font-semibold text-xl mb-5 ">
              <img src={logo} alt="bitcoin" width={40} />
              <p className="uppercase text-black">
                <Text>LP Token</Text>
              </p>
              <span>
                <Text>/</Text>
              </span>
              <img src={EthereumLogo} alt="litecoin" width={40} />
              <p className="uppercase text-black">
                <Text>{data?.rewardTokenName}</Text>
              </p>
            </ContainerHarvest>
            <ContainerHarvest className="mb-4 flex justify-between py-4 gap-3 flex-wrap text-left">
              <div>
                <p className="font-medium text-pink900 mb-[1px] text-[15px] ">
                  <Text>Staked</Text>
                </p>
                <div className=" font-medium text-[15px] text-black">
                  <Text>{yourStake}</Text>
                </div>
              </div>
              <div>
                <p className="font-medium text-pink900 mb-[1px] text-[15px] ">
                  <Text>Total staked</Text>
                </p>
                <div className=" font-medium text-[15px] text-black">
                  <Text>{totalStaked}</Text>
                </div>
              </div>
              <div>
                <p className="font-medium text-pink900 mb-[1px] text-[15px] ">
                  <Text>Your share</Text>
                </p>
                <div className=" font-medium text-[15px] text-black">
                  <Text>{yourShare}%</Text>
                </div>
              </div>
            </ContainerHarvest>
          </header>
          <section className="flex md:items-center gap-3 max-md:flex-col">
            <Rewards />
          </section>
        </>
      ) : (
        <Text className="text-sm text-center ">
          {' '}
          <PulseLoader color="#ff8e4c" size={20} />
        </Text>
      )}
    </Container>
  )
}
