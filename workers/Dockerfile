
FROM node:14-alpine
LABEL maintainer="nft4charity.dev@rada.io"
WORKDIR /usr/src/app

COPY workers/package*.json ./

COPY workers/src/campaign.js ./
COPY workers/src/cronjob.js ./
COPY workers/src/transaction.js ./
COPY workers/src/wallet.js ./

RUN npm install

COPY . .
CMD [ "npm", "run", "cronjob" ]