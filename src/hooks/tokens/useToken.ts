import { useMemo } from 'react'
import { ChainId, Token /*ChainId */ } from '@donkswap/sdk'
import { useActiveWeb3React } from '..'
import getToken from '../../utils/getToken'

/**
 * Returns the token given a specific symbol
 * @param symbol ticker for a given token
 */
export default function useToken(symbol = 'BUSD'): Token | undefined {
  const { chainId } = useActiveWeb3React()
  if (symbol === 'BUSD' && chainId === ChainId.ARBITRUM) {
    symbol = 'BUSD.b'
  }

  return useMemo<Token | undefined>(() => {
    return getToken(chainId, symbol)
  }, [chainId, symbol])
}
