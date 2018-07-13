const test = require("ava");
const { dedupe, dedupeExtensive } = require("./index.js");

const dataToDedupe = [
  {
    id: 100,
    name: "thread1",
    path: "qb-api/lib/walk/test/fixtures/inbox/thread1",
    stats: {},
    cwd: "qb-api/lib/walk/test/fixtures",
    crown: "/inbox/thread1",
    parent: "inbox",
    isFile: false
  },
  {
    id: 101,
    name: "thread2",
    path: "qb-api/lib/walk/test/fixtures/inbox/thread1",
    stats: {},
    cwd: "qb-api/lib/walk/test/fixtures",
    crown: "/inbox/thread1",
    parent: "inbox",
    isFile: false
  },
  {
    id: 1,
    name: "thread2",
    path: "qb-api/lib/walk/test/fixtures/threads/thread2",
    stats: {},
    cwd: "qb-api/lib/walk/test/fixtures",
    crown: "/threads/thread2",
    parent: "threads",
    isFile: false
  },
  {
    id: 11,
    name: "thread1",
    path: "qb-api/lib/walk/test/fixtures/threads/thread1",
    stats: {},
    cwd: "qb-api/lib/walk/test/fixtures",
    crown: "/threads/thread1",
    parent: "threads",
    isFile: false
  },
  {
    id: 23,
    name: "thread3",
    path: "qb-api/lib/walk/test/fixtures/inbox/thread3",
    stats: {},
    cwd: "qb-api/lib/walk/test/fixtures",
    crown: "/inbox/thread3",
    parent: "inbox",
    isFile: false
  },
  {
    id: 27,
    name: "thread1",
    path: "qb-api/lib/walk/test/fixtures/inbox/thread1",
    stats: {},
    cwd: "qb-api/lib/walk/test/fixtures",
    crown: "/inbox/thread1",
    parent: "inbox",
    isFile: false
  }
];

test("dedupe is function", t => {
  const msg = "should be a function ";
  const actual = typeof dedupe === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

test("dedupe array of objects", t => {
  const msg = "should return array with length = 3";
  const result = dedupe(dataToDedupe, item => item.name);
  const actual = result.length;
  const expected = 3;
  t.is(actual, expected, msg);
  const msg2 = "should return array of object without object.id = 1";
  const ids = result.map(item => item.id);
  const actual2 = ids.includes(1);
  const expected2 = false;
  t.is(actual2, expected2, msg2);
  const msg3 = "should return array of object with object.id = 23";
  const actual3 = ids.includes(23);
  const expected3 = true;
  t.is(actual3, expected3, msg3);
});

test("dedupeExtensive is function", t => {
  const msg = "should be a function ";
  const actual = typeof dedupeExtensive === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

const hasher = JSON.stringify;
const chooseToCompare = item => item.name;
const secondaryCheckFunction = item => item.parent === "inbox";
const collection = dataToDedupe;
const resultAll = dedupeExtensive({
  hasher,
  chooseToCompare,
  secondaryCheckFunction,
  collection
});

test("dedupeExtensive returned array of objects deduped", t => {
  const msg = "should return array with length = 3";
  const result = resultAll[0];
  const actual = result.length;
  const expected = 3;
  t.is(actual, expected, msg);
  const msg2 = "should return array of object without object.id = 27";
  const ids = result.map(item => item.id);
  const actual2 = ids.includes(27);
  const expected2 = false;
  t.is(actual2, expected2, msg2);
  const msg3 = "should return array of object with object.id = 11";
  const actual3 = ids.includes(11);
  const expected3 = true;
  t.is(actual3, expected3, msg3);
});

test("dedupeExtensive returned array of objects removed", t => {
  const msg = "should return array with length = 3";
  const result = resultAll[1];
  const actual = result.length;
  const expected = 3;
  t.is(actual, expected, msg);
  const msg2 = "should return array of object without object.id = 11";
  const ids = result.map(item => item.id);
  const actual2 = ids.includes(11);
  const expected2 = false;
  t.is(actual2, expected2, msg2);
  const msg3 = "should return array of object with object.id = 27";
  const actual3 = ids.includes(27);
  const expected3 = true;
  t.is(actual3, expected3, msg3);
});

test("dedupeExtensive - no passed secondaryCheckFunction", t => {
  const msg = "should return array with length = 5 (all duplicates)";
  const resultWithoutSecon = dedupeExtensive({
    hasher,
    chooseToCompare,
    collection
  }); // <- removed items.
  const result = resultWithoutSecon[1];
  const actual = result.length;
  const expected = 5;
  t.is(actual, expected, msg);
});
