install:
	npm install

start:
	npx babel-node 'src/bin/gendiff.js'

publish:
	npm publish

lint:
	npx eslint .

lint2:
	npx eslint --format json .

test:
	npm test

watch:
	npx jest --watch