
OUT="aerofsapi.js"
.PHONY : build dev clean

build: 
	browserify index.js  -t [ babelify --presets [ es2015 ] ] | uglifyjs -c -m \
	--screw-ie8 -o $(OUT)

dev:
	browserify index.js  -t [ babelify --presets [ es2015 ] ] -d -o $(OUT)

clean:
	rm $(OUT)
