import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useFarmStakingContract } from 'hooks/useContract'
import { ethers } from 'ethers'

const ContainerValue = styled.div`
  max-width: 32rem;
  position: relative;
  margin: 20px;
  margin-top: 100px;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#1f202e')};
  border-radius: 1rem;
  z-index: 1;
  max-height: 25rem;
  border-radius: 1.25rem;
  text-align: left;
  padding: 20px;

  @media (max-width: 850px) {
    max-width: 32rem;
    margin: 0px;
    margin-bottom: 10px;
  }
`

const Container = styled.div`
  position: relative;
  max-width: 32rem;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#1f202e')};
  border-radius: 1rem;
  z-index: 1;
  height: 100%;
  border-radius: 1.25rem;
  text-align: left;
  padding: 20px;
  margin-top: 100px;
`

const Card = styled.div`
  background-color: #ff8e4c;
  border-radius: 0.5rem;
  padding: 20px;
  margin-bottom: 20px;
`

const Text = styled.span`
  color: white;
  font-size: 18px;
`

const MainText = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#1f202e' : 'white')};
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
`

const Label = styled.label`
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

const SubText = styled.span`
  margin-bottom: 100px;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#1f202e' : 'white')};
`

const Button = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  width: fit-content;
  max-width: 130px;
  margin: 0 12px;
  font-weight: 500;
  color: white;
  text-decoration: none;
  text-decoration: inherit;
  flex-basis: 100%;
  border-radius: 0.375rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 7px;
  padding-bottom: 7px;
  background-color: #ff8e4c;
  margin-bottom: 20px;
  :hover {
    opacity: 0.5;
  }
`

export default function AdminFarmPainel() {
  const { account, library } = useWeb3React()
  const signer = library.getSigner(account)
  const farmContract: any = useFarmStakingContract()
  const farmContractWithSigner = farmContract.connect(signer)
  const [unstakeFee, setUnstakeFee] = useState<any>()
  const [adminWallet, setAdminWallet] = useState<string>()
  const [adminFarmCreation, setAdminFarmCreation] = useState<any>()
  const [currentUnstakeFee, setCurrentUnstakeFee] = useState<Number>()
  const [currentAdminWallet, setCurrentAdminWallet] = useState<string>()
  const [currentFarmCreationFee, setCurrentFarmCreationFee] = useState<Number | string>()

  const handleUnstakeFee = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setUnstakeFee(value)
  }

  const handleAdminWallet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setAdminWallet(value)
  }

  const handleDaysFee = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    const converted = ethers.utils.parseUnits(value, 18)

    setAdminFarmCreation(converted)
  }

  async function getCurrentValues() {
    const currentUnstakeFee = await farmContractWithSigner.callStatic.userTaxAmount()
    const adminConvertion = ethers.BigNumber.from(currentUnstakeFee)
    const unstakeFee = adminConvertion.toNumber()
    const adminFormated = unstakeFee

    setCurrentUnstakeFee(adminFormated)

    const currentAdminWallet = await farmContractWithSigner.callStatic.adminWallet()
    setCurrentAdminWallet(addDotsToAddress(currentAdminWallet))

    const currentDaysFee = await farmContractWithSigner.callStatic.taxAmount()
    const daysFeeConvertion = ethers.BigNumber.from(currentDaysFee)
    const daysFeeFormated = ethers.utils.formatEther(daysFeeConvertion)

    setCurrentFarmCreationFee(daysFeeFormated)
  }

  function addDotsToAddress(address: string) {
    if (address.length <= 8) {
      return address // Endereço curto, não precisa de pontos intermediários
    }

    const startChunk = address.substring(0, 4)
    const endChunk = address.substring(address.length - 4)
    return `${startChunk}...${endChunk}`
  }

  const changeUnstakeFee = async () => {
    await farmContractWithSigner.setUserTaxAmount(unstakeFee)
  }

  const changeAdminWallet = async () => {
    await farmContractWithSigner.setAdminWallet(adminWallet)
  }

  const changeDaysFee = async () => {
    await farmContractWithSigner.setCreatorTaxes(adminFarmCreation)
  }

  useEffect(() => {
    const interval = setInterval(function() {
      getCurrentValues()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      <ContainerValue>
        <Card>
          <Text>Current Unstake Fee {currentUnstakeFee} %</Text>
        </Card>
        <Card>
          <Text>Current Admin Wallet {currentAdminWallet}</Text>
        </Card>
        <Card>
          <Text>Current Farm Creaton fee {currentFarmCreationFee} </Text>
        </Card>
      </ContainerValue>

      <Container>
        <MainText>Painel</MainText>
        <br />
        <SubText>(Farm)</SubText>
        <br /> <br />
        <Card>
          <Text>Unstake Fee</Text>
          <br />
          <Label
            htmlFor="cardsearch"
            className="flex  flex-1 items-center gap-2 p-2 border border-gray-300 rounded-md "
          >
            <Input
              type="text"
              id="search"
              placeholder="Enter an amount"
              className="w-full text-sm "
              onChange={handleUnstakeFee}
            />
          </Label>
        </Card>
        <Button onClick={() => changeUnstakeFee()}>update</Button>
        <Card>
          <Text>Change the admin wallet</Text>
          <br />
          <Label
            htmlFor="cardsearch"
            className="flex  flex-1 items-center gap-2 p-2 border border-gray-300 rounded-md "
          >
            <Input
              type="text"
              id="search"
              placeholder="Enter an address"
              className="w-full text-sm "
              onChange={handleAdminWallet}
            />
          </Label>
        </Card>
        <Button onClick={() => changeAdminWallet()}>update</Button>
        <Card>
          <Text>Farm Creaton fee </Text>
          <br />
          <Label
            htmlFor="cardsearch"
            className="flex  flex-1 items-center gap-2 p-2 border border-gray-300 rounded-md "
          >
            <Input
              type="text"
              id="search"
              placeholder="Enter an amount"
              className="w-full text-sm "
              onChange={handleDaysFee}
            />
          </Label>
        </Card>
        <Button onClick={() => changeDaysFee()}>update</Button>
      </Container>
    </div>
  )
}
