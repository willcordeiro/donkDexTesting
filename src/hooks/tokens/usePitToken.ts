import { Token, PIT_TOKENS } from '@donkswap/sdk'
import { useActiveWeb3React } from '../index'

export default function usePitToken(): Token | undefined {
  const { chainId } = useActiveWeb3React()
  return chainId ? PIT_TOKENS[chainId] : undefined
}
