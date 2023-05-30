import React from 'react'
import { c } from '../../assets'
import Harvest from './Harvest'
import ManageStakeUnstake from './ManageStakeUnstake'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import styled from 'styled-components'

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
          <Harvest />
          <ManageStakeUnstake />
        </main>
      </section>
    </Container>
  )
}
