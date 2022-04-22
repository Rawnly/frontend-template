#!/usr/bin/env bash

DOCKER_IMAGE=ghcr.io/aquacloud-dev/smartfish-app
VERSION=noop
BRANCH=$(echo ${GITHUB_REF#refs/heads/} | sed -r 's#/+#-#g')

if [[ $GITHUB_REF == refs/tags/* ]]; then
	VERSION=${GITHUB_REF#refs/tags/}
elif [[ $GITHUB_REF == refs/heads/* ]]; then
	VERSION=$BRANCH

	if [ "${{ github.event.repository.default_branch }}" = "$VERSION"]; then
		VERSION=latest
	fi
elif [[ $GITHUB_REF == refs/pull/* ]]; then
	VERSION=pr-${{ github.event.number }}
fi

TAGS="${DOCKER_IMAGE}:${VERSION}"

if [ -z $BRANCH ]; then
	TAGS="$TAGS,${DOCKER_IMAGE}:${BRANCH}"
fi

if [[ $VERSION =~ ^v[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
	MINOR=${VERSION%.*}
	MAJOR=${MINOR%.*}
	TAGS="$TAGS,${DOCKER_IMAGE}:${MINOR},${DOCKER_IMAGE}:${MAJOR},${DOCKER_IMAGE}:latest"
fi

echo ::set-output name=version::${VERSION}
echo ::set-output name=tags::${TAGS}
