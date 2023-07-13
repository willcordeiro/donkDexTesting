import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useFactoryContract } from 'hooks/useContract'
import { ethers } from 'ethers'
import AdminStakingPainel from './stakingAdmin'
import AdminFarmPainel from './FarmAdmin'

const ContainerValue = styled.div`
  max-width: 32rem;
  position: relative;
  margin: 20px;
  margin-top: 0;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#1f202e')};
  border-radius: 1rem;
  z-index: 1;
  max-height: 20rem;
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

export default function AdminPainel() {
  const { account, library } = useWeb3React()
  const signer = library.getSigner(account)
  const factoryContract: any = useFactoryContract()
  const farmContractWithSigner = factoryContract.connect(signer)
  const [adminFee, setAdminFee] = useState<Number>()
  const [adminWallet, setAdminWallet] = useState<string>()
  const [adminDaysFee, setAdminDaysFee] = useState<Number>()

  const [currentAdminFee, setCurrentAdminFee] = useState<Number>()
  const [currentAdminWallet, setCurrentAdminWallet] = useState<string>()
  const [currentAdminDaysFee, setCurrentAdminDaysFee] = useState<Number>()

  const handleAdminFee = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    const converted = Number(value) * 100
    setAdminFee(converted)
  }

  const handleAdminWallet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setAdminWallet(value)
  }

  const handleDaysFee = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    const converted = Number(value) * 100
    setAdminDaysFee(converted)
  }

  async function getCurrentValues() {
    const currentAdminFee = await farmContractWithSigner.callStatic.getAdminFee()
    const adminConvertion = ethers.BigNumber.from(currentAdminFee)
    const adminFee = adminConvertion.toNumber()
    const adminFormated = adminFee / 100

    setCurrentAdminFee(adminFormated)

    const currentAdminWallet = await farmContractWithSigner.callStatic.feeToSetter()
    setCurrentAdminWallet(addDotsToAddress(currentAdminWallet))

    const currentDaysFee = await farmContractWithSigner.callStatic.daysFee()
    const daysFeeConvertion = ethers.BigNumber.from(currentDaysFee)
    const daysFee = daysFeeConvertion.toNumber()
    const daysFeeFormated = daysFee / 100

    setCurrentAdminDaysFee(daysFeeFormated)
  }

  function addDotsToAddress(address: string) {
    if (address.length <= 8) {
      return address // Endereço curto, não precisa de pontos intermediários
    }

    const startChunk = address.substring(0, 4)
    const endChunk = address.substring(address.length - 4)
    return `${startChunk}...${endChunk}`
  }

  const changeAdminFee = async () => {
    await farmContractWithSigner.setAdminFee(adminFee)
  }

  const changeAdminWallet = async () => {
    await farmContractWithSigner.setFeeToSetter(adminWallet)
  }

  const changeDaysFee = async () => {
    await farmContractWithSigner.setDaysFee(adminDaysFee)
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
    <>
      <div>
        <ContainerValue>
          <Card>
            <Text>Current Admin Fee {currentAdminFee} %</Text>
          </Card>
          <Card>
            <Text>Current Admin Wallet {currentAdminWallet}</Text>
          </Card>
          <Card>
            <Text>Current Days Fee {currentAdminDaysFee} %</Text>
          </Card>
        </ContainerValue>

        <Container>
          <MainText>Painel</MainText>
          <br />
          <SubText>(Trade and Pools)</SubText>
          <br /> <br />
          <Card>
            <Text>Admin Fee</Text>
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
                onChange={handleAdminFee}
              />
            </Label>
          </Card>
          <Button onClick={() => changeAdminFee()}>update</Button>
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
            <Text>Days Fee</Text>
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

      <AdminStakingPainel />

      <AdminFarmPainel />
    </>
  )
}
