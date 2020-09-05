#!/usr/bin/env bash

# Exit on fail or ctrl-c
set -e
trap "exit" INT

if [[ -z "${PACKAGE}" ]]; then
  printf "You must specify a PACKAGE name (server or server) as an environment, e.g.: PACKAGE=server"
  exit 1
fi

# TODO: read the version from the corresponding package.json
LOCAL_VERSION="${VERSION:-latest}"

DOCKER_IMAGE="docker.pkg.github.com/landazuripaul/codenames/codenames-$PACKAGE:$LOCAL_VERSION"

printf "> Building the Docker image: $DOCKER_IMAGE ...\n"

DOCKER_BUILDKIT=1 docker build -f Dockerfile -t $DOCKER_IMAGE .

printf "\n\n> Sending built image to the registry...\n"

docker push $DOCKER_IMAGE
