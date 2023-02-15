import { Currency, ETHER, HARMONY, BINANCE_COIN, WETH } from '@venomswap/sdk'
import { NETWORK_CHAIN_ID } from '../connectors'
import useCreateGovernanceToken from 'hooks/tokens/useCreatGovToken'

enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
  HARMONY_MAINNET = 1666600000,
  HARMONY_TESTNET = 1666700000,
  FINDORA = 2152
}

export default function baseCurrencies(chainId: ChainId | undefined): Currency[] {
  const currencies: Currency[] = []

  const mainToken = useCreateGovernanceToken

  const goerliCurrency = { decimals: 18, symbol: 'GoerliETH', name: 'GoerliETH' }

  const findoraCurrency = { decimals: 18, symbol: 'FRA', name: 'Findora' }

  class Currency {
    readonly decimals: number
    readonly symbol?: string
    readonly name?: string

    static readonly GÖRLI: Currency

    static readonly FINDORA: Currency

    constructor(decimals: number, symbol?: string, name?: string) {
      this.decimals = decimals
      this.symbol = symbol
      this.name = name
    }
  }
  const goerliToken = new Currency(goerliCurrency.decimals, goerliCurrency.symbol, goerliCurrency.name)
  const findoraToken = new Currency(findoraCurrency.decimals, findoraCurrency.symbol, findoraCurrency.name)

  if (chainId) {
    switch (chainId) {
      case ChainId.BSC_MAINNET:
      case ChainId.BSC_TESTNET:
        currencies.push(BINANCE_COIN)
        currencies.push(WETH[chainId])
        currencies.push(mainToken(chainId))
        break
      case ChainId.HARMONY_MAINNET:
      case ChainId.HARMONY_TESTNET:
        currencies.push(HARMONY)
        currencies.push(WETH[chainId])
        currencies.push(mainToken(chainId))
        break

      case ChainId.GÖRLI:
      case ChainId.GÖRLI:
        currencies.push(goerliToken)
        currencies.push(WETH[chainId])
        currencies.push(mainToken(chainId))
        break

      case ChainId.FINDORA:
      case ChainId.FINDORA:
        currencies.push(findoraToken)
        currencies.push(WETH[chainId])
        currencies.push(mainToken(chainId))
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
