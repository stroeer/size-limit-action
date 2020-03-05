module.exports = function(api) {
  api.env();

  return {
    extends: '../../babel.config.js',
    presets: [
      [
        '@babel/env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
  };
};
