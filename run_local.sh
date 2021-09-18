#!/bin/bash

# Remove all containers starting w/ backend-
docker rm -f `docker ps -aq -f name=backend-*`

docker-compose down
docker-compose --file docker-compose.local.yml build
docker-compose --file docker-compose.local.yml up --force-recreate
