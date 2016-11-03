# slice.js

> **slice.js** is a simple(`< 1 Kb`) javascript library to engance String.substring / Array.slice with `python slice style`.

In python, we can process string or array with code below:

```py
string = '12345678'
print (string[1:6:2])
```

Use this library, we can do similar things in javascript.

[![Build Status](https://travis-ci.org/hustcc/slice.js.svg?branch=master)](https://travis-ci.org/hustcc/slice.js) [![npm](https://img.shields.io/npm/v/slice.js.svg?style=flat-square)](https://www.npmjs.com/package/slice.js) [![npm](https://img.shields.io/npm/dt/slice.js.svg?style=flat-square)](https://www.npmjs.com/package/slice.js) [![npm](https://img.shields.io/npm/l/slice.js.svg?style=flat-square)](https://www.npmjs.com/package/slice.js)


# 1. Install

> **npm install slice.js**


# 2. Import It

 - `Script` tag.

```html
<script type="text/javascript" src="dist/slice.js.min.js"></script>
```

 - `ES6` style.

```js
var slice = require('slice.js');

//or

import slice from 'slice.js';
```


# 3. Usage & API

There is only one API named `slice`. Below:

```js
// for array
var arr = [1, '2', 3, '4', 5, '6', 7, '8', 9, '0'];

slice(arr)('2:5');  		// [3, '4', 5]
slice(arr)(':-2');  		// [1, '2', 3, '4', 5, '6', 7, '8']
slice(arr)('-2:');  		// [9, '0']
slice(arr)('1:5:2');  	// ['2', '4']
slice(arr)('5:1:-2');  	// ['6', '4']

// for string
var str = '1234567890';
slice(str)('2:5');  		// '345'
slice(str)(':-2');  		// '12345678'
slice(str)('-2:');  		// '90'
slice(str)('1:5:2');  	// '24'
slice(str)('5:1:-2');  	// '64'

```


# 4. Test

> npm install
> 
> npm test


# 5. LICENSE

MIT