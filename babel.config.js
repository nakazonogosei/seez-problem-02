module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: [">0.5%", "IE 11", "not op_mini all"],
          esmodules: true
        },
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ];

  return {
    presets,
    babelrcRoots: ["."]
  };
};
