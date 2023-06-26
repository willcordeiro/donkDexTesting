import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { ButtonDropdownLight } from 'components/Button'
import CurrencyLogo from 'components/CurrencyLogo'
import Row from 'components/Row'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { Currency } from '@donkswap/sdk'
import { format } from 'date-fns'
import { useFarmStakingContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'

const Container = styled.div`
  z-index: 1;
  position: relative;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
  height: 100%;
  padding: 20px;
  border-radius: 1.25rem;
  margin-top: 20px;
  min-width: 330px;

  @media (max-width: 768px) {
    padding: 15px;
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
  line-height: 1.75rem;
  font-weight: 500;
  color: #f06e4d;
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

const Parent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .div1 {
    grid-area: 1 / 1 / 2 / 4;
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e9e9f1' : '#1f202e')};
    border-radius: 0.3rem;
    padding: 10px;

    @media (max-width: 768px) {
      grid-area: 1 / 1 / 2 / 2;
    }
  }
  .div2 {
    grid-area: 2 / 1 / 3 / 2;
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e9e9f1' : '#1f202e')};
    border-radius: 0.3rem;
    padding: 10px;
    @media (max-width: 768px) {
      grid-area: 2 / 1 / 3 / 2;
    }
  }
  .div3 {
    grid-area: 2 / 2 / 3 / 3;
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e9e9f1' : '#1f202e')};
    border-radius: 0.3rem;
    padding: 10px;
    @media (max-width: 768px) {
      grid-area: 3 / 1 / 4 / 2;
    }
  }
  .div4 {
    grid-area: 2 / 3 / 3 / 4;
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e9e9f1' : '#1f202e')};
    border-radius: 0.3rem;
    padding: 10px;
    @media (max-width: 768px) {
      grid-area: 4 / 1 / 5 / 2;
    }
  }
  .div5 {
    grid-area: 3 / 1 / 4 / 4;
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e9e9f1' : '#1f202e')};
    border-radius: 0.3rem;
    padding: 10px;
    @media (max-width: 768px) {
      grid-area: 5 / 1 / 6 / 2;
    }
  }
`
const Label = styled.label`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e9e9f1' : '#1f202e')};
  border-radius: 0.2rem;
`

const Input = styled.input`
  background: none;
  outline: none;
  border: none;
  font-size: 15px;
  font-weight: bold;
  width: 100%;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;

  line-height: 1.25rem;
  font-weight: 500;
  ::placeholder {
    font-size: 15px;
    font-weight: 500;
    color: #9ca6b9;
  }
`

const ContainerText = styled.div`
  text-align: left;
  z-index: 1;
  position: relative;
  margin-top: 50px;
  height: 100%;
  max-height: 100px;
  margin-bottom: 10px;
  border-radius: 1.25rem;
`

const StyledDatePicker = styled(DatePicker)`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#e9e9f1' : '#1f202e')};
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
  outline: none;
  border: none;
`

const TokenDropDown = styled.div`
  max-width: 300px;
  margin-bottom: 20px;
`

const SubTextCluster = styled.span`
  font-size: 0.9rem;

  font-weight: 500;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1
}

export default function RewardSection({ farm, msg }: any) {
  const [startDate, setStartDate] = useState<any>()
  const [startDateNormal, setStartDateNormal] = useState<any>()
  const [endDate, setEndDate] = useState<any>()
  const [endNormal, setEndNormal] = useState<any>()
  const [durationDays, setDurationDays] = useState<any>()
  const [tokenAmount, setTokenAmount] = useState<any>()
  const [estimateReward, setEstimateReward] = useState<any>()
  const [error, setError] = useState<any>()
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
  const [currency0, setCurrency0] = useState<any>(null)
  const [currency1, setCurrency1] = useState<any>(null)
  const { account, library } = useWeb3React()
  const signer = library.getSigner(account)
  const farmContract: any = useFarmStakingContract()
  const farmContractWithSigner = farmContract.connect(signer)
  const [chainTime, setChainTime] = useState<string>()

  useEffect(() => {
    farm({
      startDate: startDate,
      startDateNormal: startDateNormal,
      endDate: endDate,
      endNormal: endNormal,
      durationDays: durationDays,
      tokenAmount: tokenAmount,
      estimateReward: estimateReward,
      error: error,
      currency0: currency0
    })
  }, [startDate, startDateNormal, endDate, endNormal, durationDays, tokenAmount, estimateReward, error, currency0])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField]
  )

  const handleSearchDismiss = useCallback(() => {
    setShowSearch(false)
  }, [setShowSearch])

  const today = new Date()
  const minDate = new Date()
  minDate.setHours(today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds())
  const maxDate = new Date()
  maxDate.setDate(today.getDate() + 90)
  maxDate.setHours(23, 59, 59, 999)

  const handleDateChangeStart = (date: Date) => {
    const UTC = date
    const timestamp: any = UTC ? new Date(UTC).getTime() : null

    const time = Math.floor(timestamp / 1000)

    const timer = moment.unix(time)

    console.log(timer.toString(), 'timestamp convertido')

    setStartDate(time)
    console.log(time, 'start date')
    setStartDateNormal(format(new Date(UTC), 'MM/dd/yy HH:mm'))

    if (durationDays !== '' && durationDays !== undefined) {
      const newDate = new Date(UTC)
      newDate.setDate(newDate.getDate() + parseInt(durationDays, 10))

      setEndNormal(format(newDate, 'MM/dd/yy HH:mm'))

      const timestampEnd = newDate.getTime()
      const timeEnd = Math.floor(timestampEnd / 1000)

      setEndDate(timeEnd)
      console.log(timeEnd, 'end date')
    }
  }
  const handleDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    const isInteger = Number.isInteger(+value)

    const intValue = parseInt(value)

    if (intValue < 7) {
      setError('Period is shorter than min duration of 7 days')
      msg(true)
    } else if (intValue > 90) {
      setError(' Period is longer than max duration of 90 days')
      msg(true)
    } else {
      setError('')
      msg(false)
    }

    if (isInteger) {
      setDurationDays(value)
    } else {
      const intValue = parseInt(value)
      setDurationDays(intValue)
    }
  }

  useEffect(() => {
    if (durationDays) {
      const newDate = new Date(startDateNormal)
      const duration = parseInt(durationDays)
      newDate.setDate(newDate.getDate() + duration)

      const timestampEnd = newDate.getTime()
      setEndDate(timestampEnd)
    }
  }, [startDateNormal, durationDays])

  const handleTokenAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setTokenAmount(value)
  }

  const handleEstimateReward = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setEstimateReward(value)
  }

  useEffect(() => {
    if (estimateReward && durationDays) {
      const valueConverted = estimateReward * durationDays

      setTokenAmount(valueConverted)
    }
  }, [estimateReward])

  useEffect(() => {
    if (tokenAmount && durationDays) {
      const valueConverted = tokenAmount / durationDays
      setEstimateReward(valueConverted)
    }
  }, [tokenAmount])

  useEffect(() => {
    if (tokenAmount && durationDays) {
      const valueConverted = tokenAmount / durationDays
      setEstimateReward(valueConverted)
    }
  }, [durationDays])

  async function add() {
    if (window?.ethereum?.request) {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0x91158D94CAAe6503fa42bB6E68892C2EA42963A8',
            symbol: 'DNK',
            decimals: 18,
            image:
              'https://github.com/DonkProtocol/donk-interface/blob/main/src/assets/images/logo/logo_-_white_bg.png?raw=true'
          }
        }
      })
    }
  }

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

  useEffect(() => {
    setInterval(() => {
      getChainTime()
    }, 1000)
  }, [])

  return (
    <>
      <button onClick={add}>here</button>
      <ContainerText>
        <Text>Farming Reward</Text>
      </ContainerText>
      <ClusterTime>{chainTime}</ClusterTime>
      <SubTextCluster>
        <p> {`The date is retrieved from the blockchain and converted to the current user's local date.`} </p>
      </SubTextCluster>
      <Container>
        <TokenDropDown>
          <ButtonDropdownLight
            onClick={() => {
              setShowSearch(true)
              setActiveField(Fields.TOKEN0)
            }}
          >
            {currency0 ? (
              <Row>
                <CurrencyLogo currency={currency0} />
                <Text>{currency0.symbol}</Text>
              </Row>
            ) : (
              <Text>Select a Reward Token</Text>
            )}
          </ButtonDropdownLight>{' '}
        </TokenDropDown>

        <Parent>
          <div className="div1">
            <Text>Reward Amount</Text>

            <Label>
              <Input placeholder="0.0" type="number" onChange={handleTokenAmount} value={tokenAmount} />
            </Label>
          </div>
          <div className="div2">
            {' '}
            <Text>Duration</Text>
            <Label>
              <Input placeholder="7 - 90" type="number" onChange={handleDuration} min={7} max={90} />
            </Label>
          </div>
          <SubText>{error}</SubText>
          <div className="div3">
            {' '}
            <Text>Farming Starts</Text>
            <Label>
              {' '}
              <Text>(UTC)</Text>
              <StyledDatePicker
                value={startDateNormal}
                placeholderText="Select a date"
                onChange={handleDateChangeStart}
                dateFormat="MM-dd-yyyy HH:mm"
                showTimeSelect
                minDate={today}
                maxDate={maxDate}
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
              />
            </Label>
          </div>
          <div className="div4">
            {' '}
            <Text>Farming Ends</Text>
            <Label>
              {' '}
              <Text>(UTC)</Text>
              <StyledDatePicker
                onChange={() => {
                  ''
                }}
                dateFormat="MM-dd-yyyy HH:mm"
                value={endNormal}
                showTimeSelect
                minDate={today}
                maxDate={maxDate}
                disabled
              />
            </Label>
          </div>
          <div className="div5">
            <Text>Estimated rewards / day</Text>
            <Label>
              <Input type="number" onChange={handleEstimateReward} value={estimateReward} />{' '}
            </Label>
          </div>
        </Parent>

        <CurrencySearchModal
          isOpen={showSearch}
          onCurrencySelect={handleCurrencySelect}
          onDismiss={handleSearchDismiss}
          showCommonBases
          selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
        />
      </Container>
    </>
  )
}
