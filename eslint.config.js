import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
    // 1. Configurações recomendadas base do JavaScript
    js.configs.recommended,

    // 2. Configuração integrada do Prettier
    prettierRecommended,

    // 3. Suas regras customizadas e configuração do parser
    {
        files: ['src/**/*.js'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            // Regras Gerais
            semi: ['error', 'always'],
            'no-var': 'error',
            'prefer-const': 'off',

            // Regras de Nomenclatura (Naming Convention) corrigidas
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    // Regra específica para CONSTANTES
                    selector: 'variable',
                    modifiers: ['const'],
                    format: ['UPPER_CASE'],
                },
                {
                    // Regra geral para as outras variáveis (neste caso, "let")
                    selector: 'variable',
                    format: ['snake_case'],
                },
                {
                    selector: 'function',
                    format: ['camelCase'],
                },
                {
                    selector: 'class',
                    format: ['PascalCase'],
                },
                {
                    selector: 'property',
                    format: ['snake_case'],
                },
            ],
        },
    },
];
