// @ts-check
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'data']),
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended]
  },
  {
    // Hooky sú iba vo frontende.
    files: ['src/client/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended],
    rules: {
      // Chýbajúca závislosť efektu je chyba aj v editore, nielen cez --max-warnings 0.
      'react-hooks/exhaustive-deps': 'error'
    }
  }
]);
