const {merge} = require('object-mapper');

async function mergeAsync(src, mapping, onNull) {

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


async function mergeListAsync(src, mapping, onNull) {

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


module.exports.mergeAsync = mergeAsync;
module.exports.mergeListAsync = mergeListAsync;
