
const logger = require('morgan');

module.exports = {
  forkChildren: true,
  logger: logger([
    '[:date[clf]]',
    ':url',
    ':method',
    ':status',
    ':res[content-length]',
    ':remote-addr',
    '":referrer"',
    '":user-agent"'
  ].join(' '))
};
