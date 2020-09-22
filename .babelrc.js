module.exports = api => {
  const isTest = api.env('test');
  const isDev = api.env('development');

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isTest ? 'commonjs' : false,
          targets: {
            ...(isTest
              ? { node: 'current' }
              : { browsers: '> 0.25%, not dead' }),
          },
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-proposal-optional-chaining',
      ...(isTest ? ['babel-plugin-dynamic-import-node'] : []),
      ...(isDev ? ['react-refresh/babel'] : []),
    ],
  };
};
