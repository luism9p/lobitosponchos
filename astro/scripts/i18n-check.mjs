// Lists every text still missing in English. Run: npm run i18n:check
import fs from 'node:fs';
import path from 'node:path';

const es = JSON.parse(fs.readFileSync('src/i18n/es.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('src/i18n/en.json', 'utf8'));

function flatten(value, prefix = '', out = {}) {
  if (Array.isArray(value)) value.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  else out[prefix] = value;
  return out;
}

const esFlat = flatten(es);
const enFlat = flatten(en);
const missing = Object.keys(esFlat).filter((k) => esFlat[k] !== '' && !enFlat[k]);
const extra = Object.keys(enFlat).filter((k) => !(k in esFlat));

const dir = 'src/content/productos';
const productsMissing = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).filter((f) => {
  const text = fs.readFileSync(path.join(dir, f), 'utf8');
  const front = text.split('---')[1] ?? '';
  return !/^en:\s*\n\s+nombre:\s*\S/m.test(front) || !/^\s+resumen:\s*\S/m.test(front.split(/^en:/m)[1] ?? '');
});

const total = Object.keys(esFlat).filter((k) => esFlat[k] !== '').length;
console.log(`Site texts: ${total - missing.length}/${total} translated`);
if (missing.length) console.log('\nMissing in src/i18n/en.json:\n  ' + missing.join('\n  '));
if (extra.length) console.log('\nKeys in en.json that do not exist in es.json (typos?):\n  ' + extra.join('\n  '));
const allProducts = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).length;
console.log(`\nProducts: ${allProducts - productsMissing.length}/${allProducts} have an English version`);
if (productsMissing.length) console.log('Missing the "en:" block (name + summary):\n  ' + productsMissing.join('\n  '));
process.exit(missing.length || productsMissing.length ? 1 : 0);
