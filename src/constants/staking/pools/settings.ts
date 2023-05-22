import { ChainId } from '@donkswap/sdk'

export const STAKING_SETTINGS: {
  [chainId in ChainId]?: Record<string, any>
} = {
  [ChainId.HARMONY_MAINNET]: {
    startBlock: 10183471,
    lockRewardsRatio: 95,
    unlockedRewardsRatio: 5
  },
  [ChainId.GOERLI]: {
    startBlock: 10183471,
    lockRewardsRatio: 95,
    unlockedRewardsRatio: 5
  },
  [ChainId.ARBITRUM]: {
    startBlock: 10183471,
    lockRewardsRatio: 95,
    unlockedRewardsRatio: 5
  }
}
