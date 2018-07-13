function dedupe(array, hasher = JSON.stringify) {
  const lookup = [];
  const result = array.filter(item => {
    const hashed = hasher(item);
    const included = lookup.includes(hashed);
    if (!included) {
      lookup.push(hashed);
      return !included;
    }
  });
  return result;
}

function dedupeExtensive({
  hasher = JSON.stringify,
  chooseToCompare,
  secondaryCheckFunction = item => item,
  collection
} = {}) {
  const valuesToCheck = collection.map(chooseAndHash(hasher, chooseToCompare));
  const duplicates = valuesToCheck.map(checkDups(valuesToCheck));
  const endDuplicates = collection.map(
    secondaryCheck(secondaryCheckFunction, duplicates)
  );
  const result = bifurcate(endDuplicates, collection);
  return result;
}

const chooseAndHash = (hasher, chooseToCompare) => item =>
  hashIt(hasher)(chooseToCompare(item));

const hashIt = hasher => item =>
  (hasher && hasher(item)) || JSON.stringify(item);

const checkDups = valuesToCheck => (item, index) => {
  const valuesToCheckWithoutActual = [...valuesToCheck];
  valuesToCheckWithoutActual.splice(index, 1);
  return valuesToCheckWithoutActual.includes(item);
};

const secondaryCheck = (secondaryCheckFunction, duplicates) => (
  item,
  index
) => {
  return duplicates[index] && secondaryCheckFunction(item);
};

const bifurcate = (filterArr, collection) =>
  collection.reduce(
    (acc, next, i) => (acc[filterArr[i] ? 1 : 0].push(next), acc),
    [[], []]
  );

module.exports = {
  dedupe,
  dedupeExtensive
};
