FROM node:14-alpine as deps
LABEL maintainer="dev@rada.io"

WORKDIR /app
COPY package.json ./
RUN yarn install --ignore-scripts

FROM node:14-alpine as builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

FROM node:14-alpine as runner
WORKDIR /app
RUN addgroup -g 1001 appgroup
RUN adduser -D -u 1001 appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

# COPY without --chown will always run as root even we have switched to appuser
COPY --from=builder --chown=appuser:appgroup /app/ ./

CMD [ "yarn", "start:prod" ]