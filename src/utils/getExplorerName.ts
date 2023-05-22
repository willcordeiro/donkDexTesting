import { Blockchain } from '@donkswap/sdk'

export default function getExplorerName(blockchain: Blockchain): string {
  switch (blockchain) {
    case Blockchain.ARBITRUM:
      return 'ARBITRUM Explorer'
    case Blockchain.GOERLI:
      return 'GOERLI Explorer'
    default:
      return 'Etherscan'
  }
}
