/* eslint-disable no-console */
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');

module.exports = env => {
  const common = commonConfig(env);
  const InjectSW = common.plugins.pop();

  if (['development', 'test'].includes(env.mode)) {
    const dev = devConfig(env);
    dev.plugins.push(InjectSW);
    return merge(common, dev);
  } else if (env.mode === 'production') {
    const prod = prodConfig(env);
    prod.plugins.push(InjectSW);
    return merge(common, prod);
  } else {
    console.error(env);
    throw new Error('No matching configuration was found!');
  }
};
