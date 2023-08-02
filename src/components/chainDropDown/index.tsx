import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Polygon, Arbitrum, Binance } from './chains'
import { MultichainContext } from '../../context/MultiChain'
import { AiFillCaretDown } from 'react-icons/ai'
import polygonLogo from '../../assets/images/chainsLogo/polygon-matic-logo.97ff139cc7379a42cf141d74a6595fff.svg'
import arbitrumLogo from '../../assets/images/chainsLogo/arbitrum_logo.17ba9b2d5b1574bd70b71505367f5130.svg'

const DropdownWrapper = styled.div`
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background-color: white;
  gap: 20px;
  border-radius: 0.5rem;
  width: 150px;
  margin-right: 0.5rem;
`

const DropdownHeader = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
`

const DropdownBody = styled.div`
  padding: 5px;
  border: 1px solid #b0b3b9;
  display: none;
  overflow-y: auto;
  max-height: 150px;
  background-color: rgb(255, 255, 255);
  border-radius: 0.5rem;
  position: absolute;

  @media (max-width: 960px) {
    position: relative;
  }

  &.open {
    display: block;

    @media (max-width: 960px) {
      margin-bottom: 40%;
    }
  }
`

const DropdownItemMultichain = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #ff8e4c;
    color: white;
    vertical-align: middle;
    border-radius: 0.5rem;
  }
`

function ChainDropDown() {
  //context multichain variables
  const context: any = useContext(MultichainContext)
  const currentChain = context.currentChain
  const setCurrentChain = context.setCurrentChain

  //variables for the name of the chains
  const polygon = 'Polygon'
  const arbitrum = 'Arbitrum'
  const binance = 'Binance'

  //array to list the chains with id in the multichain dropdown
  const data = [
    { id: 0, label: polygon, logo: polygonLogo },
    { id: 1, label: arbitrum, logo: arbitrumLogo }
  ]
  /*
  const dataNoPoly = [
    // { id: 1, label: polygon, logo: polygonLogo },
    { id: 2, label: arbitrum, logo: arbitrumLogo }
    // { id: 3, label: binance },
  ]
*/
  //varibles to toggle the dropdown
  const [isOpen, setOpen] = useState<boolean>(false)
  const [items, setItem] = useState<any>(data)

  const [selectedItemID, setSelectedItemID] = useState<string | null | undefined>(null)
  const [previousId, setPreviousId] = useState<any>(null)

  const toggleDropdown = () => setOpen(!isOpen)

  useEffect(() => {
    /*
    if (noPoly) {
      setItem(dataNoPoly)
    } else {
        */
    setItem(data)
    //}
  }, [selectedItemID])

  //to get the localStorage saved chain
  useEffect(() => {
    const chainFromStorage = localStorage.getItem('multiChain')

    if (chainFromStorage !== null) {
      setCurrentChain(chainFromStorage)
    } else {
      setCurrentChain('Arbitrum')
    }
  }, [])

  //change dropdown item and save in the local storage
  useEffect(() => {
    if (selectedItemID) {
      const label = items.find((item: { id: string }) => item.id == selectedItemID).label
      saveChanges(label)
    }
  }, [selectedItemID])

  //save last used chain in the user localhost
  function saveChanges(chain: string) {
    localStorage.setItem('multiChain', chain)
    setCurrentChain(chain)
  }

  //change the dropdown item, getting and setting the last id of the dropdown
  const handleItemClick = (id: string | undefined) => {
    selectedItemID === id ? setSelectedItemID(null) : setSelectedItemID(id)
  }

  // Função para verificar e alterar a chain atual
  async function enableChain(dropdownId?: string, reloadOn?: boolean) {
    let chainChanged: any = false
    const previousItem = items.find((element: any) => element.label === currentChain)
    const previousID: any = previousItem ? String(previousItem.id) : null
    setPreviousId(previousID)

    if (polygon === currentChain) {
      chainChanged = await Polygon()
    } else if (arbitrum === currentChain) {
      chainChanged = await Arbitrum()
    } else if (binance === currentChain) {
      chainChanged = await Binance()
    }

    if (reloadOn) {
      window.ethereum.on('chainChanged', (chainId: any) => {
        location.reload()
        console.log('new chain id:', chainId)
      })
    }

    if (chainChanged) {
      handleItemClick(dropdownId)
    } else {
      handleItemClick(previousId)
    }
  }

  useEffect(() => {
    enableChain()
    console.log(currentChain)
  }, [currentChain])

  return (
    <DropdownWrapper>
      <DropdownHeader onClick={toggleDropdown}>
        <img
          src={items?.find((item: { label: string }) => item.label == currentChain)?.logo}
          alt={'logo'}
          width={20}
          height={20}
        />
        {selectedItemID || currentChain ? currentChain : ''}
        <AiFillCaretDown />
      </DropdownHeader>
      <DropdownBody className={isOpen ? 'open' : ''}>
        {items.map((item: any, index: number) => (
          <DropdownItemMultichain
            key={index}
            onClick={(e: any) => {
              toggleDropdown()
              enableChain(e.target.id, true)
            }}
            id={item.id}
          >
            <img src={item.logo} alt={item.label} width={20} height={20} />
            {item.label}
          </DropdownItemMultichain>
        ))}
      </DropdownBody>
    </DropdownWrapper>
  )
}
export default ChainDropDown
