import { Token, GOVERNANCE_TOKENS } from '@oneverseswap/sdk'
import { useActiveWeb3React } from '../index'

export default function useGovernanceToken(): Token | undefined {
  const { chainId } = useActiveWeb3React()
  return chainId ? GOVERNANCE_TOKENS[chainId] : undefined
}
