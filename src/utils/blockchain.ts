import { Blockchain, ChainId, Currency, ETHER, ARBITRUM, SepoliaETH, BINANCE, POLYGON } from '@donkswap/sdk'

export function getBlockchain(chainId: ChainId | undefined): Blockchain {
  switch (chainId) {
    case ChainId.ARBITRUM:
      return Blockchain.ARBITRUM
    case ChainId.SEPOLIA:
      return Blockchain.SEPOLIA

    case ChainId.POLYGON:
      return Blockchain.POLYGON

    case ChainId.BINANCE:
      return Blockchain.BINANCE
    default:
      return Blockchain.ARBITRUM
  }
}

export function getBlockchainAdjustedCurrency(
  blockchain: Blockchain,
  currency: Currency | undefined
): Currency | undefined {
  if (!currency) return currency
  if (currency !== ETHER) return currency
  switch (blockchain) {
    case Blockchain.ARBITRUM:
      return ARBITRUM

    case Blockchain.POLYGON:
      return POLYGON

    case Blockchain.BINANCE:
      return BINANCE

    case Blockchain.SEPOLIA:
      return SepoliaETH
    default:
      return ETHER
  }
}

// Returns the block time in seconds
export function getBlockchainBlockTime(blockchain: any): number {
  switch (blockchain) {
    case blockchain.ARBITRUM:
      return 15

    case blockchain.POLYGON:
      return 2

    case blockchain.BINANCE:
      return 3

    case blockchain.SEPOLIA:
      return 36

    default:
      return 15
  }
}

export function getBlockchainName(chainId: ChainId | undefined): string {
  switch (chainId) {
    case ChainId.MAINNET:
      return 'Ethereum'
    case ChainId.SEPOLIA:
      return 'SEPOLIA'
    case ChainId.ARBITRUM:
      return 'ARBITRUM'

    case ChainId.POLYGON:
      return 'POLYGON'

    case ChainId.BINANCE:
      return 'BINANCE'
    default:
      return 'Ethereum'
  }
}
