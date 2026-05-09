
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

console.log('reactHooks keys:', Object.keys(reactHooks));
if (reactHooks.configs) console.log('reactHooks.configs keys:', Object.keys(reactHooks.configs));
console.log('reactRefresh keys:', Object.keys(reactRefresh));
if (reactRefresh.configs) console.log('reactRefresh.configs keys:', Object.keys(reactRefresh.configs));
