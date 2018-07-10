const colors = require('colors');

/**
 * Extending with some methods
 */
[
  'blue',
  'green',
  'red',
  'yellow'
].forEach(color => {
  console[color] = function() {
    let args = transformArguments(arguments);

    console.log(colors[color](...args));
  }
});

const transformArguments = function(args) {
  // Turning nulls to undefined because 'colors' break with null
  // node_modules/colors/lib/colors.js:108
  return Array.from(args).map(
    arg => arg === null ? undefined : arg
  );
};
