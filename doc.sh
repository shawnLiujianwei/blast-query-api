#!/usr/bin/env bash
./node_modules/.bin/jsdoc -c conf.json -t ./node_modules/ink-docstrap/template -R ./README.md -r -d docs --verbose src
