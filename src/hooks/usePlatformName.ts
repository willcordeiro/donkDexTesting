import { Blockchain } from '@oneverseswap/sdk'
import useBlockchain from './useBlockchain'

export default function usePlatformName(): string {
  const blockchain = useBlockchain()
  switch (blockchain) {
    case Blockchain.HARMONY:
      return 'OneverseSwap'
    case Blockchain.ETHEREUM:
      return 'OneverseSwap'
    case Blockchain.FINDORA:
      return 'OneverseSwap'
    case Blockchain.GOERLI:
      return 'OneverseSwap'
    case Blockchain.ANVILTESTNET:
      return 'OneverseSwap'
    default:
      return 'OneverseSwap'
  }
}
