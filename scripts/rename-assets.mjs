// Script para renomear assets em public/assets trocando sublinhados (_) por hifens (-)
// Execução: node scripts/rename-assets.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ALVO_DIR = path.resolve(__dirname, '../public/assets');

function renomeiaArquivos(diretorio) {
  const itens = fs.readdirSync(diretorio);

  for (const item of itens) {
    const caminhoCompleto = path.join(diretorio, item);
    const estatisticas = fs.statSync(caminhoCompleto);

    if (estatisticas.isDirectory()) {
      renomeiaArquivos(caminhoCompleto);
    } else if (estatisticas.isFile() && item.includes('_')) {
      const novoNome = item.replace(/_/g, '-');
      const novoCaminho = path.join(diretorio, novoNome);

      console.log(`Renomeando: ${item} -> ${novoNome}`);
      fs.renameSync(caminhoCompleto, novoCaminho);
    }
  }
}

try {
  console.log(`Iniciando varredura em: ${ALVO_DIR}`);
  renomeiaArquivos(ALVO_DIR);
  console.log('Renomeação concluída com sucesso!');
} catch (erro) {
  console.error('Erro ao renomear arquivos:', erro.message);
  process.exit(1);
}
