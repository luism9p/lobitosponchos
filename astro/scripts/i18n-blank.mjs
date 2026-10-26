// One-off helper: builds src/i18n/en.json with the same shape as es.json and every text empty.
// Empty values fall back to Spanish until someone writes the English.
import fs from 'node:fs';
const blank = (v) => Array.isArray(v) ? v.map(blank) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)])) : '';
const es = JSON.parse(fs.readFileSync('src/i18n/es.json', 'utf8'));
fs.writeFileSync('src/i18n/en.json', JSON.stringify(blank(es), null, 2) + '\n');
