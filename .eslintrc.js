module.exports = {
  'extends': ['taro/react',"plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier":[
      'error',
      {
        semi: true,
        trailingComma: 'all',
        tabWidth: 2,
      },
    ],
    'no-console': `off`,
    'react-hooks/rules-of-hooks': `error`,
    'react-hooks/exhaustive-deps': `off`,
    'import/no-commonjs': 'off'
  }
}
