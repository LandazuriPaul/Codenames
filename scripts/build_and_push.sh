#!/usr/bin/env bash

DOCKER_BUILDKIT=1 docker build -f ./packages/$PACKAGE/Dockerfile -t docker.pkg.github.com/landazuripaul/codenames/codenames-$PACKAGE:$VERSION .

docker push docker.pkg.github.com/landazuripaul/codenames/codenames-$PACKAGE:$VERSION
