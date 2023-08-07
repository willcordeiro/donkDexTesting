import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers, BigNumber } from 'ethers'
import styled from 'styled-components'

import Modal from 'components/Modal'
import Web3Status from 'components/Web3Status'
import { ButtonPrimary } from 'components/Button'

import RubyImg from '../../assets/images/nfts/ruby.jpg'
import AmethystImg from '../../assets/images/nfts/amethyst.jpg'
import GoldImg from '../../assets/images/nfts/gold.jpg'
import SilverImg from '../../assets/images/nfts/silver.jpg'

import proofs from './proofs.json'
import contractAbi from './DONKGPU.json'
const contractAddress = '0x49db8C04Df2C699016c4AFdF23257a67AfbC7d3B'

type Properties = {
  isPublicSale: boolean
  isWhitelistSale: boolean
  pricePublic: BigNumber
  priceWL: BigNumber
  maxPerTxn: number
  totalSupply: number
  maxSupply: number
  whitelistSupply: number
  proof: null | string[]
  isWL: boolean
}

const Text = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

const Title = styled.h1`
  margin-bottom: 2rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 10px;
  place-content: center;
  width: min(1000px, 90vw);
  margin: auto;
`

const Card = styled.div`
  padding: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0.75rem;
  transition: all 300ms ease-in-out;
`
const CardRuby = styled(Card)`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'hsl(345, 60%, 92%)' : '#74434f')};
  :hover {
    border: solid 1px ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#74434f' : 'white')};
  }
`
const CardSilver = styled(Card)`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'hsl(195, 75%, 89%)' : '#4392ab')};
  :hover {
    border: solid 1px ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#4392ab' : 'white')};
  }
`
const CardGold = styled(Card)`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'hsl(44, 77%, 88%)' : '#a58c4e')};
  :hover {
    border: solid 1px ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#a58c4e' : 'white')};
  }
`
const CardAmethyst = styled(Card)`
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'hsl(240, 90%, 96%)' : '#2f3146')};
  :hover {
    border: solid 1px ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
  }
`

const TypeContainer = styled.div`
  max-width: auto;
  padding: 5px min(25px, 2vw);
  margin-top: -30px;
  z-index: 1;
`
const RubyType = styled(TypeContainer)`
  background-color: #d32e2a;
`
const SilverType = styled(TypeContainer)`
  background-color: #b7bacb;
`
const GoldType = styled(TypeContainer)`
  background-color: #fbce5b;
`

const AmethystType = styled(TypeContainer)`
  background-color: #81519b;
`

const Type = styled.h5`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
  margin: 0;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`

const AdditionalInfo = styled.h6`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
  margin: 0;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`

const Img = styled.img`
  width: min(250px, 35vw);
  transition: 0.3s cubic-bezier(0.6, 0.03, 0.28, 0.98);
  transform: scale(0.95);

  :hover {
    transform: scale(1);
    transition: 0.3s cubic-bezier(0.6, 0.03, 0.28, 0.98);
  }
`

const ConnectContainer = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: white;
  border-radius: 1.5rem;
  white-space: nowrap;
  width: 250px;
  cursor: pointer;
  margin: 25px auto;
`

const UIBox = styled.div`
  margin-top: 2rem;
  transition: all 300ms ease-in-out;
`

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  border-radius: 0.375rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

const InfoContainer = styled.div`
  border: gray solid;
  text-align: center;
  gap: 25px;
  background-color: white;
  padding: 50px;
  border-radius: 25px;
  width: min(1200px, 100%);
  margin: auto;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`

const MintGrid = styled.div`
  border: gray solid;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  background-color: white;
  padding: 50px;
  border-radius: 25px;
  width: min(1200px, 100%);
  margin: auto;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`

const ColumnContainer = styled.div`
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
    :nth-of-type(2) {
      border-top: 2px black solid;
    }
  }
`

const Price = styled.h1`
  @media (max-width: 768px) {
    font-size: 25px;
  }
`

const ControlsContainer = styled.div`
  display: flex;
  margin-bottom: 25px;
`

const Input = styled.input`
  background-color: white;
  width: 75px;
  height: 35px;
  text-align: center;
  font: inherit;
  font-size: 25px;
  margin-left: -10px;
  margin-right: -10px;
  color: black;
  border: 2px gray solid;
  margin-top: 7px;
`

const MainButton = styled(ResponsiveButtonPrimary)`
  font-size: x-large;
  font-weight: bold;
  text-transform: uppercase;
`

const InputButton = styled(ResponsiveButtonPrimary)`
  width: 50px;
  height: 50px;
  font-size: 25px;
  font-weight: bold;
`

const ModalContainer = styled.div`
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  width: 100%;
`

const Response = styled.p`
  word-wrap: normal;
  width: 100%;
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
`

const Mint = () => {
  const chain = localStorage.getItem('multiChain')
  if (chain === 'Arbitrum') {
    localStorage.setItem('multiChain', 'Polygon')
    location.reload()
  } else {
  }

  const { library, account, active } = useWeb3React()
  const [mintAmount, setMintAmount] = useState(1)
  const [metadataFetched, setMetadataFetched] = useState<boolean | null>(true)
  const [res, setRes] = useState('')
  const [showRes, setShowRes] = useState(false)

  const [properties, setProperties] = useState<Properties>({
    isPublicSale: false,
    isWhitelistSale: false,
    pricePublic: ethers.utils.parseEther('40'),
    priceWL: ethers.utils.parseEther('35'),
    maxPerTxn: 5,
    totalSupply: 0,
    maxSupply: 9000,
    whitelistSupply: 1000,
    proof: null,
    isWL: false
  })

  function getProof(address: string) {
    const result: string[] | null = proofs[address.toLowerCase()] || null
    return result
  }

  async function fetchData() {
    console.log('fetchdata')
    if (!(active && account && library)) {
      setMetadataFetched(false)
      return
    }
    try {
      const signer = library.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
      const isPublicSale = await contract.isPublicSaleEnabled()
      const isWhitelistSale = await contract.isWhitelistSaleEnabled()
      const pricePublic = await contract.publicPrice()
      const priceWL = await contract.whitelistPrice()
      const maxPerTxn = await contract.maxPerTransaction()
      const totalSupply = await contract.totalSupply()
      const maxSupply = await contract.maxSupply()
      const whitelistSupply = await contract.whitelistSupply()
      let proof = null
      let isWL = false

      if (isWhitelistSale && !isPublicSale) {
        proof = getProof(account)
        isWL = Boolean(proof)
      }
      const properties_ = {
        isPublicSale,
        isWhitelistSale,
        pricePublic,
        priceWL,
        maxPerTxn,
        totalSupply,
        maxSupply,
        whitelistSupply,
        proof,
        isWL
      }
      setProperties(properties_)
      setMetadataFetched(true)
    } catch (err) {
      console.error(err)
      setRes(err)
      setMetadataFetched(false)
    }
  }

  useEffect(() => {
    console.log(active)
    if (account) {
      fetchData()
    }
  }, [active, account, library])

  const handleDecrements = () => {
    if (mintAmount <= 1) return
    setMintAmount(mintAmount - 1)
  }

  const handleIncrements = () => {
    if (properties.maxPerTxn > 0 && mintAmount >= properties.maxPerTxn) return
    setMintAmount(mintAmount + 1)
  }

  async function handleWhitelistMint() {
    if (library) {
      const signer = library.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
      if (!properties.isWhitelistSale) {
        setRes('Whitelist sale not active')
        setShowRes(true)
        return
      }
      if (!properties.isWL || !properties.proof) {
        setRes('You cannot mint in whitelist phase')
        setShowRes(true)
        return
      }
      try {
        setRes('Waiting for confirmation...')
        setShowRes(true)
        console.log('Whitelist')
        const res = await contract.whitelistMint(BigNumber.from(mintAmount), properties.proof, {
          value: properties.priceWL.mul(BigNumber.from(mintAmount))
        })
        setRes('Transaction sent! Waiting for confirmation...')
        const receipt = await res.wait()
        if (receipt.status === 1) {
          setRes('Transaction confirmed!')
          setMintAmount(1)
          await fetchData()
        } else {
          setRes('Transaction was reverted :(')
        }
      } catch (err) {
        if (err.code === -32603) {
          setRes('Not enough MATIC')
        } else if (err.code === 'ACTION_REJECTED') {
          setRes('You have rejected the transaction')
        } else {
          setRes(err.message)
        }
      }
    }
  }

  async function handleMint() {
    console.log('Pub Mint')
    setRes('Transaction sent...')
    setShowRes(true)
    if (library) {
      const signer = library.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
      if (!properties.isPublicSale) {
        setRes('Public sale not active')
        setShowRes(true)
        return
      }
      try {
        setRes('Waiting for confirmation...')
        setShowRes(true)
        console.log('Public')
        const res = await contract.publicMint(BigNumber.from(mintAmount), {
          value: properties.pricePublic.mul(BigNumber.from(mintAmount))
        })
        setRes('Transaction sent! Waiting for confirmation...')
        const receipt = await res.wait()
        if (receipt.status === 1) {
          setRes('Transaction confirmed!')
          setMintAmount(1)
          await fetchData()
        } else {
          setRes('Transaction was reverted :(')
        }
      } catch (err) {
        console.log(err.code)
        if (err.code === -32603) {
          setRes('Not enough MATIC')
        } else if (err.code === 'ACTION_REJECTED') {
          setRes('You have rejected the transaction')
        } else {
          setRes(err.message)
        }
      }
    }
  }

  function closeModal() {
    setShowRes(false)
    setRes('')
  }

  return (
    <div>
      <Modal isOpen={showRes} onDismiss={closeModal} minHeight={10}>
        <ModalContainer>
          <Response>{res}</Response>
          <ResponsiveButtonPrimary onClick={closeModal}>Close</ResponsiveButtonPrimary>
        </ModalContainer>
      </Modal>
      <Title>
        <Text>Mint your DONK GPU</Text>
      </Title>
      <Grid>
        <CardRuby>
          <Img src={RubyImg} loading="lazy" alt="Ruby GPU" />
          <RubyType>
            <Type>RUBY 4$/day</Type>
            <AdditionalInfo>(legendary)</AdditionalInfo>
          </RubyType>
        </CardRuby>
        <CardAmethyst>
          <Img src={AmethystImg} loading="lazy" alt="Ruby GPU" />
          <AmethystType>
            <Type>AMETHYST 2$/day</Type>
            <AdditionalInfo>(epic)</AdditionalInfo>
          </AmethystType>
        </CardAmethyst>
        <CardGold>
          <Img src={GoldImg} loading="lazy" alt="Ruby GPU" />
          <GoldType>
            <Type>GOLD 1$/day</Type>
            <AdditionalInfo>(rare)</AdditionalInfo>
          </GoldType>
        </CardGold>
        <CardSilver>
          <Img src={SilverImg} loading="lazy" alt="Ruby GPU" />
          <SilverType>
            <Type>SILVER 0.5$/day</Type>
            <AdditionalInfo>(common)</AdditionalInfo>
          </SilverType>
        </CardSilver>
      </Grid>
      <UIBox
        style={
          active && metadataFetched
            ? {
                height: 'auto',
                padding: '25px'
              }
            : { height: '0%' }
        }
      >
        {/* WL STAGE */}
        {active && metadataFetched && !properties.isPublicSale && properties.isWhitelistSale && properties.isWL && (
          <>
            <h1>
              <Text>Whitelist Sale</Text>
            </h1>
            <MintGrid>
              <ColumnContainer>
                <Price>
                  Price:{' '}
                  {properties.priceWL.toBigInt() === BigInt(0)
                    ? 'FREE'
                    : ethers.utils
                        .formatEther(properties.priceWL)
                        .toString()
                        .slice(0, -2) + ' MATIC/NFT'}
                </Price>
                <h2>
                  {properties.maxPerTxn === 0 ? 'No limit per tx' : `Max ${properties.maxPerTxn} NFTs per transaction`}
                </h2>
                <h2>
                  WL Minted: {properties.totalSupply.toString()}/
                  {properties.whitelistSupply < properties.maxSupply
                    ? properties.whitelistSupply.toString()
                    : properties.maxSupply.toString()}
                </h2>
              </ColumnContainer>
              <ColumnContainer>
                <Price>
                  Total:{' '}
                  {ethers.utils
                    .formatEther(properties.priceWL.mul(mintAmount))
                    .toString()
                    .slice(0, -2)}{' '}
                  MATIC
                </Price>
                <ControlsContainer>
                  <InputButton onClick={handleDecrements}>
                    <Text>-</Text>
                  </InputButton>
                  <Input readOnly type="number" value={mintAmount} />
                  <InputButton onClick={handleIncrements}>
                    <Text>+</Text>
                  </InputButton>
                </ControlsContainer>
                <ResponsiveButtonPrimary onClick={handleWhitelistMint}>
                  <Text>Mint</Text>
                </ResponsiveButtonPrimary>
              </ColumnContainer>
            </MintGrid>
          </>
        )}
        {active && metadataFetched && properties.isWhitelistSale && !properties.isPublicSale && !properties.isWL && (
          <>
            <h1>
              <Text>Whitelist Sale</Text>
            </h1>
            <InfoContainer>
              <h2 className="price">WL Mint in progress</h2>
              <h3 className="txn-info">Please wait for the Public sale</h3>
            </InfoContainer>
          </>
        )}
        {/* PUBLIC SALE */}
        {active && metadataFetched && properties.isPublicSale && (
          <>
            <h1>
              <Text>Public Sale</Text>
            </h1>
            <MintGrid>
              <ColumnContainer>
                <Price>
                  Price:{' '}
                  {properties.pricePublic.toBigInt() === BigInt(0)
                    ? 'FREE'
                    : ethers.utils
                        .formatEther(properties.pricePublic)
                        .toString()
                        .slice(0, -2) + ' MATIC/NFT'}
                </Price>
                <h2>Max {properties.maxPerTxn.toString()} NFTs per transaction</h2>
                <h2>
                  Minted: {properties.totalSupply.toString()}/{properties.maxSupply.toString()}
                </h2>
              </ColumnContainer>
              <ColumnContainer>
                <Price>
                  Total:{' '}
                  {ethers.utils
                    .formatEther(properties.pricePublic.mul(mintAmount))
                    .toString()
                    .slice(0, -2)}{' '}
                  MATIC
                </Price>
                <ControlsContainer>
                  <InputButton onClick={handleDecrements}>
                    <Text>-</Text>
                  </InputButton>
                  <Input readOnly type="number" value={mintAmount} />
                  <InputButton onClick={handleIncrements}>
                    <Text>+</Text>
                  </InputButton>
                </ControlsContainer>
                <MainButton onClick={handleMint}>
                  <Text>Mint</Text>
                </MainButton>
              </ColumnContainer>
            </MintGrid>
          </>
        )}
        {/* NO SALE */}
        {active && metadataFetched && !properties.isWhitelistSale && !properties.isPublicSale && (
          <InfoContainer>
            <h1 style={{ lineHeight: '35px' }}>Mint has not started yet</h1>
          </InfoContainer>
        )}
      </UIBox>
      <ConnectContainer style={{ display: active && metadataFetched ? 'none' : 'block' }}>
        <Web3Status />
      </ConnectContainer>
    </div>
  )
}

export default Mint
