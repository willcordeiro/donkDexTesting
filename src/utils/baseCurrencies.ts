import { ChainId, Currency, ETHER, ARBITRUM, GOERLI, WETH, GOVERNANCE_TOKENS } from '@donkswap/sdk'
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

      case ChainId.ARBITRUM:
      case ChainId.ARBITRUM:
        currencies.push(ARBITRUM)
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
