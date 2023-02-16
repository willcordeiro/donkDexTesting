import { TokenMain } from './govTokenClass'

export default function useCreateGovernanceToken(chainId: number): any {
  const dataTokenGrav = {
    decimals: 18,
    symbol: 'FRA',
    name: 'FINDORA',
    chainId: 2152,
    address: '0x0000000000000000000000000000000000001000'
  }

  const dataTokenFRA = {
    decimals: 18,
    symbol: 'Grav',
    name: 'Grav',
    chainId: 5,
    address: '0xC6baB722a7049B3363C4A7b76cf78B3beb6483c2'
  }

  const gravToken = new TokenMain(
    dataTokenGrav.chainId,
    dataTokenGrav.address,
    dataTokenGrav.decimals,
    dataTokenGrav.symbol,
    dataTokenGrav.name
  )
  const fraToken = new TokenMain(
    dataTokenFRA.chainId,
    dataTokenFRA.address,
    dataTokenFRA.decimals,
    dataTokenFRA.symbol,
    dataTokenFRA.name
  )

  if (chainId == 2152) {
    console.log(chainId, 'setted main token')
    console.log(gravToken)
    return gravToken
  } else if (chainId == 5) {
    console.log(chainId, 'setted main token')
    console.log(fraToken)
    return fraToken
  }
}
