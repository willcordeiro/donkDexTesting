import { Blockchain } from '@donkswap/sdk'

export default function getExplorerName(blockchain: Blockchain): string {
  switch (blockchain) {
    case Blockchain.ARBITRUM:
      return 'ARBITRUM Explorer'
    case Blockchain.SEPOLIA:
      return 'SEPOLIA Explorer'
    case Blockchain.POLYGON:
      return 'POLYGON Explorer'

    case Blockchain.BINANCE:
      return 'BINANCE Explorer'
    default:
      return 'Etherscan'
  }
}
