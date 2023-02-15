export class TokenMain {
  readonly chainId: number
  readonly address: string
  readonly decimals: number
  readonly symbol: string | undefined
  readonly name: string | undefined

  constructor(chainId: number, address: string, decimals: number, symbol?: string, name?: string) {
    this.chainId = chainId
    this.address = address
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }
}

export default function useCreateGovernanceToken(chainId: number): any {
  const dataTokenGrav = {
    decimals: 18,
    symbol: 'FRA',
    name: 'FINDORA',
    chainId: 2152,
    address: '0xc5c31f6398339efa1599d4153e88c4613dd7ecb2'
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
