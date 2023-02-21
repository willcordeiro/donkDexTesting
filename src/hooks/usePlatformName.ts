import { Blockchain } from '@oneverseswap/sdk'
import useBlockchain from './useBlockchain'

export default function usePlatformName(): string {
  const blockchain = useBlockchain()
  switch (blockchain) {
    case Blockchain.HARMONY:
      return 'OneverseSwap'
    case Blockchain.ETHEREUM:
      return 'OneverseSwap'
    default:
      return 'OneverseSwap'
  }
}
