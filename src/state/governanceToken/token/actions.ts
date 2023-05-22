import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@donkswap/sdk'
import { SerializableGovernanceTokenDetails } from '../'

export const updateGovernanceTokenDetails = createAction<{
  chainId: ChainId
  details: SerializableGovernanceTokenDetails
}>('governanceTokenDetails/add')
