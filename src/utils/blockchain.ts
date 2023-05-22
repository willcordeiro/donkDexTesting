import { Blockchain, ChainId, Currency, ETHER, ARBITRUM, GOERLI } from '@donkswap/sdk'

export function getBlockchain(chainId: ChainId | undefined): Blockchain {
  switch (chainId) {
    case ChainId.ARBITRUM:
      return Blockchain.ARBITRUM
    case ChainId.GOERLI:
      return Blockchain.GOERLI
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

    case Blockchain.GOERLI:
      return GOERLI
    default:
      return ETHER
  }
}

// Returns the block time in seconds
export function getBlockchainBlockTime(blockchain: any): number {
  switch (blockchain) {
    case blockchain.ARBITRUM:
      return 15

    case blockchain.GOERLI:
      return 5

    default:
      return 15
  }
}

export function getBlockchainName(chainId: ChainId | undefined): string {
  switch (chainId) {
    case ChainId.MAINNET:
      return 'Ethereum'
    case ChainId.GOERLI:
      return 'Goerli'
    case ChainId.ARBITRUM:
      return 'ARBITRUM'

    default:
      return 'Ethereum'
  }
}
