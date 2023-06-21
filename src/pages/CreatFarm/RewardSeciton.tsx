import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Container = styled.div`
  text-align: left;
  z-index: 1;
  position: relative;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'white' : '#2f3146')};
  height: 100%;
  padding: 20px;
  border-radius: 1.25rem;
`

const Text = styled.span`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#2f3146' : 'white')};
`

const Parent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  .div1 {
    grid-area: 1 / 1 / 2 / 4;
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#dfdfe6' : '#1f202e')};
    border-radius: 0.3rem;
    padding: 10px;
  }
  .div2 {
    grid-area: 2 / 1 / 3 / 2;
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#dfdfe6' : '#1f202e')};
    border-radius: 0.3rem;
    padding: 10px;
  }
  .div3 {
    grid-area: 2 / 2 / 3 / 3;
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#dfdfe6' : '#1f202e')};
    border-radius: 0.3rem;
    padding: 10px;
  }
  .div4 {
    grid-area: 2 / 3 / 3 / 4;
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#dfdfe6' : '#1f202e')};
    border-radius: 0.3rem;
    padding: 10px;
  }
  .div5 {
    grid-area: 3 / 1 / 4 / 4;
    background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#dfdfe6' : '#1f202e')};
    border-radius: 0.3rem;
    padding: 10px;
  }
`
const Label = styled.label`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#dfdfe6' : '#1f202e')};
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
  margin-top: 150px;
  height: 100%;
  max-height: 100px;
  padding: 20px;
  border-radius: 1.25rem;
`

const StyledDatePicker = styled(DatePicker)`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? '#dfdfe6' : '#1f202e')};
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
  outline: none;
  border: none;
`

export default function RewardSection() {
  const [startDate, setStartDate] = useState(null)
  const [startDateNormal, setStartDateNormal] = useState<any>()
  const [endDate, setEndDate] = useState<any>()
  const [endNormal, setEndNormal] = useState<any>()
  const [durationDays, setDurationDays] = useState<any>()
  const today = new Date()
  const minDate = new Date()
  minDate.setHours(today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds())
  const maxDate = new Date()
  maxDate.setDate(today.getDate() + 90)
  maxDate.setHours(23, 59, 59, 999)

  const handleDateChangeStart = (date: any) => {
    const timestamp = date ? date.getTime() : null

    setStartDate(timestamp)
    setStartDateNormal(date)

    if (durationDays != 0) {
      const newDate = new Date(date)

      newDate.setDate(newDate.getDate() + durationDays)

      setEndNormal(newDate)

      const timestampEnd = newDate.getTime()

      setEndDate(timestampEnd)
    }
  }

  const handleDurantion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    // Verificar se o valor é um número inteiro
    const isInteger = Number.isInteger(+value)

    // Utilize a variável 'isInteger' como desejar
    if (isInteger) {
      setDurationDays(value)
    } else {
      const intValue = parseInt(value)
      setDurationDays(intValue)
    }
  }

  useEffect(() => {
    if (startDateNormal && durationDays) {
      const newDate = new Date(startDateNormal)
      const duration = parseInt(durationDays)
      newDate.setDate(newDate.getDate() + duration)

      const timestampEnd = newDate.getTime()
      setEndDate(timestampEnd)
    }
  }, [startDateNormal, durationDays])

  return (
    <>
      <ContainerText>
        <Text>Farming Reward</Text>
      </ContainerText>
      <Container>
        <Parent>
          <div className="div1">
            <Text>Token</Text>
            <Label>
              <Input placeholder="0.0" type="number" />
            </Label>
          </div>
          <div className="div2">
            {' '}
            <Text>Duration</Text>
            <Label>
              <Input placeholder="7 - 90" type="number" onChange={handleDurantion} value={durationDays} />{' '}
            </Label>
          </div>
          <div className="div3">
            {' '}
            <Text>Farming Starts</Text>
            <Label>
              <StyledDatePicker
                selected={startDate}
                placeholderText="Select a date"
                onChange={handleDateChangeStart}
                dateFormat="MM-dd-yyyy HH:mm"
                showTimeSelect
                minDate={today}
                maxDate={maxDate}
              />
            </Label>
          </div>
          <div className="div4">
            {' '}
            <Text>Farming Ends</Text>
            <Label>
              <StyledDatePicker
                selected={endDate}
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
              <Input type="number" />{' '}
            </Label>
          </div>
        </Parent>
      </Container>
    </>
  )
}
