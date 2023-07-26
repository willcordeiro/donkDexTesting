import { ChainId } from '@donkswap/sdk'
import { PitInfo } from '../types'
import { HARMONY_MAINNET_PIT_POOLS } from './harmony/mainnet'

export const PIT_POOLS: {
  [chainId in ChainId]?: PitInfo[]
} = {
  [ChainId.HARMONY_MAINNET]: HARMONY_MAINNET_PIT_POOLS,
  [ChainId.SEPOLIA]: HARMONY_MAINNET_PIT_POOLS,
  [ChainId.ARBITRUM]: HARMONY_MAINNET_PIT_POOLS,
  [ChainId.POLYGON]: HARMONY_MAINNET_PIT_POOLS,
  [ChainId.BINANCE]: HARMONY_MAINNET_PIT_POOLS
}
