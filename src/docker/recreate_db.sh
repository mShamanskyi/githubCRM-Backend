#!/usr/bin/env bash
docker rm -f postgres-local
docker build . -t postgres:local

docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=w23121991m --name postgres-local postgres:local