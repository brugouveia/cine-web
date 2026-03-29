// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
    {
      ignores: ['eslint.config.mjs', 'src/prisma/generated/**', 'prisma/**'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        plugins: {
            'unused-imports': unusedImports,
        },
        languageOptions: {
            globals: {
              ...globals.node,
              ...globals.jest,
            },
            sourceType: 'commonjs',
            parserOptions: {
              projectService: true,
              tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                  vars: 'all',
                  varsIgnorePattern: '^_',
                  args: 'after-used',
                  argsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
        },
    },
);
