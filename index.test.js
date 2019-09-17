const { dedupeInit } = require("./index");

const simpleArrayToDedupe = ["!", "1", "!", "2", "3", "!"];

const dataToDedupe = [
  {
    id: 100,
    name: "thread1",
    path: "qb-api/lib/walk/test/fixtures/inbox/thread1",
    isFile: false,
    comment: "unique item no 1"
  },
  {
    id: 101,
    name: "thread2",
    path: "qb-api/lib/walk/test/fixtures/inbox/thread2",
    isFile: false,
    comment: "unique item no 2"
  },
  {
    id: 201,
    name: "thread2",
    path: "qb-api/lib/walk/test/fixtures/inbox/thread2",
    isFile: false,
    comment: "duplicate of item id 101"
  }
];

test("should load module methods", () => {
  const actualDedupeInit = typeof dedupeInit === "function";
  expect(actualDedupeInit).toBe(true);
});

test("should dedupe simple array", () => {
  const dedupe = dedupeInit();
  const [actualUniqs, actualDups] = dedupe(simpleArrayToDedupe);
  // actualUniqs - unique alements = real unique + first of duplicates
  // actualDups - only duplicates
  expect(actualUniqs).toEqual(["!", "1", "2", "3"]);
  expect(actualUniqs.length).toBe(4);
  expect(actualDups).toEqual(["!", "!"]);
  expect(actualDups.length).toBe(2);
});

test("should dedupe method return all items", () => {
  // because all items are unique due to its id property
  const dedupe = dedupeInit();
  const [actualUniqs, actualDups] = dedupe(dataToDedupe);
  const expectedUniqs = dataToDedupe.length; // method takes no effect on input data
  expect(actualUniqs.length).toBe(expectedUniqs);
  expect(actualDups.length).toBe(0);
});

test("should dedupe method dedupe array of objects by its name propery", () => {
  const compareByProperty = item => item.name;
  const dedupe = dedupeInit({ compareByProperty });
  const [actualUniqs, actualDups] = dedupe(dataToDedupe);
  // use hasher as comparison property for dedupe
  const actualUniqLength = actualUniqs.length;
  const actualUniqIds = actualUniqs.map(itm => itm.id);
  expect(actualUniqLength).toBe(2);
  expect(actualUniqIds).toEqual([100, 101]);
  const actualDupsLength = actualDups.length;
  const actualDupsIds = actualDups.map(itm => itm.id);
  expect(actualDupsLength).toBe(1);
  expect(actualDupsIds).toEqual([201]);
});

test("should throw an error when not find a property to compare", () => {
  const compareByProperty = item => item.terefere;
  const dedupe = dedupeInit({ compareByProperty });
  expect(() => dedupe(dataToDedupe)).toThrow(
    /did not find property to compare/
  );
});
