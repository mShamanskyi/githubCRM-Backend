#!/usr/bin/env bash
docker rm -f postgres-local
docker build . -t postgres:local

docker run -d -p 9999:5432 \
  -e POSTGRES_PASSWORD=w23121991m\
  -e POSTGRES_DB=github-crm\
  --name postgres-local\
  postgres