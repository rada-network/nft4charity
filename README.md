# Description

NFT4Charity is an open sourced blockchain project to help make Charity Campaigns BETTER.

Our immediate goal is the raise $1M for Covid campaigns in Vietnam. Our long term goal is to demonstrate how blockchain can make the world more transparent and open and kind.

Recently, we have seen inexperienced fundraisers who, despite their good intent, lose their reputation and in some case, being sued for fraud. With Blockchain & NFT, we can track all transactions and also make charitable campaigns more community-driven. We want to create an open source project that any one can run to raise money for their community in a Transparent way.

# Join us by filling out this form

https://bit.ly/rada-charity-team

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

Update `.env.dev` file in `backend` folder

Setup the memory of you docker machine to 4GB (like image below).

![No pic](/images/docker.png)

### To run smart contract tests, go to smartcontracts folder and run

```sh
# From root folder run
$ run_test.sh
```

# Others

## Install metamask

1. Install chrome extension from https://metamask.io/
2. Generate a new wallet.
3. Switch to Goerli testnet.
4. Get some ETH from faucet.

- Method 1: https://goerli.net/
- Method 2: https://faucet.goerli.mudit.blog/ Requires public post on twitter or facebook.

<img width="639" alt="Screen Shot 2021-10-24 at 22 03 38" src="https://user-images.githubusercontent.com/156454/138600053-8d0826fd-4e45-42e0-b538-6c51c912005a.png">

