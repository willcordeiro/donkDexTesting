import { Currency, Percent, Price } from '@donkswap/sdk'
import React, { useContext } from 'react'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import { AutoColumn } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import { ONE_BIPS } from '../../constants'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../theme'
import styled from 'styled-components'

const Text2 = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

export function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <AutoColumn justify="center">
          <TYPE.black>
            {' '}
            <Text2>{price?.toSignificant(6) ?? '-'} </Text2>
          </TYPE.black>
          <Text fontWeight={500} fontSize={14} pt={1}>
            <Text2>
              {currencies[Field.CURRENCY_B]?.symbol} per {currencies[Field.CURRENCY_A]?.symbol}
            </Text2>
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TYPE.black>
            {' '}
            <Text2>{price?.invert()?.toSignificant(6) ?? '-'} </Text2>
          </TYPE.black>
          <Text fontWeight={500} fontSize={14} pt={1}>
            <Text2>
              {' '}
              {currencies[Field.CURRENCY_A]?.symbol} per {currencies[Field.CURRENCY_B]?.symbol}
            </Text2>
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TYPE.black>
            <Text2>
              {' '}
              {noLiquidity && price
                ? '100'
                : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
              %
            </Text2>
          </TYPE.black>
          <Text fontWeight={500} fontSize={14} pt={1}>
            <Text2> Share of Pool</Text2>
          </Text>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}
