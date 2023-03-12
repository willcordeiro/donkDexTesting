# Frontend

## Development

### Prerequisites

1. [Git](https://git-scm.com/)
2. [NodeJS >=12 (>=16 recommended)](https://nodejs.org/en/)
3. [Yarn](https://yarnpkg.com)

### Installation

```bash
git clone https://github.com/willcordeiro/DEX-ui.git
cd frontend
yarn install
```

### Configuring the environment

Create a new file called .env.local in the root of the project folder.

#### Findora / OneverseSwap

Add the following to the empty .env.local file:

```
REACT_APP_CHAIN_ID="2152"
REACT_APP_NETWORK_URL="https://prod-mainnet01-blockscout.prod.findora.org/"
```

#### Anvil / OneverseSwap

```
REACT_APP_CHAIN_ID=2153
REACT_APP_NETWORK_URL=https://prod-testnet.prod.findora.org:8545
```

### Run

```bash
yarn start
```
