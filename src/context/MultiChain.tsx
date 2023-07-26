import React, { useState, useEffect, createContext, ReactNode } from 'react'

// Define a type for the context value
interface MultichainContextValue {
  currentChain: string | null
  setCurrentChain: React.Dispatch<React.SetStateAction<string | null>>
  currentChainID: Number | undefined
  currentChainRPC: string | null
}

export const MultichainContext = createContext<MultichainContextValue | null>(null)

const Multichain: React.FC<ReactNode> = ({ children }) => {
  const [currentChain, setCurrentChain] = useState<string | null>('')
  const [currentChainID, setCurrentChainID] = useState<Number>()
  const [currentChainRPC, setCurrentChainRPC] = useState<string | null>('')

  useEffect(() => {
    if ('Polygon' === currentChain) {
      setCurrentChainID(137)
      setCurrentChainRPC('https://polygon-rpc.com')
    } else if ('Arbitrum' === currentChain) {
      setCurrentChainID(42161)
      setCurrentChainRPC('https://arb1.arbitrum.io/rpc')
    } else if ('Binance' === currentChain) {
      setCurrentChainID(56)
      setCurrentChainRPC('https://rpc.ankr.com/bsc')
    }
  }, [currentChain])

  return (
    <MultichainContext.Provider
      value={{
        currentChain,
        setCurrentChain,
        currentChainID,
        currentChainRPC
      }}
    >
      {children}
    </MultichainContext.Provider>
  )
}

export default Multichain
