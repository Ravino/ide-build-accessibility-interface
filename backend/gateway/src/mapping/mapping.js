const {merge} = require('object-mapper');

module.exports.mergeAsync = async (src, mapping, onNull) => {

  try {
    let result = await src;

    if (!result && onNull) {
      return Promise.reject(onNull(null));
    }
    return merge(result, mapping);
  }
  catch(e) {
    if (onNull) {
      throw onNull(e);
    }
    else {
      throw e;
    }
  }
}


module.exports.mergeListAsync = async (src, mapping, onNull) => {

  try {
    let items = await src;
    let result = [];

    for (let item of items) {
      result.push(mergeAsync(item, mapping, onNull));
    }

    return result;
  }
  catch (e) {
    if (onNull) {
      throw onNull(e);
    }
    else {
      throw e;
    }
  }
}
