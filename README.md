# pys

> **pys** is a simple(`< 1 Kb`) javascript library to engance String.substring / Array.slice with `python slice style`.

In python, we can process string or array with code below:

```py
string = '12345678'
print (string[1:6:2])
```

Use this library, we can do similar things in javascript.

[![Build Status](https://travis-ci.org/hustcc/pys.svg?branch=master)](https://travis-ci.org/hustcc/pys) [![npm](https://img.shields.io/npm/v/pys.svg?style=flat-square)](https://www.npmjs.com/package/pys) [![npm](https://img.shields.io/npm/dt/pys.svg?style=flat-square)](https://www.npmjs.com/package/pys) [![npm](https://img.shields.io/npm/l/pys.svg?style=flat-square)](https://www.npmjs.com/package/pys)


# 1. Install

> **npm install pys**


# 2. Import It

 - `Script` tag.

```html
<script type="text/javascript" src="dist/pys.min.js"></script>
```

 - `ES6` style.

```js
var pys = require('pys');

//or

import pys from 'pys';
```


# 3. Usage & API

There is only one API named `pys`. Below:

```js
// for array
var arr = [1, '2', 3, '4', 5, '6', 7, '8', 9, '0'];

pys(arr)('2:5');  		// [3, '4', 5]
pys(arr)(':-2');  		// [1, '2', 3, '4', 5, '6', 7, '8']
pys(arr)('-2:');  		// [9, '0']
pys(arr)('1:5:2');  	// ['2', '4']
pys(arr)('5:1:-2');  	// ['6', '4']

// for string
var str = '1234567890';
pys(str)('2:5');  		// '345'
pys(str)(':-2');  		// '12345678'
pys(str)('-2:');  		// '90'
pys(str)('1:5:2');  	// '24'
pys(str)('5:1:-2');  	// '64'

```


# 4. Test

> npm install
> 
> npm test


# 4. LICENSE

MIT