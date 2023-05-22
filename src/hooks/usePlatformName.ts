import { Blockchain } from '@donkswap/sdk'
import useBlockchain from './useBlockchain'

export default function usePlatformName(): string {
  const blockchain = useBlockchain()
  switch (blockchain) {
    case Blockchain.HARMONY:
      return 'DonkSwap'
    case Blockchain.ETHEREUM:
      return 'DonkSwap'
    case Blockchain.ARBITRUM:
      return 'DonkSwap'
    case Blockchain.GOERLI:
      return 'DonkSwap'
    default:
      return 'DonkSwap'
  }
}
