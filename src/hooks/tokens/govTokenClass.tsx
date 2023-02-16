export class Currency {
  readonly decimals: number
  readonly symbol?: string
  readonly name?: string

  protected constructor(decimals: number, symbol?: string, name?: string) {
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }
}

export class TokenMain extends Currency {
  readonly chainId: number
  readonly address: string
  constructor(chainId: number, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = address
  }
}
