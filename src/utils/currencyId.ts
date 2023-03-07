import { Currency, Token, DEFAULT_CURRENCIES } from '@oneverseswap/sdk'
import { BASE_CURRENCY } from '../connectors'

export function currencyId(currency: Currency): any {
  if (currency && DEFAULT_CURRENCIES.includes(currency)) {
    return BASE_CURRENCY && BASE_CURRENCY.symbol ? BASE_CURRENCY.address : 'FRA'
  }
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
