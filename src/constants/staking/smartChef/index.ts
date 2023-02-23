import { ChainId } from '@oneverseswap/sdk'
import { SmartChefPoolInfo } from '../types'
import { HARMONY_MAINNET_SMART_CHEF_POOLS } from './harmony/mainnet'

export const SMART_CHEF_POOL_INFOS: {
  [chainId in ChainId]?: Record<string, SmartChefPoolInfo[]>
} = {
  [ChainId.HARMONY_MAINNET]: HARMONY_MAINNET_SMART_CHEF_POOLS,
  [ChainId.GOERLI]: HARMONY_MAINNET_SMART_CHEF_POOLS,
  [ChainId.FINDORA]: HARMONY_MAINNET_SMART_CHEF_POOLS,
  [ChainId.ANVILTESTNET]: HARMONY_MAINNET_SMART_CHEF_POOLS
}
