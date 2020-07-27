#!/bin/bash
#BUILD OUR APP
yarn build
#BUILD THE IMAGE
docker build -t registry.gitlab.com/jebo87/react-ads:test -f `pwd`/k8s/Dockerfile .
#PUSH TO OUR REGISTRY
docker push registry.gitlab.com/jebo87/react-ads:test
#REMOVE UNUSED IMAGES
docker image prune -f