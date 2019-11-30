install:
	yarn install

dev:
	npx tsc -w

build:
	rm -rf ./dist && npx tsc

lint:
	npx eslint ./src/*.ts

start:
	node ./dist/index.js

compose: install build start