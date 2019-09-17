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
const { dedupeInit } = require("qm-dedupe");

const hasher = JSON.stringify; // default value
const compareByProperty = item => item.name; // default fn: item => item;

const dedupe = dedupeInit({ hasher, compareByProperty });
dedupe(arrayOfObects)
// -> [[unique elements],[duplicate elements]]
```

## Credits

Based on module [seriousManual/dedupe:](https://github.com/seriousManual/dedupe).

## License

MIT © [qaraluch](https://github.com/qaraluch)
