import { ChainId } from '@oneverseswap/sdk'
import { PitInfo } from '../types'
import { HARMONY_MAINNET_PIT_POOLS } from './harmony/mainnet'

export const PIT_POOLS: {
  [chainId in ChainId]?: PitInfo[]
} = {
  [ChainId.HARMONY_MAINNET]: HARMONY_MAINNET_PIT_POOLS,
  [ChainId.GOERLI]: HARMONY_MAINNET_PIT_POOLS,
  [ChainId.FINDORA]: HARMONY_MAINNET_PIT_POOLS,
  [ChainId.ANVILTESTNET]: HARMONY_MAINNET_PIT_POOLS
  //
}
