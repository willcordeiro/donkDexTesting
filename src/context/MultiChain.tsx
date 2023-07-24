import React, { useState, createContext, ReactNode } from 'react'

// Define a type for the context value
interface MultichainContextValue {
  currentChain: string | null
  setCurrentChain: React.Dispatch<React.SetStateAction<string | null>>
}

export const MultichainContext = createContext<MultichainContextValue | null>(null)

const Multichain: React.FC<ReactNode> = ({ children }) => {
  const [currentChain, setCurrentChain] = useState<string | null>('Arbitrum')

  return (
    <MultichainContext.Provider
      value={{
        currentChain,
        setCurrentChain
      }}
    >
      {children}
    </MultichainContext.Provider>
  )
}

export default Multichain
