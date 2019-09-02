module.exports = {
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jest/recommended'
    ],
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 2018,
        'ecmaFeatures': {
            'jsx': true
        },
        'sourceType': 'module'
    },
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
        'jest': true
    },
    'rules': {
        'react/prop-types': [
            'enabled',
            { 'ignore': true }
        ],
        'no-console': 0,
        'no-unused-vars': ['error', {
            'vars': 'all',
            'args': 'none',
            'ignoreRestSiblings': true
        }],
        'quotes': ['error', 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true
        }],
        'semi': ['error', 'always'],
        'spaced-comment': ['error', 'always', {
            'line': {
                'markers': ['/'],
                'exceptions': ['-', '+']
            },
            'block': {
                'markers': ['!'],
                'exceptions': ['*'],
                'balanced': true
            }
        }],
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'never'
        }]
    }
};
