import { ChainId } from '@donkswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.SEPOLIA]: '0x2f286285b94032C5fEBec05AF9d7431776AAf841',
  [ChainId.HARMONY_MAINNET]: '0xFE4980f62D708c2A84D3929859Ea226340759320',
  [ChainId.ARBITRUM]: '0x7eCfBaa8742fDf5756DAC92fbc8b90a19b8815bF',
  [ChainId.POLYGON]: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  [ChainId.BINANCE]: '0xe348b292e8eA5FAB54340656f3D374b259D658b8'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
