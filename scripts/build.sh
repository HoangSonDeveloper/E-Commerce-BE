#!/bin/bash

cd gateway && npm run copy:protos && npm run build && cd -
cd services/users-service && npm run copy:protos && npm run build && cd -
cd services/courses-service && npm run copy:protos && npm run build && cd -
docker-compose build --no-cache