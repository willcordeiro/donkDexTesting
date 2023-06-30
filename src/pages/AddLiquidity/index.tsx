import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { CallOverrides } from '@ethersproject/contracts'
import { Currency, currencyEquals, TokenAmount, WETH, DEFAULT_CURRENCIES } from '@donkswap/sdk'
import React, { useCallback, useContext, useState } from 'react'
import { Plus } from 'react-feather'
import ReactGA from 'react-ga'
import { RouteComponentProps } from 'react-router-dom'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button'
import { BlueCard, LightCard } from '../../components/Card'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { MinimalPositionCard } from '../../components/PositionCard'
import Row, { RowBetween, RowFlat } from '../../components/Row'

import { PairState } from '../../data/Reserves'
import { useActiveWeb3React } from '../../hooks'
import { useCurrency } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { useWalletModalToggle } from '../../state/application/hooks'
import { Field } from '../../state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks'

import { useTransactionAdder } from '../../state/transactions/hooks'
import { useIsExpertMode, useUserSlippageTolerance } from '../../state/user/hooks'
import { TYPE } from '../../theme'
import { calculateGasMargin, calculateSlippageAmount, getRouterContract } from '../../utils'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import AppBody from '../AppBody'
import { Dots, Wrapper } from '../Pool/styleds'
import { ConfirmAddModalBottom } from './ConfirmAddModalBottom'
import { currencyId } from '../../utils/currencyId'
import { PoolPriceBar } from './PoolPriceBar'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/swap/UnsupportedCurrencyFooter'
import { BASE_CURRENCY } from '../../connectors'
import { useRouterContractAddress } from '../../utils'
import Overview from './Overview'
import styled from 'styled-components'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import ETHlogo from '../../assets/images/ethereum-logo.png'

const ButtonList = styled.div`
  display: flex;
  font-weight: 500;
  align-items: center;
  width: 100%;
  border-radius: 1rem;
  gap: 0.25rem;
  border: solid 1px grey;
  padding: 0.3rem;
  margin-bottom: 20px;
`

const Button = styled.button`
  width: 100%;
  border-radius: 0.75rem;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`

const ButtonLink = styled.button`
  width: 100%;
  border-radius: 0.75rem;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-decoration: none;
`
const Text2 = styled.span`
  color: ${({ theme }) => (theme.text2 === '#C3C5CB' ? 'black' : 'white')};
`

const ContainerApp = styled.section`
  margin: auto;
`
const ContainerSection = styled.section`
  flex: 1 1 0%;
`

export default function AddLiquidity({
  match: {
    params: { currencyIdA, currencyIdB }
  },
  history
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const { account, chainId, library } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(currencyA, WETH[chainId])) ||
        (currencyB && currencyEquals(currencyB, WETH[chainId])))
  )

  const toggleWalletModal = useWalletModalToggle() // toggle wallet when disconnected

  const expertMode = useIsExpertMode()

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  const isValid = !error

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings

  const [allowedSlippage] = useUserSlippageTolerance() // custom from users
  const [txHash, setTxHash] = useState<string>('')

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? ''
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field])
      }
    },
    {}
  )

  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0')
      }
    },
    {}
  )

  const v2RouterContractAddress = useRouterContractAddress()

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], v2RouterContractAddress)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], v2RouterContractAddress)

  const addTransaction = useTransactionAdder()

  async function onAdd() {
    if (!chainId || !library || !account) return
    const router = getRouterContract(chainId, library, account)

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0]
    }

    let estimate,
      method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    if (
      (currencyA && DEFAULT_CURRENCIES.includes(currencyA)) ||
      (currencyB && DEFAULT_CURRENCIES.includes(currencyB))
    ) {
      const tokenBIsETH = currencyB && DEFAULT_CURRENCIES.includes(currencyB)

      estimate = router.estimateGas.addLiquidityETH
      method = router.addLiquidityETH

      args = [
        wrappedCurrency(tokenBIsETH ? currencyA : currencyB, chainId)?.address ?? '', // token
        (tokenBIsETH ? parsedAmountA : parsedAmountB).raw.toString(), // token desired
        amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        deadline.toHexString()
      ]
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).raw.toString())
    } else {
      estimate = router.estimateGas.addLiquidity
      method = router.addLiquidity
      args = [
        wrappedCurrency(currencyA, chainId)?.address ?? '',
        wrappedCurrency(currencyB, chainId)?.address ?? '',
        parsedAmountA.raw.toString(),
        parsedAmountB.raw.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        deadline.toHexString()
      ]
      value = null
    }

    setAttemptingTxn(true)

    await estimate(...args, value ? { value } : {})
      .then(estimatedGasLimit => {
        const callOptions: CallOverrides = {
          gasLimit: calculateGasMargin(estimatedGasLimit)
        }

        if (value) callOptions.value = value

        method(...args, callOptions).then(response => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary:
              'Add ' +
              parsedAmounts[Field.CURRENCY_A]?.toSignificant(3) +
              ' ' +
              currencies[Field.CURRENCY_A]?.symbol +
              ' and ' +
              parsedAmounts[Field.CURRENCY_B]?.toSignificant(3) +
              ' ' +
              currencies[Field.CURRENCY_B]?.symbol
          })

          setTxHash(response.hash)

          ReactGA.event({
            category: 'Liquidity',
            action: 'Add',
            label: [currencies[Field.CURRENCY_A]?.symbol, currencies[Field.CURRENCY_B]?.symbol].join('/')
          })
        })
      })
      .catch(error => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error)
        }
      })
  }

  const modalHeader = () => {
    return noLiquidity ? (
      <AutoColumn gap="20px">
        <LightCard mt="20px" borderRadius="20px">
          <RowFlat>
            <Text fontSize="28px" fontWeight={500} lineHeight="42px" marginRight={10}>
              {currencies[Field.CURRENCY_A]?.symbol + '/' + currencies[Field.CURRENCY_B]?.symbol}
            </Text>
            <DoubleCurrencyLogo
              currency0={currencies[Field.CURRENCY_A]}
              currency1={currencies[Field.CURRENCY_B]}
              size={30}
            />
          </RowFlat>
        </LightCard>
      </AutoColumn>
    ) : (
      <AutoColumn gap="20px">
        <RowFlat style={{ marginTop: '20px' }}>
          <Text fontSize="28px" fontWeight={500} lineHeight="42px" marginRight={10}>
            {liquidityMinted?.toSignificant(6)}
          </Text>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={30}
          />
        </RowFlat>
        <Row>
          <Text fontSize="24px">
            {currencies[Field.CURRENCY_A]?.symbol + '/' + currencies[Field.CURRENCY_B]?.symbol + ' Pool Tokens'}
          </Text>
        </Row>
        <TYPE.italic fontSize={12} textAlign="left" padding={'8px 0 0 0 '}>
          {`Output is estimated. If the price changes by more than ${allowedSlippage /
            100}% your transaction will revert.`}
        </TYPE.italic>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <ConfirmAddModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }

  const pendingText = `Supplying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${
    currencies[Field.CURRENCY_A]?.symbol
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)} ${currencies[Field.CURRENCY_B]?.symbol}`

  const handleCurrencyASelect = useCallback(
    (currencyA: Currency) => {
      const newCurrencyIdA = currencyId(currencyA)

      if (newCurrencyIdA === currencyIdB) {
        history.push(`/add/${currencyIdB}/${currencyIdA}`)
      } else {
        history.push(`/add/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, history, currencyIdA]
  )

  const handleCurrencyBSelect = useCallback(
    (currencyB: Currency) => {
      const newCurrencyIdB = currencyId(currencyB)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(`/add/${currencyIdB}/${newCurrencyIdB}`)
        } else {
          history.push(`/add/${newCurrencyIdB}`)
        }
      } else {
        history.push(`/add/${currencyIdA ? currencyIdA : BASE_CURRENCY.symbol}/${newCurrencyIdB}`)
      }
    },
    [currencyIdA, history, currencyIdB]
  )

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [onFieldAInput, txHash])

  const isCreate = history.location.pathname.includes('/create')

  const addIsUnsupported = useIsTransactionUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  const twoCurrencies: any = []

  twoCurrencies.push(currencies?.CURRENCY_A)
  twoCurrencies.push(currencies?.CURRENCY_B)

  const styles = {
    maxWidth: twoCurrencies[0] && twoCurrencies[1] ? '72rem' : '32rem'
  }

  return (
    <>
      <div className="pt-4 pb-4">
        <ContainerApp style={styles}>
          {twoCurrencies[0] && twoCurrencies[1] ? (
            <header className="pb-14">
              <Link to="/pool">
                <ButtonLink type="button" className="fic gap-1 font-semibold px-2 py-2 mb-4">
                  <Text2>
                    <AiOutlineArrowLeft fontSize="14px" />
                  </Text2>
                  <Text2> Back to pool list</Text2>
                </ButtonLink>
              </Link>
              <div className="flex items-center gap-1">
                <img src={`${twoCurrencies[0]?.tokenInfo?.logoURI ?? ETHlogo}`} alt="noImage" className="w-8 sm:w-10" />
                <Text2 className="font-semibold text-2xl text-black">{twoCurrencies[0]?.symbol}</Text2>
                <Text2>/</Text2>
                <img src={`${twoCurrencies[1]?.tokenInfo?.logoURI ?? ETHlogo}`} alt="noImage" className="w-8 sm:w-10" />
                <Text2 className="font-semibold text-2xl text-black">{twoCurrencies[1]?.symbol}</Text2>
              </div>
            </header>
          ) : (
            ''
          )}

          <main className="flex max-lg:flex-col gap-10">
            {twoCurrencies[0] && twoCurrencies[1] ? (
              <>
                <Overview />
              </>
            ) : (
              ''
            )}

            <ContainerSection>
              {twoCurrencies[0] && twoCurrencies[1] ? (
                <>
                  <ButtonList>
                    <div className="w-full">
                      <Button type="button" style={{ backgroundColor: '#fba676', padding: '12px', color: '#f1ece9' }}>
                        <Text2>Add Liquidity</Text2>
                      </Button>
                    </div>
                    <div className="w-full">
                      <Link
                        to={`/remove/${
                          twoCurrencies[0].symbol === 'ETH' ? twoCurrencies[0].symbol : twoCurrencies[0].address
                        }/${twoCurrencies[1].symbol === 'ETH' ? twoCurrencies[1].symbol : twoCurrencies[1].address}`}
                      >
                        <ButtonLink type="button">
                          {' '}
                          <Text2>Remove Liquidity</Text2>
                        </ButtonLink>
                      </Link>
                    </div>
                  </ButtonList>
                </>
              ) : (
                ''
              )}
              <div className="container-appBody">
                <AppBody>
                  <AddRemoveTabs creating={isCreate} adding={true} />
                  <Wrapper>
                    <TransactionConfirmationModal
                      isOpen={showConfirm}
                      onDismiss={handleDismissConfirmation}
                      attemptingTxn={attemptingTxn}
                      hash={txHash}
                      content={() => (
                        <ConfirmationModalContent
                          title={noLiquidity ? 'You are creating a pool' : 'You will receive'}
                          onDismiss={handleDismissConfirmation}
                          topContent={modalHeader}
                          bottomContent={modalBottom}
                        />
                      )}
                      pendingText={pendingText}
                      currencyToAdd={pair?.liquidityToken}
                    />
                    <AutoColumn gap="20px">
                      <CurrencyInputPanel
                        value={formattedAmounts[Field.CURRENCY_A]}
                        onUserInput={onFieldAInput}
                        onMax={() => {
                          onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
                        }}
                        onCurrencySelect={handleCurrencyASelect}
                        showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
                        currency={currencies[Field.CURRENCY_A]}
                        id="add-liquidity-input-tokena"
                        showCommonBases
                      />
                      <ColumnCenter>
                        <Plus size="16" color={theme.text2} />
                      </ColumnCenter>
                      <CurrencyInputPanel
                        value={formattedAmounts[Field.CURRENCY_B]}
                        onUserInput={onFieldBInput}
                        onCurrencySelect={handleCurrencyBSelect}
                        onMax={() => {
                          onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
                        }}
                        showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
                        currency={currencies[Field.CURRENCY_B]}
                        id="add-liquidity-input-tokenb"
                        showCommonBases
                      />
                      {currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID && (
                        <>
                          <LightCard padding="0px" borderRadius={'20px'}>
                            <RowBetween padding="1rem">
                              <TYPE.subHeader fontWeight={500} fontSize={14}>
                                <Text2> {noLiquidity ? 'Initial prices' : 'Prices'} and pool share</Text2>
                              </TYPE.subHeader>
                            </RowBetween>{' '}
                            <LightCard padding="1rem" borderRadius={'20px'}>
                              <PoolPriceBar
                                currencies={currencies}
                                poolTokenPercentage={poolTokenPercentage}
                                noLiquidity={noLiquidity}
                                price={price}
                              />
                            </LightCard>
                          </LightCard>
                        </>
                      )}

                      {addIsUnsupported ? (
                        <ButtonPrimary disabled={true}>
                          <TYPE.main mb="4px">Unsupported Asset</TYPE.main>
                        </ButtonPrimary>
                      ) : !account ? (
                        <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
                      ) : (
                        <AutoColumn gap={'md'}>
                          {(approvalA === ApprovalState.NOT_APPROVED ||
                            approvalA === ApprovalState.PENDING ||
                            approvalB === ApprovalState.NOT_APPROVED ||
                            approvalB === ApprovalState.PENDING) &&
                            isValid && (
                              <RowBetween>
                                {approvalA !== ApprovalState.APPROVED && (
                                  <ButtonPrimary
                                    onClick={approveACallback}
                                    disabled={approvalA === ApprovalState.PENDING}
                                    width={approvalB !== ApprovalState.APPROVED ? '48%' : '100%'}
                                  >
                                    {approvalA === ApprovalState.PENDING ? (
                                      <Dots>Approving {currencies[Field.CURRENCY_A]?.symbol}</Dots>
                                    ) : (
                                      'Approve ' + currencies[Field.CURRENCY_A]?.symbol
                                    )}
                                  </ButtonPrimary>
                                )}
                                {approvalB !== ApprovalState.APPROVED && (
                                  <ButtonPrimary
                                    onClick={approveBCallback}
                                    disabled={approvalB === ApprovalState.PENDING}
                                    width={approvalA !== ApprovalState.APPROVED ? '48%' : '100%'}
                                  >
                                    {approvalB === ApprovalState.PENDING ? (
                                      <Dots>Approving {currencies[Field.CURRENCY_B]?.symbol}</Dots>
                                    ) : (
                                      'Approve ' + currencies[Field.CURRENCY_B]?.symbol
                                    )}
                                  </ButtonPrimary>
                                )}
                              </RowBetween>
                            )}
                          <ButtonError
                            onClick={() => {
                              expertMode ? onAdd() : setShowConfirm(true)
                            }}
                            error={!isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]}
                          >
                            <Text fontSize={20} fontWeight={500}>
                              {error ?? 'Supply'}
                            </Text>
                          </ButtonError>
                        </AutoColumn>
                      )}
                    </AutoColumn>
                  </Wrapper>
                </AppBody>
              </div>
              {!addIsUnsupported ? (
                pair && !noLiquidity && pairState !== PairState.INVALID ? (
                  <AutoColumn style={{ minWidth: '20rem', width: '100%', maxWidth: '400px', marginTop: '1rem' }}>
                    <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
                  </AutoColumn>
                ) : null
              ) : (
                <UnsupportedCurrencyFooter
                  show={addIsUnsupported}
                  currencies={[currencies.CURRENCY_A, currencies.CURRENCY_B]}
                />
              )}
            </ContainerSection>
          </main>
        </ContainerApp>
      </div>
    </>
  )
}
