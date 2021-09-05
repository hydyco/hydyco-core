// Utility for ioc operations

// converts awilix listModules array into name:module
export const reduceIOCArray = (array: Array<any>) => {
  return array.reduce((prev, curr) => {
    const { name, path } = curr;
    prev = { ...prev, [name]: require(path).default || require(path) };
    return prev;
  }, {});
};

/**
 * read object values using string
 * @param {Object} object
 * @param {string} key - key to find value on object
 */
export const readObject = (object: Object, key: string) => {
  key = key.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  key = key.replace(/^\./, ""); // strip a leading dot
  var a = key.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in object) {
      object = object[k];
    } else {
      return;
    }
  }
  return object;
};
