module.exports = {
  'presets': [
    'next/babel',
    'env',
    'stage-0',
  ],
  'env': {
    'development': {
      'plugins': ['inline-dotenv', 'styled-jsx/babel'],
    },
    'production': {
      'plugins': ['transform-inline-environment-variables'],
    },
  },
};