function dedupeInit({
  hasher = JSON.stringify,
  compareByProperty = item => item
} = {}) {
  const lookup = [];
  const dups = [];
  return array => {
    const uniqs = array.reduce((accumulator, current) => {
      const valueToCompare = hasher(compareByProperty(current));
      valueToCompare || throwWhenFindNoProperty(); // in the item's objetct to compare
      const isUniqueItem = !lookup.includes(valueToCompare);
      if (isUniqueItem) {
        lookup.push(valueToCompare);
        return [...accumulator, current];
      } else {
        dups.push(current);
        return accumulator;
      }
    }, []);
    return [uniqs, dups];
  };
}

function throwWhenFindNoProperty() {
  throw new Error("qm-dedupe: did not find property to compare!");
}

module.exports = {
  dedupeInit
};
