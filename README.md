# qm-dedupe

> Utility to remove duplicates in array. Works also with array of objects.

:warning: Disclaimer:

This module is published in good faith and for learning purpose only. The code is not production-ready, so any usage of it is strictly at your own risk :see_no_evil:.

## Installation

```
npm i -S qm-dedupe
```

## Usage

```js
const { dedupe, dedupeExtensive } = require("qm-dedupe");

const arrayWithoutDuplicates = dedupe(array, hasher);
// default: hasher = JSON.stringify
// -> new array with unique values

const hasher = JSON.stringify;
const chooseToCompare = item => item.name;
const secondaryCheckFunction = item => item.parent === "inbox";
const collection = array;

const dedupeExtensiveResult = dedupeExtensive({
  hasher,
  chooseToCompare,
  secondaryCheckFunction,
  collection
});
// -> [[unique elements],[removed elements]]
```

## Secondary Check Function Usage

Module is able to control duplicates by passing function to `secondaryCheckFunction` options property. When it is not passed the deduped object contains only unique elements controlled by function passed to `chooseToCompare` options property. By passing Secondary Check Function you are able to manipulate duplicates by value of another object property. This functions acts the same like `Array.prototype.filter`. Item which passes provided test is moved to _removed elements_ of function's output.

For more info read the source code and test files :page_facing_up:.

## Credits

Based on module [seriousManual/dedupe:](https://github.com/seriousManual/dedupe).

## License

MIT © [qaraluch](https://github.com/qaraluch)
