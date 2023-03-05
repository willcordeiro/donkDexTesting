import { Blockchain } from '@oneverseswap/sdk'

export default function getExplorerName(blockchain: Blockchain): string {
  switch (blockchain) {
    case Blockchain.FINDORA:
      return 'FINDORA Explorer'
    case Blockchain.ANVILTESTNET:
      return 'ANVILTESTNET Explorer'
    case Blockchain.GOERLI:
      return 'GOERLI Explorer'
    default:
      return 'Etherscan'
  }
}
