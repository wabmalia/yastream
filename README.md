# yastream
Yet another stream library

![GitHub package.json version](https://img.shields.io/github/package-json/v/wabmalia/yastream?style=flat-square)

## Motivation
The use of **streams** is growing in so many languages, but **JavaScript** is still lacking this functionality natively.

You might say: **"But javascript already has *.map*, *.filter* and many other functionalities over arrays."**
Don't get me wrong, it is enough for several use cases, but consider the following example:
```javascript
[1, 2, 3, 4]
  .map(value => value * 2)
  .find(element => element > 2)
// expected output: 4
```
In this case, even though the result comes from the second position of the array, the map iterated all entries before trying to find the right element.

I believe that out there already exists many libraries that do this, but I decided to do my own version in order to learn more about JavaScript.

## Installation
This module is distributed via npm:
```
npm install yastream
```

## Examples
For quick examples you can check bellow, but for complete functionality coverage you can look into the test files.

### Map and filter array
```javascript
const { stream } = require("yastream")

const result =
    stream([1, 2, 3])
        .map(value => value * 2)
        .filter(value => value > 3)
        .do();
// expected result = [4, 6]
```

### Map, filter and find in array
```javascript
const { stream } = require("yastream")

const result =
    stream([1, 2, 3])
        .map(value => value * 2)
        .filter(value => value > 3)
        .findFirst(value => value == 4);
// expected result = '4'
// it only iterates the first two element of the array
```
