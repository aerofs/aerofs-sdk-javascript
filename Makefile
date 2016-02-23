
OUT="aerofsapi.js"
.PHONY : build dev clean watch

build: 
	browserify index.js  -t [ babelify --presets [ es2015 ] --plugins [ transform-object-assign  ] ] | uglifyjs -c -m \
	--screw-ie8 -o $(OUT)

dev:
	browserify index.js  -t [ babelify --presets [ es2015 ] --plugins [ transform-object-assign  ] ] -d -o $(OUT)

watch:
	./node_modules/.bin/watchify index.js --extension=.js -t [ babelify --presets [ es2015 ] ] -d -o aerofs.js -v

clean:
	rm $(OUT)
