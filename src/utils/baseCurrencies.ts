import { ChainId, Currency, ETHER, FINDORA, GOERLI, ANVILTESTNET, WETH, GOVERNANCE_TOKENS } from '@oneverseswap/sdk'
import { NETWORK_CHAIN_ID } from '../connectors'

export default function baseCurrencies(chainId: ChainId | undefined): Currency[] {
  const currencies: Currency[] = []

  if (chainId) {
    switch (chainId) {
      case ChainId.GOERLI:
      case ChainId.GOERLI:
        currencies.push(GOERLI)
        currencies.push(WETH[chainId])
        currencies.push(GOVERNANCE_TOKENS[chainId])

        break

      case ChainId.FINDORA:
      case ChainId.FINDORA:
        currencies.push(FINDORA)
        currencies.push(WETH[chainId])
        currencies.push(GOVERNANCE_TOKENS[chainId])
        break

      case ChainId.ANVILTESTNET:
      case ChainId.ANVILTESTNET:
        currencies.push(ANVILTESTNET)
        currencies.push(WETH[chainId])
        currencies.push(GOVERNANCE_TOKENS[chainId])

        break

      default:
        currencies.push(ETHER)
        currencies.push(WETH[chainId])
        break
    }
  } else {
    currencies.push(ETHER)
    currencies.push(WETH[NETWORK_CHAIN_ID as ChainId])
  }

  return currencies
}
