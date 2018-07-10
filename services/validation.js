
/**
 * Validates target `t` based on constraints `c`
 */
const check = function(t, c) {
  if (!isAcceptable(t)) return r(false, null, 'target is undefined');
  
  if (Array.isArray(c)) {
    let status = true, key, msg;

    c.some(
      e => {
        if (typeof e === 'string') {
          key = e;
          if (!isAcceptable(t[e])) {
            key = e;
            status = false;
            msg = `'${e}' is null undefined or NaN`
            return true;
          } else if (typeof t[e] === 'string' && !t[e]) {
            key = e;
            status = false;
            msg = `${e}' is empty`;
            return true;
          }
        } else if (typeof e === 'object') {
          // TODO: implement
        }
      }
    );

    return r(status, key, msg);
  } else {
    return r(false, null, 'invalid constraints');
  }
};

const r = function(status, key, msg) {
  let result = { status: !!status };
  (!status && key) && (result.key = key);
  (!status && msg) && (result.msg = msg);

  return result;
};

const isAcceptable = function(value) {
  return value !== undefined && value !== null &&
    ((typeof value === 'number' && !isNaN(value)) || true);
};

module.exports = check;
