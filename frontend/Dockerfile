# Build
FROM node:14.17.0-alpine AS build
WORKDIR /usr/src/app

COPY ./src ./src
COPY ./public ./public
COPY ./contracts ./contracts

COPY ./package.json ./yarn.lock ./
RUN apk --no-cache add git
RUN yarn install --slient --network-timeout 100000

COPY ./.prettierrc ./.eslintrc.js ./tsconfig.json ./craco.config.js ./tsconfig.paths.json ./tailwind.config.js ./
RUN NODE_OPTIONS=--max-old-space-size=2048 yarn build

# Run
FROM nginx:1.15.2-alpine AS run

COPY --from=build /usr/src/app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
