import { ChainId, WETH, Token } from '@donkswap/sdk'

export default function normalizeWethToken(chainId: ChainId, token: Token | undefined): Token | undefined {
  if (token === undefined) return undefined
  const weth = chainId && WETH[chainId]

  if (token == weth) {
    switch (chainId) {
      case ChainId.ARBITRUM:
      case ChainId.ARBITRUM:
        return new Token(chainId, token.address, token.decimals, 'ETH', 'ETHERIUM')
      case ChainId.SEPOLIA:
      case ChainId.SEPOLIA:
        return new Token(chainId, token.address, token.decimals, 'SepoliaETH', 'SepoliaETH')

      case ChainId.POLYGON:
      case ChainId.POLYGON:
        return new Token(chainId, token.address, token.decimals, 'MATIC', 'MATIC')

      case ChainId.BINANCE:
      case ChainId.BINANCE:
        return new Token(chainId, token.address, token.decimals, 'BNB', 'BNB')

      default:
        return token
    }
  }

  return token
}
