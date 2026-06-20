// Testes de marca: garantem que as regras da identidade Amaranthos
// continuam valendo no codigo conforme o site cresce.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const GLOBALS_CSS_PATH = join(__dirname, '..', 'src', 'app', 'globals.css');

describe('cores da marca', () => {
  it('globals.css declara a paleta oficial completa', () => {
    const cssContent = readFileSync(GLOBALS_CSS_PATH, 'utf8').toLowerCase();
    const officialColors = [
      '#874b69', // vinho
      '#f0d2d2', // rosa poeira
      '#b4d2c3', // verde menta
      '#fdf7f1', // creme
      '#2a1f24', // grafite
    ];
    for (const color of officialColors) {
      expect(cssContent, `cor oficial ${color} ausente do globals.css`).toContain(color);
    }
  });
});

describe('estrutura das secoes', () => {
  it('as secoes principais da home existem em src/sections', () => {
    const sections = readdirSync(join(__dirname, '..', 'src', 'sections'));
    const expected = ['Hero', 'CatalogPreview', 'Sobre', 'Contato'];
    for (const section of expected) {
      expect(sections, `secao ${section} ausente`).toContain(section);
    }
  });
});
