import { ChainId, WETH, Token } from '@donkswap/sdk'

export default function normalizeWethToken(chainId: ChainId, token: Token | undefined): Token | undefined {
  if (token === undefined) return undefined
  const weth = chainId && WETH[chainId]

  if (token == weth) {
    switch (chainId) {
      case ChainId.ARBITRUM:
      case ChainId.ARBITRUM:
        return new Token(chainId, token.address, token.decimals, 'ETH', 'ETHERIUM')
      case ChainId.GOERLI:
      case ChainId.GOERLI:
        return new Token(chainId, token.address, token.decimals, 'GoerliETH', 'GoerliETH')

      default:
        return token
    }
  }

  return token
}
