# Frontend

## Development

### Prerequisites

1. [Git](https://git-scm.com/)
2. [NodeJS >=12 (>=16 recommended)](https://nodejs.org/en/)
3. [Yarn](https://yarnpkg.com)

### Installation

```bash
cd frontend
yarn install
```

### Configuring the environment

Create a new file called .env.local in the root of the project folder.

#### Arbitrum / DonkSwap

Add the following to the empty .env.local file:

```
REACT_APP_CHAIN_ID="42161"
REACT_APP_NETWORK_URL="https://arb1.arbitrum.io/rpc"
```

#### Sepolia/ DonkSwap

```
REACT_APP_CHAIN_ID=11155111
REACT_APP_NETWORK_URL=https://sepolia.infura.io/v3/
```

### Run

```bash
yarn start
```
