module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);
  const presets = [
    '@babel/preset-env',
    ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
    '@babel/preset-react',
  ];
  const plugins = [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ];
  if (!api.env('production')) {
    plugins.push('react-refresh/babel');
  }
  return {
    presets,
    plugins,
  };
};
