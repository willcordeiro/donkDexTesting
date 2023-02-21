import { Blockchain, ChainId, Currency, ETHER, FINDORA, ANVILTESTNET } from '@oneverseswap/sdk'

export function getBlockchain(chainId: ChainId | undefined): Blockchain {
  switch (chainId) {
    case ChainId.ANVILTESTNET:
      return Blockchain.ANVILTESTNET
    case ChainId.FINDORA:
      return Blockchain.FINDORA
    default:
      return Blockchain.FINDORA
  }
}

export function getBlockchainAdjustedCurrency(
  blockchain: Blockchain,
  currency: Currency | undefined
): Currency | undefined {
  if (!currency) return currency
  if (currency !== ETHER) return currency
  switch (blockchain) {
    case Blockchain.FINDORA:
      return FINDORA

    case Blockchain.ANVILTESTNET:
      return ANVILTESTNET
    default:
      return ETHER
  }
}

// Returns the block time in seconds
export function getBlockchainBlockTime(blockchain: any): number {
  switch (blockchain) {
    case blockchain.FINDORA:
      return 16
    case blockchain.ANVILTESTNET:
      return 15
    default:
      return 16
  }
}

export function getBlockchainName(chainId: ChainId | undefined): string {
  switch (chainId) {
    case ChainId.MAINNET:
      return 'Ethereum'
    case ChainId.GOERLI:
      return 'Goerli'
    case ChainId.FINDORA:
      return 'Findora'
    case ChainId.ANVILTESTNET:
      return 'Anvil testnet'

    default:
      return 'Ethereum'
  }
}
