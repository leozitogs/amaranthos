// Smoke de browser: sobe o build em start, navega pelas rotas
// e FALHA se aparecer console.error, excecao, rejeicao de promise ou 404 de
// asset. E a lei da casa (bug se prova em browser) como portao de CI.
//
// Uso: pnpm run build && pnpm run smoke

import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const PORTA = 3335;
const problemas = [];

function registra(tipo, texto) {
  problemas.push(`[${tipo}] ${texto}`);
}

const cmdName = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const preview = spawn(cmdName, ['exec', 'next', 'start', '-p', String(PORTA)], {
  stdio: 'inherit',
  shell: true,
});

async function esperaServidor() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORTA}/`);
      if (r.ok || r.status < 500) return;
    } catch {
      // ainda subindo
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('Servidor Next.js nao subiu no tempo limite');
}

try {
  await esperaServidor();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      if (msg.location()?.url?.includes('rota-inexistente-para-404')) return;
      if (msg.text().includes('rota-inexistente-para-404')) return;
      console.error(`CONSOLE ERROR: ${msg.text()} (${JSON.stringify(msg.location())})`);
      registra('console.error', msg.text().slice(0, 300));
    }
  });
  page.on('pageerror', (err) => {
    console.error(`PAGE ERROR: ${err.message}`);
    registra('excecao', String(err.message).slice(0, 300));
  });
  page.on('requestfailed', (req) => {
    console.error(`REQUEST FAILED: ${req.url()} - ${req.failure()?.errorText || 'unknown error'}`);
    registra('requestfailed', `${req.url()} - ${req.failure()?.errorText || 'unknown error'}`);
  });
  page.on('response', (res) => {
    if (res.status() >= 400) {
      console.error(`HTTP RESPONSE STATUS ${res.status()}: ${res.url()}`);
      // Ignora 404 intencionais do teste de rota inexistente
      if (res.status() === 404 && res.url().includes('rota-inexistente-para-404')) return;
      registra('http', `${res.status()} ${res.url()}`);
    }
  });

  const rotas = [
    '/',
    '/buques',
    '/flores-avulsas',
    '/centros-de-mesa',
    '/chaveiros',
    '/personalizar',
    '/sobre',
    '/rota-inexistente-para-404',
  ];

  for (const rota of rotas) {
    console.log(`Verificando rota: ${rota}`);
    await page.goto(`http://127.0.0.1:${PORTA}${rota}`);
    await page.waitForTimeout(1000); // tempo para renderizacao e animacao inicial
  }

  await browser.close();
} catch (erro) {
  registra('smoke', String(erro?.message ?? erro));
} finally {
  preview.kill();
}

if (problemas.length > 0) {
  console.error(`SMOKE FALHOU com ${problemas.length} problema(s):`);
  for (const p of problemas) console.error('  ' + p);
  process.exit(1);
}
console.log('SMOKE OK: console limpo, fluxo integro, assets respondendo.');
