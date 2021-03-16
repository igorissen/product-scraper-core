module.exports = {
  require: ['ts-node/register', 'source-map-support/register'],
  exit: true,
  spec: 'test/**/*.spec.ts',
  timeout: 10000
};
