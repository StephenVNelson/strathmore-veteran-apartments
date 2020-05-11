#### CSS Box Sizing
* If you set `box-sizing: border-box;` on an element, padding and border are included in the width and height:
* This way you won't have to seperately consider an element's padding

#### Grab form elements after submission
example: `event.target.elements.pet.value`

#### `for...of` vs `for...in` loops
`var a = ["a","b","c","d","e"];`
* `for..of` loops over the values.
  ```
  for (var val of a) {
    console.log( val );
  }
  // "a" "b" "c" "d" "e"
  ```
* `for..in` loops over the keys/indexes
  ```  
  for (var idx in a) {
    console.log( idx );
  }
  // 0 1 2 3 4
  ```

#### Default iterables in JS:
1. Arrays
2. Strings
3. Generators
4. Collections / TypedArrays

#### stopping `for..of` loops
1. break
2. continue
3. return (if in a function)
4. thrown exceptions. 

> In any of these cases, the iterator's return(..) function is automatically called (if one exists) to let the iterator perform cleanup tasks, if necessary.

#### Iterators
Any objects which implements the Iterator Protocol by having a `next()` method
* `next()` method returns an object with two properties: 
  - `value`
    > the next value in the sequence; 
  - `done`
    > which is true if the last value in the sequence has already been consumed.

#### Using hooks for functional compnent instead of `componentDidMount()`
1. import in `useEffect` hook
    ````
    import React, {useEffect} from "react"
    ````
2. call `useEffect` and put in an anonymous function as an argument which holds all of your `componentDidMount` logic.
    ````
    useEffect( ()=> {
      if (courses.length === 0){...}
    })
    ```
3. The second argument to useEffect is something for react to check for changes so it can rerender everything. 
    > If you only want this to run once like `componentDidMount` then you can just put in an empty array
    ```
    useEffect( ()=> {
      if (courses.length === 0){...}
    }, []); // EMTPY ARRAY
    ```

#### ES6: 6 Class Syntax Solved Problems
1. There's no more references to `.prototype` cluttering the code.
2. Extends gets rid of the need to use `Object.create(..)` to replace a `.prototype` object that's linked, or 
     * having to set with `.__proto__` or
     * `Object.setPrototypeOf(..)`
3. `super(..)` now gives us a very helpful relative polymorphism capability
4. Class literal syntax has no affordance for specifying properties (only methods). 
5. You can extend built-in object (sub)types, like `Array` or `RegExp`, in a very natural way. 
```
class Widget {
	constructor(width,height) {
		this.width = width || 50;
		this.height = height || 50;
		this.$elem = null;
	}
	render($where){
		if (this.$elem) {
			this.$elem.css( {
				width: this.width + "px",
				height: this.height + "px"
			} ).appendTo( $where );
		}
	}
}

class Button extends Widget {
	constructor(width,height,label) {
		super( width, height );
		this.label = label || "Default";
		this.$elem = $( "<*button>" ).text( this.label );
	}
	render($where) {
		super.render( $where );
		this.$elem.click( this.onClick.bind( this ) );
	}
	onClick(evt) {
		console.log( "Button '" + this.label + "' clicked!" );
	}
}
```

#### GROUP BY
* `GROUP BY` takes a specific attribute value that is shared across many rows and combines (folds) all of the rows together that have that same attribute value
  * any column after a `GROUP BY` must:
     1. be the result of an aggregate function (`COUNT`, `AVG`, `SUM`)
     2. be an attribute that is consistent with the folded attribute (ablum titles are always going to aligh with the `GROUP BY` almbum id)
       ```
       SELECT a.title AS Album,
       COUNT(t.track_number) as Tracks
       GROUP BY a.id
       ```
_Full Example_
```
SELECT a.title AS Album, COUNT(t.track_number) as Tracks
  FROM track AS t
  JOIN album AS a
    ON a.id = t.album_id
  WHERE a.artist = "The Beatles"
  GROUP BY a.id
  HAVING Tracks >= 10
  ORDER BY Tracks DESC, Album
;
```

#### `HAVING`
  * is pretty much a WHERE for for aggregate columns that are the result of `GROUP BY`
  * You still need `WHERE` in case you want to filter the ungrouped data before you group.
```
SELECT COUNT(t.track_number) as Tracks
  GROUP BY a.id
  HAVING Tracks >= 10
```

#### Enabling encrypted credentials
Add the following to `config/environments/production.rb`
```
config.require_master_key = true
```

#### Accessing credentials
`Rails.application.credentials.(credential key)`

**EX:**

_credentials.yml.enc_
```
  foo: bar
```
_anyFile.rb_
```
  Rails.application.credentials.foo # bar.
```

#### Credentials Master Key
* Located at `config/master.key`
* Created when you run `rails new`. 
* Also added to `.gitignore` so it doesn't get committed to your repository.

#### Adding/Editing Credentials
* You cannot edit the file directly. 
* To add credentials, run:  
`EDITOR=vi bin/rails credentials:edit`

* The encrypted version will be saved to `config/credentials.yml.enc.`

#### Predicate
A function that returns true or false

#### JavaScript Testing Libraries
1. Jest: _By FB_
2. Mocha: _very configurable_
3. Jasmine: _like mocha but paired down_
4. Tape: _simplest library_
5. AVA: _...it's ok_

#### Helper Testing Libraries for React
1. React Test Utils
  * clunky/verbose API
2. Enzyme
  * uses React Test Utils in the background but gives you an easier API
  * uses JSDOM (virtual DOM)
  * cheerio (css selector)
3. React Testing Library

#### 7 Steps to Production Build Process
1. Lint and runs tests
2. Bundle and minify JS and CSS
3. Generate JS and CSS sourcemaps
4. Exclude Dev specific concerns
5. Build React in Production mode
6. Generate Bundle report
7. Run production build on local webserver

#### Production Step 1: Lint and runs tests
1. Add `test:ci` script to `package.json`
    ```
    "test:ci": "jest",
    ```
2. Make a `prebuild` script that cleans the build and runs the tests
    ```
    "prebuild": "run-p clean:build test:ci",
    ```
    > This makes it so if the tests fail then the build will fail







#### Production Step 2: Bundle and minify JS and CSS
1. Import minifier into production webpack config
    > `const MiniCSSExtractPlugin = require('mini-css-extract-plugin')`
2. Add minifier to plugin
    ```
    plugins: [
      ...
      new MiniCSSExtractPlugin({
        filename: "[name].[contenthash].css"
    }),
    ```
    > with this name webpack will pick the name for us and add a hash to it so the filename will only change when the CSS changes.
    >
    > This supports "far expires" headers on your web server so users only have to reload file when it changes. 
3. Add minifier settings to `HtmlWebpackPlugin`
    ```
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    })
    ```
4. Add minifier settings to module css rules
    ```
    module: {
      rules: [
        ...
        {
          test: /(\.css)$/,
          use: [
            MiniCSSExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("cssnano")],
                sourceMap: true
              }
            }
          ]
        }
      ]
     }
    ```

#### Production Step 3: Generate JS and CSS sourcemaps
1. Change devtool to just source-map
    > It takes longer to make but it's higher quality
    ```
    ~~devtool: 'cheap-module-source-map',~~
    devtool: 'source-map',
    ```


#### Production Step 4: Exclude Dev Specific Concerns
1. create seperate configure store files for production and development
     * `configureStore.dev.js`
     * `configureStore.prod.js`
2. remove development things from production like immutable state invariant and compose
3. Create a new configureStore file that uses commonJS in conditionals to export depending on node environment
    ```
    if (process.env.NOCE_ENV === "production") {
      module.exports = require("./configureStore.prod")
    } else {
      module.exports = require("./configureStore.dev")
    }
    ```
4. Duplicate dev webpack file to startoff a production webpack file
    > `webpack.config.prod.js`
5. Change node env variable to production
    > `process.env.NODE_ENV = 'production';`
6. set webpack mode to production
    ```
    module.exports = {
      ~~mode: 'development',~~
      mode: 'production',
      ...
    ```
7. Delete the devserver section
    ```
      ~~devServer: {~~
        ~~stats: 'minimal',~~
        ~~...~~
      ~~},~~
    ```


#### Production Step 5: Build React in Production mode
1. Add node environment to define plugin so react knows what environment it's running
    ```
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
          ...
        }),
    ```

#### Production Step 6: Generate Bundle report
1. import analyizer into production webpack config
    > `const webpackBundleAnalyizer = require('webpack-bundle-analyzer')`
2. add analyizer to plugins
    ```
    plugins: [
      new webpackBundleAnalyizer.BundleAnalyzerPlugin({ analyzerMode: "static" }),
      ...
    ],
    ```

#### Production Step 7: Run production build on local webserver
1. Create `build` script in `package.json`
    > `"build": "webpack --config webpack.config.prod.js"`
2. Add script that will delete the previous build folder
    ```
    "clean:build": "rimraf ./build && mkdir build",
    ```
    > rimraf is a package that is good for deleting things cross platform
3. Create a `serve:build` script that will run after builds so we can see how it works
    ```
    "serve:build": "http-server ./build"
    ```
    > http-server runs a lightweight conveneint server
4. Create a `postbuild` script to handle the API and server
    ```
    "postbuild": "run-p start:api serve:build",
    ```
