import { ChainId, WETH, Token } from '@oneverseswap/sdk'

export default function normalizeWethToken(chainId: ChainId, token: Token | undefined): Token | undefined {
  if (token === undefined) return undefined
  const weth = chainId && WETH[chainId]
  if (token == weth) {
    switch (chainId) {
      case ChainId.FINDORA:
      case ChainId.FINDORA:
        return new Token(chainId, token.address, token.decimals, 'FRA', 'FINDORA')
      case ChainId.GOERLI:
      case ChainId.GOERLI:
        return new Token(chainId, token.address, token.decimals, 'GoerliETH', 'GoerliETH')
      case ChainId.ANVILTESTNET:
      case ChainId.ANVILTESTNET:
        return new Token(chainId, token.address, token.decimals, 'FRA', 'FINDORA')
      default:
        return token
    }
  }

  return token
}
