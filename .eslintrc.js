const OFF = 0,
      WARN = 1,
      ERROR = 2;

module.exports = {
  'parser': 'babel-eslint',
  'extends': 'airbnb',
  'rules': {
    'react/jsx-filename-extension': OFF,
    'max-len': OFF,
    'no-console': OFF,
    'spaced-comment': OFF,
    'func-names': OFF,
  },
};
