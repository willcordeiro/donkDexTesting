import { ChainId, Token, WETH, GOVERNANCE_TOKENS } from '@oneverseswap/sdk'
import { TOKENS } from '@oneverseswap/sdk-extra'
import { ZERO_ONE_ADDRESS } from '../constants/index'

export default function getTokenWithDefault(chainId: ChainId, symbol: string): Token {
  symbol = symbol.toUpperCase()
  let token: Token

  switch (symbol) {
    case 'WETH':
    case 'WBNB':
    case 'WONE':
      token = WETH[chainId]
      break
    default:
      const retrievedToken = TOKENS[chainId].firstBySymbol(symbol)
      token = retrievedToken ? retrievedToken : new Token(chainId, ZERO_ONE_ADDRESS, 18, symbol, symbol)
      break
  }

  if (
    (!token || token.address === ZERO_ONE_ADDRESS) &&
    [ChainId.ANVILTESTNET, ChainId.GOERLI, ChainId.FINDORA].includes(chainId)
  ) {
    const govToken = GOVERNANCE_TOKENS[chainId]
    if (symbol.toUpperCase() === govToken.symbol?.toUpperCase()) {
      token = govToken
    }
  }

  return token
}
