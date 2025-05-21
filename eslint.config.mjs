import vuePlugin from 'eslint-plugin-vue'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import vueParser from 'vue-eslint-parser'

export default [
  ...vuePlugin.configs['flat/recommended'],
  {
    // Базовые настройки ESLint
    languageOptions: {
      ecmaVersion: 'latest', // Используем последнюю версию ECMAScript
      sourceType: 'module', // Используем модули (import/export)
      parser: vueParser, // Парсер для .vue файлов
      parserOptions: {
        parser: '@babel/eslint-parser', // Парсер для JavaScript внутри <script>
        requireConfigFile: false, // Не требовать отдельный конфиг для Babel
      },
    },
    plugins: {
      vue: vuePlugin, // Плагин для Vue
      prettier: prettierPlugin, // Плагин для Prettier
    },
    rules: {
      // Правила ESLint
      'vue/multi-word-component-names': 'off',
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'ignore',
          multiline: 'below',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          tabWidth: 2,
          useTabs: false,
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'auto',
          vueIndentScriptAndStyle: true,
          singleAttributePerLine: true,
        },
      ],
      'vue/no-v-html': 'off',
    },
  },
  prettierConfig,
  {
    rules: {
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 1,
          multiline: {
            max: 1,
          },
        },
      ],
      'comma-dangle': 'off',
      'vue/script-setup-uses-vars': 'error',
      'vue/no-unused-vars': 'error',
      'no-unused-vars': 'warn',
    },
    ignores: ['node_modules', 'dist', '**/node_modules/**'],
  },
]
