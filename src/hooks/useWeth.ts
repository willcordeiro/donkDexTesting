import { WETH, Token } from '@donkswap/sdk'
import { useActiveWeb3React } from './index'

export default function useWeth(): Token | undefined {
  const { chainId } = useActiveWeb3React()
  return chainId ? WETH[chainId] : undefined
}
