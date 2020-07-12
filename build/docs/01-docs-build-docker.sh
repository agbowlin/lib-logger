#!/bin/bash
. .build-env
echo "------------------------------------------"
echo "01-docs-build-docker.sh"
echo " - REPO_URL    = $REPO_URL"
echo " - AWS_PROFILE = $AWS_PROFILE"
echo "------------------------------------------"

docker build -t lib-logger.liquicode.com:latest . --file lib-logger.liquicode.com.dockerfile
docker tag lib-logger.liquicode.com:latest $REPO_URL/lib-logger.liquicode.com
