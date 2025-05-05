import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import prettierPlugin from 'eslint-plugin-prettier'
import tsParser from '@typescript-eslint/parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
})
const eslintConfig = [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { ignores: ['.next/**/*', 'node_modules/', 'tailwind.config.ts'] },
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 'latest',
                sourceType: 'module',
                createProgram: true,
            },
        },
        plugins: {
            prettier: prettierPlugin,
            'import/parsers': tsParser,
        },
        rules: {
            'prettier/prettier': 'off',
            'no-console': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/ban-ts-comment': ['off', { 'ts-ignore': 'allow-with-description' }],
            '@typescript-eslint/consistent-type-imports': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            'arrow-body-style': ['off', 'as-needed'],
            'prefer-arrow-callback': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/only-throw-error': 'off',
            '@typescript-eslint/only-throw-error': 'off',
            '@typescript-eslint/no-unnecessary-type-assertion': 'off',
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/no-base-to-string': 'off',
        },
    },
    {
        files: ['next.config.js', '**/*.js '],
        rules: {
            'no-unused-vars': 'off',
            'prettier/prettier': 'off',
        },
    },
]

export default eslintConfig
