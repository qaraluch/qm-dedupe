# qm-dedupe

> Utility to remove duplicates in array. Works also with array of objects.

:warning: Disclaimer:

This module is published in good faith and for learning purpose only. The code is not production-ready, so any usage of it is strictly at your own risk :see_no_evil:.

## Installation

```
git clone https://github.com/qaraluch/qm-dedupe.git
```

## Usage

```js
const { dedupe, dedupeExtensive } = require("./index.js");

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

For more info read the source code and test files :page_facing_up:.

## Credits

Based on module [seriousManual/dedupe:](https://github.com/seriousManual/dedupe).

## License

MIT © [qaraluch](https://github.com/qaraluch)
