// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';

// sql.js caches the first initSqlJs() call and returns that same promise for
// every later call, ignoring their config. gogDb.ts calls initSqlJs() with no
// config at module scope, so under jest it would claim that cache first and
// pin the wasm to its own on-disk path - which jsdom's XHR rejects
// ("Invalid URI \"c:/.../node_modules/sql.js/dist/sql-wasm.wasm\""), hanging
// every test that awaits it.
//
// This setup file runs before any test module is imported, so we claim the
// cache here and hand sql.js the wasm bytes directly. No XHR or fetch is
// attempted, so no dev server is required. Cypress is unaffected: it never
// loads this file and keeps using the locateFile URL in createTestDb.
initSqlJs({
    wasmBinary: fs.readFileSync(
        path.join(path.dirname(require.resolve('sql.js')), 'sql-wasm.wasm')
    ),
});
