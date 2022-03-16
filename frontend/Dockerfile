# Deps
FROM node:14.17.0-alpine AS deps
WORKDIR /app
RUN apk --no-cache add git
COPY ./package.json ./yarn.lock ./
COPY ./contracts ./contracts
RUN yarn install --slient --network-timeout 100000

# Build
FROM node:14.17.0-alpine AS build
WORKDIR /app

ARG REACT_APP_GRAPHQL_URL
ARG REACT_APP_REST_URL
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN NODE_OPTIONS=--max-old-space-size=2048 yarn build

# Run
FROM nginx:1.15.2-alpine AS run

COPY --from=build /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
