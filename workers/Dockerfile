
FROM node:14-alpine
LABEL maintainer="nft4charity.dev@rada.io"
WORKDIR /usr/src/app

COPY package*.json ./
COPY src/transaction.js ./
COPY src/wallet.js ./
COPY src/cronjob.js ./
RUN npm install

COPY . .
CMD [ "npm", "run", "cronjob" ]