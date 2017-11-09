#!/usr/bin/env bash
rm -r build
mkdir build
cp -r src build/ && cp package.json build/ && cp docker/* build/
cd build && docker-compose build
