
FROM node:14-alpine
LABEL maintainer="nft4charity.dev@rada.io"
WORKDIR /usr/src/app

COPY package*.json ./

COPY src/campaign.js ./
COPY src/cronjob.js ./
COPY src/transaction.js ./
COPY src/wallet.js ./

RUN npm install

COPY . .
CMD [ "npm", "run", "cronjob" ]