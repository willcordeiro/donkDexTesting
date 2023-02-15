import { Token } from '@venomswap/sdk'
import { useActiveWeb3React } from '../index'
import useCreateGovernanceToken from './useCreatGovToken'

export default function useGovernanceToken(): Token | undefined {
  const { chainId } = useActiveWeb3React()
  const useCreateToken: any = useCreateGovernanceToken
  return useCreateToken(chainId)
}
