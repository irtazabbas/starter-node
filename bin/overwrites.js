const colors = require('colors');

const defaultError = console.error;
console.error = function() {
  let args = transformArguments(arguments);
  
  defaultError(
    colors.red.bold('=== ERROR ===\n'),
    colors.red(...args),
    colors.red.bold('\n=============')
  );
};

const defaultWarn = console.warn;
console.warn = function() {
  let args = transformArguments(arguments);

  defaultWarn(
    colors.yellow.bold('=== WARNING ===\n'),
    colors.yellow(...args),
    colors.yellow.bold('\n===============')
  );
};

const dafaultInfo = console.info;
console.info = function() {
  let args = transformArguments(arguments);

  dafaultInfo(
    colors.blue.bold('=== INFO ===\n'),
    colors.blue(...args),
    colors.blue.bold('\n============')
  );
};


const transformArguments = function(args) {
  // Turning nulls to undefined because 'colors' break with null
  // node_modules/colors/lib/colors.js:108
  return Array.from(args).map(
    arg => arg === null ? undefined : arg
  );
};
