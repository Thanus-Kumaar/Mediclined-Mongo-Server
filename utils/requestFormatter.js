// Convert key to camelCase
function toCamelCase(key) {
  return key.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
}

// Recursively convert all keys in an object to camelCase or snake_case
function transformKeys(obj, caseFn) {
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.keys(obj).reduce((acc, key) => {
      const transformedKey = caseFn(key);
      acc[transformedKey] = transformKeys(obj[key], caseFn);
      return acc;
    }, {});
  }
  return obj;
}

module.exports = { toCamelCase, transformKeys };
