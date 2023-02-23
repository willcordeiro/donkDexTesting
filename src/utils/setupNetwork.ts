import { NETWORK_CHAIN_ID } from '../connectors'
import getNetworkSettings from './getNetworkSettings'

/**
 * Prompt the user to add a given network to Metamask,
 * or switch to a given network if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export default async function setupNetwork(): Promise<boolean> {
  const settings = getNetworkSettings(NETWORK_CHAIN_ID)
  const provider: any = window.ethereum
  const chainId = settings.chainId
  const hexString = chainId.toString(16)

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexString.toString(16) }]
    })
    return true
  } catch (switchError) {
    const errorCode: any = switchError

    if (errorCode.code === 4902) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [settings]
        })
      } catch (addError) {
        console.log('Error adding Chain')
        return false
      }
    }
    return true
  }
}
