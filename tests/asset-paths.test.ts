// Todo caminho de /assets/ citado no codigo precisa existir no disco.
// Se um asset for renomeado e esquecido no codigo, este teste falha.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const SRC = join(__dirname, '..', 'src');
const ASSETS = join(__dirname, '..', 'assets');

function arquivosDe(dir: string): string[] {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    return statSync(caminho).isDirectory() ? arquivosDe(caminho) : [caminho];
  });
}

function referencias(): string[] {
  if (!existsSync(SRC)) return [];
  const fontes = arquivosDe(SRC).filter((f) => /\.(tsx?|css)$/.test(f));
  const achadas = new Set<string>();
  // Busca por caminhos no formato /assets/pasta/nome.ext
  const padrao = /["'(\/]\/?assets\/([^"')]+\.[a-zA-Z0-9]+)/g;

  for (const arquivo of fontes) {
    const texto = readFileSync(arquivo, 'utf-8');
    const matches = texto.matchAll(padrao);
    for (const m of matches) {
      if (m[1]) {
        achadas.add(m[1]);
      }
    }
  }
  return [...achadas];
}

describe('assets referenciados', () => {
  it('todo caminho de /assets/ citado no src existe no disco', () => {
    const refs = referencias();
    const faltando = refs.filter((ref) => !existsSync(join(ASSETS, ref)));
    expect(faltando, `assets citados e inexistentes: ${faltando.join(', ')}`).toEqual([]);
  });
});
