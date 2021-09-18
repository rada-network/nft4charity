# Description

NFT4Charity is a project from RADA DAO group to support TTMB using NFT and blockchain technology.

# Installation

Go to backend folder and run

```bash
$ yarn install
```

# Structure

Project is structure into 2 parts, frontend (FE) and backend (BE).

# Style checks

We use Prettier and ESLint to enforce a consistent code style across our codebase. For simply, let's use Prettier for formatting and Linter for catching bugs within the code

```bash
# Run style check across all the source
$ yarn format:check:all

# Apply the rules
$ yarn format:all
```

## Running by docker-compose

```bash
# From root folder run
$ run_local.sh
```

### To run local, we need to have .env file

Create .env file in `backend` folder

# Others

## Install metamask 
1. Install chrome extension from https://metamask.io/
2. Generate a new wallet.
3. Switch to Goerli testnet.
4. Get some ETH from faucet. 
- Method 1: https://goerli.net/
- Method 2: https://faucet.goerli.mudit.blog/ Requires public post on twitter or facebook. 

