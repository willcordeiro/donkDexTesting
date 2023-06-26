import { BiSearch } from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import { useSearch } from 'react-use-search'
import FarmsCardss from './FarmCards'
import styled from 'styled-components'
import { useFarmStakingContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { PulseLoader } from 'react-spinners'
import { ethers } from 'ethers'

const predicate = (user: { rewardTokenName: string }, query: string) =>
  user.rewardTokenName.toLowerCase().includes(query.toLowerCase())

const Label = styled.label`
  border: 1px solid #9ca6b9;
  max-width: 24rem;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
`

const Input = styled.input`
  background: none;
  outline: none;
  border: none;
  font-size: 15px;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
  ::placeholder {
    font-size: 15px;
    font-weight: 500;
    color: #9ca6b9;
  }
`

const Text = styled.span`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

const SubText = styled.span`
  font-size: 0.9rem;

  font-weight: 500;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

const ClusterTimeDiv = styled.div`
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: white;
  text-align: left;
  z-index: 1;
  position: relative;
  height: 100%;
  max-height: 100px;
  padding: 7px;
  border-radius: 0.4rem;
  margin-bottom: 30px;
`

const ClusterTime = styled.span`
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: white;
  text-align: left;
  z-index: 1;
  position: relative;

  height: 100%;
  max-height: 100px;
  padding: 7px;
  border-radius: 0.4rem;
  background-color: #ff8e4c;
`

export default function Filter() {
  const { account, library } = useWeb3React()
  const farmContract: any = useFarmStakingContract()
  const signer = library.getSigner(account)
  const farmContractWithSigner = farmContract.connect(signer)
  const [data, setData] = useState<any[]>([])
  const [chainTime, setChainTime] = useState<string>()
  const allFarmData: any[] = []

  async function getkeys() {
    const allFarmsID = await farmContractWithSigner.callStatic.getFarmKeys()

    for (let i = 0; i < allFarmsID.length; i++) {
      const farmID = allFarmsID[i]
      const allFarms = await farmContract.getFarmByID(farmID)

      const farmData = {
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
      }
    }

    setData(allFarmData)
    console.log(allFarmData)
  }

  useEffect(() => {
    const interval = setInterval(function() {
      getkeys()
      getChainTime()
      console.log(data)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const [filteredUsers, query, handleChange] = useSearch(data, predicate, {
    filter: true,
    debounce: 200
  })

  async function getChainTime() {
    const timestemp = await farmContractWithSigner.callStatic.getTimestamp()
    const bigNumber = ethers.BigNumber.from(timestemp)
    const value = bigNumber.toNumber()
    const timestamp = value
    const date = new Date(timestamp * 1000)

    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)

    const dateString = `${month}/${day}/${year} ${hours}:${minutes}`

    setChainTime(dateString)
  }

  return (
    <>
      <div className="flex justify-between mb-10">
        <Label htmlFor="cardsearch" className="flex  flex-1 items-center gap-2 p-2 border border-gray-300 rounded-md ">
          <BiSearch color="black" size={20} />
          <Input
            type="text"
            id="search"
            value={query}
            onChange={handleChange}
            placeholder="Search by symbol or name"
            className="w-full text-sm "
          />
        </Label>
      </div>
      <ClusterTimeDiv>
        <ClusterTime>{chainTime}</ClusterTime>
        <SubText>
          <p> {`The date is retrieved from the blockchain and converted to the current user's local date.`} </p>
        </SubText>
      </ClusterTimeDiv>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {data.length !== 0 ? (
          filteredUsers.length !== 0 ? (
            filteredUsers.map((data, index) => <FarmsCardss key={index} data={data} />)
          ) : (
            <Text className="text-sm text-center pt-8">No matching farm found</Text>
          )
        ) : (
          <Text className="text-sm text-center ">
            {' '}
            <PulseLoader color="#ff8e4c" size={20} />
          </Text>
        )}
      </div>
    </>
  )
}
