import { Fraction, TokenAmount } from '@donkswap/sdk'

export default function calculatePoolShare(baseBlockRewards: TokenAmount, poolBlockRewards: TokenAmount): Fraction {
  return new Fraction(poolBlockRewards.raw, baseBlockRewards.raw)
}
