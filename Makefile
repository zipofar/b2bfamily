dev:
	npx tsc -w

build:
	rm -rf ./dist && npx tsc

lint:
	npx eslint ./src/*.ts