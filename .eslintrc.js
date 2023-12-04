    module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],

        }
    ],

    parser: '@typescript-eslint/parser',
    "plugins": [
        '@typescript-eslint',
        "react",
    ],
    "rules": {
        "@typescript-eslint/strict-boolean-expressions": "off",
        "react/react-in-jsx-scope" : "off",
        "@typescript-eslint/consistent-type-definitions": "off"
    },
    root: true
}
