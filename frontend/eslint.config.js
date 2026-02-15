import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
	{
		ignores: ['dist', 'build', 'node_modules'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{js,ts,jsx,tsx}'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {jsx: true},
			},
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			prettier,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'prettier/prettier': 'error',
			...prettierConfig.rules,
		},
	}
);
