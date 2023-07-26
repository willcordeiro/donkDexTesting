import { ChainId } from '@donkswap/sdk'
import { SmartChefPoolInfo } from '../types'
import { HARMONY_MAINNET_SMART_CHEF_POOLS } from './harmony/mainnet'

export const SMART_CHEF_POOL_INFOS: {
  [chainId in ChainId]?: Record<string, SmartChefPoolInfo[]>
} = {
  [ChainId.HARMONY_MAINNET]: HARMONY_MAINNET_SMART_CHEF_POOLS,
  [ChainId.SEPOLIA]: HARMONY_MAINNET_SMART_CHEF_POOLS,
  [ChainId.ARBITRUM]: HARMONY_MAINNET_SMART_CHEF_POOLS,
  [ChainId.POLYGON]: HARMONY_MAINNET_SMART_CHEF_POOLS,
  [ChainId.BINANCE]: HARMONY_MAINNET_SMART_CHEF_POOLS
}
