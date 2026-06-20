# Módulo 5: Segurança

Este documento descreve as práticas de segurança e privacidade de dados aplicadas ao website e configurador do **Amaranthos Ateliê**.

---

## 1. Segurança na Camada de Transporte e Cabeçalhos HTTP

Como uma aplicação web servida pela plataforma Vercel e compilada com o Next.js, as comunicações entre o cliente e o servidor ocorrem exclusivamente sob criptografia de canal seguro (HTTPS com protocolo TLS 1.3).

O arquivo de configuração [next.config.ts](file:///c:/Design/Projetos/Gisele/AmaranthosWeb/next.config.ts) injeta cabeçalhos de segurança HTTP em todas as respostas de página para mitigar vulnerabilidades comuns de segurança de aplicação:

- **Content Security Policy (CSP)**: Restringe a execução de scripts e carregamento de fontes de origens não autorizadas.
- **Strict-Transport-Security (HSTS)**: Garante que o navegador cliente se comunique apenas através de conexões HTTPS seguras durante o período de um ano.
- **X-Frame-Options**: Configurado como `DENY` para impedir que o website seja embutido em frames de sites terceiros, mitigando ataques de Clickjacking.
- **X-Content-Type-Options**: Configurado como `nosniff` para impedir que o navegador tente adivinhar o tipo MIME de um arquivo, forçando a conformidade com os cabeçalhos declarados.
- **Referrer-Policy**: Configurado como `strict-origin-when-cross-origin` para proteger informações de navegação ao transitar para links externos (como o WhatsApp).

---

## 2. Sanitização e Prevenção de Injeções (XSS)

- **React Auto-Scaping**: O React 19 escapa automaticamente todas as strings renderizadas no corpo do documento HTML, prevenindo ataques básicos de Cross-Site Scripting (XSS) por injeção de tags `<script>`.
- **Sanitização de Cartões de Mensagem**: O texto inserido no campo de mensagem para cartões de buquês personalizados é limpo e validado para aceitar apenas strings textuais planas, removendo quaisquer caracteres especiais ou tags HTML antes do processamento e repasse ao link do WhatsApp.
- **Validação de Formulários**: Todos os dados recebidos nos campos do formulário de contato são submetidos a validação rigorosa com expressões regulares no cliente antes de qualquer processamento posterior.

---

## 3. Diretrizes de Privacidade e LGPD

O projeto AmaranthosWeb é desenhado seguindo a filosofia de **Privacy by Design** (Privacidade por Concepção), estando em plena conformidade com a Lei Geral de Proteção de Dados (LGPD):

- **Coleta Efêmera de Dados**: O sistema não armazena dados pessoais dos usuários em um banco de dados relacional centralizado próprio neste estágio.
- **Dados Locais do Carrinho**: A lista de flores e a composição do buquê personalizado do usuário são mantidas exclusivamente na memória de sessão do navegador do próprio cliente (Local Storage ou State de React).
- **Transmissão Segura de Intenção de Pedido**: Quando o usuário clica para finalizar a compra, a mensagem contendo o pedido é montada localmente no dispositivo do usuário e transferida de forma segura e direta via protocolo de API HTTPS oficial para o WhatsApp, que gerencia a criptografia ponta a ponta da conversa comercial.
