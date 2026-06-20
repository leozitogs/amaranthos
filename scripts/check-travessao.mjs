// Checagem de marca: travessao banido em todo e qualquer conteudo Amaranthos.
// Varre o repositorio inteiro (codigo, copy, markdown, css, configs) e falha
// se encontrar travessao (em dash) ou meia-risca (en dash).
//
// Excecao unica: docs/ guarda documentos de referencia copiados da identidade
// da marca e o contexto do projeto; nao sao conteudo produzido neste
// repositorio e ficam fora do escopo da varredura.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();

const IGNORED_DIRS = new Set(['node_modules', 'dist', '.git', '.next', 'docs']);

const TEXT_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.html',
  '.md',
  '.json',
  '.yml',
  '.yaml',
  '.svg',
]);

// Escapes unicode de proposito: este arquivo tambem e varrido.
const BANNED = [
  { char: '\u2014', name: 'travessao (em dash)' },
  { char: '\u2013', name: 'meia-risca (en dash)' },
];

function hasTextExtension(name) {
  const dot = name.lastIndexOf('.');
  if (dot < 0) return false;
  return TEXT_EXTENSIONS.has(name.slice(dot).toLowerCase());
}

function walk(dir, violations) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);

    let stats;
    try {
      stats = statSync(fullPath);
    } catch {
      continue; // entrada inacessivel (sync de arquivos em andamento)
    }

    if (stats.isDirectory()) {
      if (!IGNORED_DIRS.has(entry)) walk(fullPath, violations);
      continue;
    }

    if (!hasTextExtension(entry)) continue;

    let content;
    try {
      content = readFileSync(fullPath, 'utf8');
    } catch {
      continue; // arquivo inacessivel no momento da varredura
    }

    const lines = content.split('\n');
    lines.forEach((line, index) => {
      for (const banned of BANNED) {
        if (line.includes(banned.char)) {
          violations.push({
            file: relative(ROOT, fullPath),
            line: index + 1,
            name: banned.name,
          });
        }
      }
    });
  }
}

const violations = [];
walk(ROOT, violations);

if (violations.length > 0) {
  console.error('REPROVADO: travessao encontrado. Regra absoluta da marca Amaranthos.');
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line} contem ${v.name}`);
  }
  process.exit(1);
}

console.log('OK: nenhum travessao ou meia-risca no conteudo do repositorio.');
