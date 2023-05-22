import { JSBI, TokenAmount } from '@donkswap/sdk'
import { useSingleCallResult } from '../../../state/multicall/hooks'
import { useMasterBreederContract } from '../../useContract'
import useGovernanceToken from '../../tokens/useGovernanceToken'

export default function useBaseStakingRewardsEmission(): TokenAmount | undefined {
  const govToken = useGovernanceToken()
  const masterBreederContract = useMasterBreederContract()

  const result = useSingleCallResult(masterBreederContract, 'getNewRewardPerBlock', [0])
  const baseRewardsPerBlock =
    govToken && result && !result.loading && result.result
      ? new TokenAmount(govToken, JSBI.BigInt(result.result))
      : undefined

  return baseRewardsPerBlock
}
