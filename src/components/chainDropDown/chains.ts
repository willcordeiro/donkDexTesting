// Function to handle network switch/addition and return true if successful, false otherwise
async function switchOrAddNetwork(
  targetNetworkId: string,
  chainName: string,
  nativeCurrency: any,
  rpcUrls: string[],
  blockExplorerUrls: string[]
): Promise<boolean> {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: targetNetworkId }]
    })

    return true // User accepted the switch
  } catch (switchError) {
    const errorCode: any = switchError

    if (errorCode.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: targetNetworkId,
              chainName,
              nativeCurrency,
              rpcUrls,
              blockExplorerUrls
            }
          ]
        })

        return true // User accepted adding the network
      } catch (addError) {
        console.log('Error adding Chain', addError)
      }
    }

    return false // User declined the switch or error occurred
  }
}

// Individual network functions with their respective configurations
export async function Polygon(): Promise<boolean> {
  const targetNetworkId = '0x89'
  const chainName = 'Polygon'
  const nativeCurrency = {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18
  }
  const rpcUrls = ['https://polygon-rpc.com']
  const blockExplorerUrls = ['https://polygonscan.com/']

  return switchOrAddNetwork(targetNetworkId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls)
}

export async function Arbitrum(): Promise<boolean> {
  const targetNetworkId = '0xA4B1'
  const chainName = 'Arbitrum'
  const nativeCurrency = {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  }
  const rpcUrls = ['https://arb1.arbitrum.io/rpc']
  const blockExplorerUrls = ['https://arbiscan.io']

  return switchOrAddNetwork(targetNetworkId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls)
}

export async function Binance(): Promise<boolean> {
  const targetNetworkId = '0x38'
  const chainName = 'Smart Chain'
  const nativeCurrency = {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18
  }
  const rpcUrls = ['https://bsc-dataseed.binance.org/']
  const blockExplorerUrls = ['https://bscscan.com']

  return switchOrAddNetwork(targetNetworkId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls)
}
